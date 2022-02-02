import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from '../components/Footer';
import NavDesktop from "../components/NavDesktop";
import NavMobile from "../components/NavMobile";
import RandomQuote from "../components/modules/RandomQuote";
import ImageContainer from "../components/ImageContainer";

import Pixels from "../images/art/choose_your_vot.png"

const Policy = () => {
    return (
        <div className="animate__animated animate__fadeIn">
        <Header />
        <NavMobile />
        <div id="content" className="main-content">
        <div className="spacer"></div>
        <div className="index-section animate__animated animate__fadeIn">
        Village of Thousands Shipping and Returns Policy

        Returns
        You have 30 (change this) calendar days to return an item from the date you received it.
        To be eligible for a return, your item must be unused and in the same condition that you received it.
        Your item must be in the original packaging.
        Your item needs to have the receipt or proof of purchase.
        For additional information in this section, create your own Return & Refund Policy.
        Refunds
        Once we receive your item, we will inspect it and notify you that we have received your returned
        item. We will immediately notify you on the status of your refund after inspecting the item.
        If your return is approved, we will initiate a refund to your credit card (or original method of
        payment).
        You will receive the credit within a certain amount of days, depending on your card issuer's policies.
        For additional information in this section, create your own Return & Refund Policy.
        Shipping
        You will be responsible for paying for your own shipping costs for returning your item. Shipping
        costs are nonrefundable.
        If you receive a refund, the cost of return shipping will be deducted from your refund.
        For additional information in this section, create your own Return & Refund Policy.
        Contact Us
        If you have any questions on how to return your item to us, contact us.

        </div>
        </div>
        <Footer />
        <NavDesktop />
        </div>
    );
}

export default Policy;