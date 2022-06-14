import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';
import { useScreenWidth } from '../modules/getWindow'
import { idbPromise } from "../utils/helpers";
import { updateAmount } from "../utils/API";
import Auth from '../utils/auth';

// const updatePromise = require("stripe")(process.env.STRIPE_PRIVATE_KEY_TEST)

const CheckoutForm = ({ paymentIntent }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError, setCheckoutError] = useState();
    const [checkoutSuccess, setCheckoutSuccess] = useState();

    const [cart, setCart] = useState([]);
    // console.log(stripeObj)
    // console.log(useScreenWidth());
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

            console.log(paymentIntent.amount)

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
        console.log(10 + sum + (Math.round((sum * 0.0825) * 100)/ 100))
        //10 is the flat value of shipping
        return 10 + sum + (Math.round((sum * 0.0825) * 100) / 100)
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
                setCheckoutSuccess(true)
            };
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
                  color: '#eee',
                },
          
                '::placeholder': {
                  color: '#595d7c',
                },
          
                ':focus::placeholder': {
                  color: '#aaa',
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
        <div aria-label="Please enter your credit or debit card information." className="user-register-address-header center">PAYMENT DETAILS</div>
        <form onSubmit={handleSubmit}>
            {/* don't call it a comeback */}
            <div className="row container">
                <div className='cc-input-wrapper s12'>
                    <CardElement options={options} />
                </div>
            </div>
            {paymentIntent ?
                <div className='checkout-details_cost center-text'>
                    <div aria-label={'Your cost is $'+(paymentIntent.amount/100)}><b>Cost&ensp;//&ensp;${paymentIntent.amount/100}</b></div>
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