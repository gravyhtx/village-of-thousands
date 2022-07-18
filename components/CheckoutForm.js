import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';
import { useScreenWidth } from '../modules/getWindow'
import { idbPromise } from "../utils/helpers";
import { updateAmount, createOrder } from "../utils/API";
import Auth from '../utils/auth';
import AddressCheckout from "./AddressCheckout";
import { useRouter } from 'next/router';
// import {}

// const updatePromise = require("stripe")(process.env.STRIPE_PRIVATE_KEY_TEST)

const CheckoutForm = ({ paymentIntent }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError, setCheckoutError] = useState();
    const [checkoutSuccess, setCheckoutSuccess] = useState();
    const [userFormData, setUserFormData] = useState({});
    const [addressCheck, setAddressCheck] = useState(false);
    const [orderId, setOrderId] = useState("");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    }
    
    const handleSameAddress = (event) => {
        setAddressCheck(!addressCheck)
    }

    const [cart, setCart] = useState([]);
 
    useEffect(() => {
        async function getCart() {
            //check for staleness here
            const { cart } = await idbPromise('cart', 'get');
            setCart(cart)
        }

        if (!cart.length) {
            getCart()
        }

        async function updatePaymentIntent() {
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            const response = await updateAmount(
                {
                    amount: totalAmount(cart),
                    stripeId: paymentIntent.id
                },
                token
            )

            if(response.status != 200){
                alert('Payment Update failed')
            }

            const data = await response.json()
            setOrderId(data.id)
        }

        updatePaymentIntent()
    }, [cart.length]);

    function totalAmount(arr) {
        const sum = arr.reduce((prev, curr) => prev + parseInt(curr.price), 0);
        console.log(10 + sum + (Math.round((sum * 0.0825) * 100)/ 100))
        //10 is the flat value of shipping
        return (10 + sum + (Math.round((sum * 0.0825) * 100) / 100))
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
                destroyCookie(null, "paymentIntentId")
                setCheckoutSuccess(true);

                const user = await Auth.getProfile();

                const productsOrdered = [];
                cart.forEach(item => {
                    productsOrdered.push(item.id)
                })

                const orderObj = {
                    id: user.data._id,
                    products: productsOrdered,
                    addressCheck,
                    shippingAddress: {
                        ...userFormData
                    },
                    billingAddress: {
                        ...userFormData
                    },
                    paymentConfirmation: orderId,
                    totalPrice: totalAmount(cart),
                    specialInstructions: "None"
                }
                await createOrder(orderObj)

                const cartDeleteObj = {
                    id: user.data._id
                }
                await idbPromise("delete", cartDeleteObj)

                setTimeout(() => {
                    useRouter('/')
                }, 3000)
            };

            setUserFormData({
                first_name: "",
                last_name: "",
                // OPTIONAL //
                phone: "",
                // ENTER IN ADDRESS FORM //
                addressOne: "",
                addressTwo: "",
                city: "",
                state: "",
                zip: "",
                // // GET FROM NEW WALLET APP //
                // walletAddress: "",
                // walletBalance: "",
                // completed: true
              });
        } catch (err) {
            setCheckoutError(err.message)
        }
    }

    if (checkoutSuccess) return <p>Payment Successful</p>

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

    return (<>
        <form onSubmit={handleSubmit}>
            <AddressCheckout inputFn={handleInputChange} sameAddress={handleSameAddress}/>
            {/* don't call it a comeback */}
            <div aria-label="Please enter your credit or debit card information." className="user-register-address-header center">PAYMENT DETAILS</div>
            <div className="row container">
                <div className='cc-input-wrapper s12'>
                    <CardElement options={options} />
                </div>
            </div>
            {paymentIntent ?
                <div className='checkout-details_cost center-text'>
                    <div aria-label={'Your cost is $'+ (10 - totalAmount(cart))}><b>Cost&ensp;//&ensp;${(totalAmount(cart)-10).toFixed(2)}</b></div>
                    <div aria-label={'Your shipping is $10'}><b>Shipping&ensp;//&ensp;$10</b></div>
                    <h2 aria-label={'Your total is $'+totalAmount(cart)} className='c-total'>
                        <b>Total:</b> ${totalAmount(cart)}
                    </h2>
                </div> : <></>}
            <div className='row center checkout-details_submit'>
                <div className='col s12'>
                    <button className='theme-btn pay-button' type='submit' disabled={!stripe}>SUBMIT</button>
                </div>
            </div>

            {checkoutError && <span style={{ color: "#aa3d3d" }}>{checkoutError}</span>}
        </form></>
    )
}

export default CheckoutForm