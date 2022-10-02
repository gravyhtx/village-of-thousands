import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useScreenWidth } from '../modules/getWindow'
import { idbPromise } from "../utils/helpers";
import { updateAmount, fetchPayment, deletePaymentIntent , createOrder } from "../utils/API";
import Auth from '../utils/auth';
import AddressCheckout from "./AddressCheckout";
import Succcess from './confirmation';
import { useRouter } from 'next/router';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    
    let router = useRouter()

    const [checkoutError, setCheckoutError] = useState();
    const [checkoutSuccess, setCheckoutSuccess] = useState();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const [billingFormData, setBillingFormData] = useState({});
    const [shippingFormData, setShippingFormData] = useState({});
    const [addressCheck, setAddressCheck] = useState(false);
   
    const [orderId, setOrderId] = useState("");
    const [cart, setCart] = useState([]);
    const [paymentIntent, setPaymentIntent] = useState();

    const handleInputBilling = (event) => {
        const { name, value } = event.target;
        setBillingFormData({ ...billingFormData, [name]: value });
    }

    const handleInputShipping = (event) => {
        const { name, value } = event.target;
        setShippingFormData({ ...shippingFormData, [name]: value });
    }

    const handleSameAddress = (event) => {
        setAddressCheck(!addressCheck)
    }

    useEffect(() => {
        async function getCart() {
            //check for staleness here
            const dbResponse = await idbPromise('cart', 'get');
            if(!dbResponse) {
                router.push("/shop")
            }
            const { cart } = dbResponse
            setCart(cart)
        }

        if (!cart.length) {
            getCart()
        }

        async function postNewPaymentIntent() {
            setPaymentIntent({})
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            const userProfile = await Auth.getProfile();

            const dbResponse = await idbPromise('cart', 'get');

            if(!dbResponse) {
                return;
            }

            const {cart} = dbResponse;

            if(!userProfile) {
                return
            }

            const response = await fetchPayment(
                {
                    amount: totalAmount(cart),
                    userId: userProfile.data._id,
                    userEmail: userProfile.data.email
                },
                token
            )

            if (response.status != 200) {
                console.log(response)
            }

            const data = await response.json()
            setPaymentIntent(data.paymentIntent)
            updatePaymentIntent(data.paymentIntent)
        }

        async function updatePaymentIntent(paymentIntent) {
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            const { cart } = await idbPromise('cart', 'get');

            const response = await updateAmount(
                {
                    amount: totalAmount(cart),
                    stripeId: paymentIntent.id
                },
                token
            )

            if (response.status != 200) {
                console.log(response)
            }

            const data = await response.json()
            setOrderId(data.id)
            setUpdateSuccess(true)
        }
        postNewPaymentIntent()
    }, []);

    function totalAmount(arr) {
        const sum = arr.reduce((prev, curr) => prev + parseInt(curr.price), 0);
        return (12 + sum + (Math.round((sum * 0.0825) * 100) / 100))
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const { error, paymentIntent: { status } } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })

            if (error) throw new Error(error.message);

            if (status === 'succeeded') {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                const user = await Auth.getProfile();
                
                const response = await deletePaymentIntent(
                    {
                        userId: user.data._id
                    },
                    token
                )
                
                const productsOrdered = [];
                cart.forEach(item => {
                    productsOrdered.push(item.id)
                })

                const orderObj = {
                    id: user.data._id,
                    products: productsOrdered,
                    addressCheck,
                    shippingAddress: {
                        ...shippingFormData
                    },
                    billingAddress: {
                        ...billingFormData
                    },
                    paymentConfirmation: orderId,
                    totalPrice: totalAmount(cart),
                    specialInstructions: "None"
                }

                await createOrder(orderObj)

                const cartDeleteObj = {
                    id: user.data._id
                }
                setCheckoutSuccess(true);
                await idbPromise("cart", "delete", cartDeleteObj)

            };

            setShippingFormData({});
            setBillingFormData({});
        } catch (err) {
            setCheckoutError(err.message)
        }
    }

    const options = {
        style: {
            base: {
                color: '#eee',
                fontWeight: '600',
                fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
                fontSize: useScreenWidth() > 770 ? '20px' : '16px',
                fontSmoothing: 'antialiased',
                transition: 'color 500ms ease-in-out',

                ':focus': {
                    color: '#888',
                },

                '::placeholder': {
                    color: '#595d7c',
                },

                ':focus::placeholder': {
                    color: '#666',
                },
            },
            invalid: {
                color: '#D24B4B',

                ':focus': {
                    color: '#e57d7d',
                },

                '::placeholder': {
                    color: '#873535',
                },
            },
        }
    };

    if (checkoutSuccess) return <Succcess confirmationId={paymentIntent.id} />

    return (
        <>
            <form onSubmit={handleSubmit}>
                <AddressCheckout 
                    shippingFn={handleInputShipping}
                    billingFn={handleInputBilling}
                    sameAddressCheck={addressCheck} 
                    sameAddressFn={handleSameAddress} />
                <div aria-label="Please enter your credit or debit card information." className="user-register-address-header center">PAYMENT DETAILS</div>
                <div className="row container">
                    <div className='cc-input-wrapper s12'>
                        <CardElement options={options} />
                    </div>
                </div>
                {paymentIntent ?
                    <div className='checkout-details_cost center-text'>
                        <div aria-label={'Your cost is $' + (12 - totalAmount(cart))}><b>Cost&ensp;//&ensp;${(totalAmount(cart) - 12).toFixed(2)}</b></div>
                        <div aria-label={'Your shipping is $12'}><b>Shipping&ensp;//&ensp;$12</b></div>
                        <h2 aria-label={'Your total is $' + totalAmount(cart)} className='c-total'>
                            <b>Total:</b> ${totalAmount(cart)}
                        </h2>
                    </div> : <></>}
                <div className='row center checkout-details_submit'>
                    <div className='col s12'>
                        {updateSuccess ?
                            (
                                <button className='theme-btn pay-button' type='submit' disabled={!stripe}>SUBMIT</button>
                            )
                            :
                            (
                                <button className='theme-btn pay-button' type='submit' disabled={true}>SUBMIT</button>
                            )}
                    </div>
                </div>

                {checkoutError && <span style={{ color: "#aa3d3d" }}>{checkoutError}</span>}
            </form>
        </>

    )
}

export default CheckoutForm