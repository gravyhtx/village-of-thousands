import React, { useState, useEffect } from "react";
import Stripe from "stripe";
import { parseCookies, setCookie } from 'nookies';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import DefaultLayout from "../../templates/DefaultLayout";
// import './materialize.css';
const stripePromise = loadStripe("pk_live_51K4evvCa1OD2RYqlnmHnOXiqISnldSVVMxkiPTYwAOziYwpcABLkCQTyakjtp0qdRZpPTArrI2lwH2fteqRXTMj400C6mtUMUS")

export const getServerSideProps = async (ctx) => {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

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
    return (
        <>
        <DefaultLayout title={"Checkout Details"}>
            <div className="checkout-details">
                <h1 className="checkout-header center">Checkout Details</h1>
                <Elements stripe={stripePromise} >
                    <CheckoutForm paymentIntent={paymentIntent} />
                </Elements>
            </div>
        </DefaultLayout>
        </>
    );
}
export default Details;
