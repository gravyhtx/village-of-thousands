import React, { useState, useEffect } from "react";
import Stripe from "stripe";
import { parseCookies, setCookie } from 'nookies';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import AddressCheckout from "../../components/AddressCheckout";
import Header from "../../components/Header";
// import './materialize.css';
const stripePromise = loadStripe("pk_test_51K4evvCa1OD2RYqlwwQm36uEOgpLsyziGmhNZso9sxmlwVSsvCaalITPCYL7MRfoVTa5tyyoHGEh4cZAUR6bd9sQ00FKPpQ6ks")

export const getServerSideProps = async (ctx) => {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY_TEST);

    let paymentIntent;

    const { paymentIntentId } = await parseCookies(ctx);

    if (paymentIntentId) {
        paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

        return {
            props: {
                paymentIntent
            }
        }
    }



    paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: 'usd'
    })

    setCookie(ctx, 'paymentIntentId', paymentIntent.id)

    return {
        props: {
            paymentIntent
        }
    }
}

const Details = ({ paymentIntent }) => {
    const [formState, setFormState] = useState([]);

    const handleFormSubmit = (information) => {
        console.log(information)
    }

    return (
        <>
        <Header />
        <AddressCheckout handleFormSubmit={handleFormSubmit}/>
        <Elements stripe={stripePromise}>
            <CheckoutForm paymentIntent={paymentIntent} />
        </Elements>
        </>
    );
}
export default Details;
