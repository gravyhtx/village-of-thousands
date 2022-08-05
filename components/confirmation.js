import React from "react";
// import Stripe from "stripe";
// import { parseCookies, setCookie } from 'nookies';
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "../../components/CheckoutForm";
import Link from "next/link";
import DefaultLayout from "../templates/DefaultLayout";
// import './materialize.css';
// const stripePromise = loadStripe("pk_live_51K4evvCa1OD2RYqlnmHnOXiqISnldSVVMxkiPTYwAOziYwpcABLkCQTyakjtp0qdRZpPTArrI2lwH2fteqRXTMj400C6mtUMUS")

// export const getServerSideProps = async (ctx) => {
//     const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

//     let paymentIntent;

//     const { paymentIntentId } = await parseCookies(ctx);

//     if (paymentIntentId) {
//         paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

//         return {
//             props: {
//                 paymentIntent
//             }
//         }
//     }



//     paymentIntent = await stripe.paymentIntents.create({
//         amount: 100,
//         currency: 'usd'
//     })

//     setCookie(ctx, 'paymentIntentId', paymentIntent.id)

//     return {
//         props: {
//             paymentIntent
//         }
//     }
// }

const Succcess = () => {
    return (
        <>
            <div className="checkout-details">
                {/* <h1 className="checkout-header center">Checkout Success</h1> */}
                <div class="user-register-address-header center">
                  <div>ORDER CONFIRMATION NUMBER</div>
                  <h2>#404302432</h2>
                </div>
                <br/><br/>
                <div class="products-link_view-all center disable-highlight">
                  <span class="special-link products-link_view-all">
                  <Link href="/">
                  <a class="blue-outline special-link special-border">
                  <span class="view-all-products">GO HOME</span></a></Link>
                  </span>
                </div>
            </div>
        </>
    );
}

export default Succcess;