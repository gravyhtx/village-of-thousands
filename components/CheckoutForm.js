import React, {useState, useEffect} from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { destroyCookie } from 'nookies';
import { idbPromise } from "../utils/helpers";

const CheckoutForm = ({ paymentIntent }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [checkoutError, setCheckoutError] = useState();
    const [checkoutSuccess, setCheckoutSuccess] = useState();

    const [cart, setCart] = useState([]);

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

        paymentIntent.amount = totalAmount(cart) * 100
        console.log(paymentIntent)
    }, [cart.length]);

    function totalAmount(arr) {
        const sum = arr.reduce((prev, curr) => prev + parseInt(curr.price), 0);

        return sum + (Math.round((sum * 0.0825) * 100) / 100)
    }


    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const {error, paymentIntent: {status}} = await stripe.confirmCardPayment(paymentIntent.client_secret, {
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

    if ( checkoutSuccess) return <p>Payment Successful</p>

    return (
        <form onSubmit={handleSubmit}>
            {/* don't call it a comeback */}
            <CardElement />
            <button type='submit' disabled={!stripe}>Pay now</button>
        
            {checkoutError && <span style={{color: "red"}}>{checkoutError}</span>}
        </form>
    )
}

export default CheckoutForm