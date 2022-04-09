import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React from 'react';

const CheckoutForm = ({ paymentIntent }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const {error, paymentIntent: {status}} = await stripe.confirmCardPayment(paymentIntent.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })
        
            if (error) throw new Error(error.message);

            if (status === 'succeeded') alert('Payment made.');
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* don't call it a comeback */}
            <CardElement />
            <button type='submit' disabled={!stripe}>Pay now</button>
        </form>
    )
}

export default CheckoutForm