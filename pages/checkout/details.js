import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import DefaultLayout from "../../templates/DefaultLayout";

const stripePromise = loadStripe("pk_live_51K4evvCa1OD2RYqlnmHnOXiqISnldSVVMxkiPTYwAOziYwpcABLkCQTyakjtp0qdRZpPTArrI2lwH2fteqRXTMj400C6mtUMUS")

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
