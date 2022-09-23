import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import DefaultLayout from "../../templates/DefaultLayout";

const stripePromise = loadStripe("pk_test_51K4evvCa1OD2RYqlwwQm36uEOgpLsyziGmhNZso9sxmlwVSsvCaalITPCYL7MRfoVTa5tyyoHGEh4cZAUR6bd9sQ00FKPpQ6ks")

const Details = () => {
    return (
        <>
        <DefaultLayout title={"Checkout Details"}>
            <div className="checkout-details">
                <h1 className="checkout-header center">Checkout Details</h1>
                <Elements stripe={stripePromise} >
                    <CheckoutForm />
                </Elements>
            </div>
        </DefaultLayout>
        </>
    );
}
export default Details;
