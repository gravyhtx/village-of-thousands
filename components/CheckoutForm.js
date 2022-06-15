import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';
import { idbPromise } from "../utils/helpers";
import { updateAmount } from "../utils/API";
import Auth from '../utils/auth';
import AddressCheckout from "./AddressCheckout";
// import {}

// const updatePromise = require("stripe")(process.env.STRIPE_PRIVATE_KEY_TEST)

const CheckoutForm = ({ paymentIntent }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError, setCheckoutError] = useState();
    const [checkoutSuccess, setCheckoutSuccess] = useState();
    const [userFormData, setUserFormData] = useState({});
    const [addressCheck, setAddressCheck] = useState(false)

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value)
        setUserFormData({ ...userFormData, [name]: value });
    }
    
    const handleSameAddress = (event) => {
        setAddressCheck(!addressCheck)
    }

    const [cart, setCart] = useState([]);
    // console.log(stripeObj)
    useEffect(() => {
        async function getCart() {
            //check for staleness here
            const { cart } = await idbPromise('cart', 'get');
            console.log(cart)
            setCart(cart)
        }

        if (!cart.length) {
            getCart()
        }

        async function updatePaymentIntent() {
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            console.log(paymentIntent)

            updateAmount(
                {
                    amount: totalAmount(cart),
                    stripeId: paymentIntent.id
                },
                token
            )
        }

        updatePaymentIntent()
    }, [cart.length]);

    function totalAmount(arr) {
        const sum = arr.reduce((prev, curr) => prev + parseInt(curr.price), 0);

        return sum + (Math.round((sum * 0.0825) * 100) / 100)
    }


    const handleSubmit = async event => {
        event.preventDefault();
        console.log(userFormData);
        console.log(addressCheck);

        // try {
        //     const { error, paymentIntent: { status } } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        //         payment_method: {
        //             card: elements.getElement(CardElement)
        //         }
        //     })

        //     if (error) throw new Error(error.message);

        //     if (status === 'succeeded') {
        //         destroyCookie(null, "paymentIntentId")
        //         setCheckoutSuccess(true)
        //     };

        //     setUserFormData({
        //         first_name: "",
        //         last_name: "",
        //         // OPTIONAL //
        //         phone: "",
        //         // ENTER IN ADDRESS FORM //
        //         addressOne: "",
        //         addressTwo: "",
        //         city: "",
        //         state: "",
        //         zip: "",
        //         // // GET FROM NEW WALLET APP //
        //         // walletAddress: "",
        //         // walletBalance: "",
        //         // completed: true
        //       });
        // } catch (err) {
        //     setCheckoutError(err.message)
        // }
    }

    if (checkoutSuccess) return <p>Payment Successful</p>

    const options = {
        style: {
            base: {
                color: '#ff0',
                fontWeight: 600,
                fontFamily: 'Quicksand, Open Sans, Segoe UI, sans-serif',
                fontSize: '32px',
                fontSmoothing: 'antialiased',
          
                ':focus': {
                  color: '#424770',
                },
          
                '::placeholder': {
                  color: '#fff',
                },
          
                ':focus::placeholder': {
                  color: '#CFD7DF',
                },
              },
              invalid: {
                color: '#fff',
                ':focus': {
                  color: '#FA755A',
                },
                '::placeholder': {
                  color: '#FFCCA5',
                },
              },
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <AddressCheckout inputFn={handleInputChange} sameAddress={handleSameAddress}/>
            {/* don't call it a comeback */}
            <div className="row container">
                <div className='cc-input-wrapper s12'>
                    <CardElement options={options} />
                </div>
            </div>
            <div className='row'>
                <div className='offset-m5 col s12 m4'>
                    <button className='account-wallet-btn pay-btn' type='submit' disabled={!stripe}>Pay now</button>
                </div>
            </div>

            {checkoutError && <span style={{ color: "red" }}>{checkoutError}</span>}
        </form>
    )
}

export default CheckoutForm