import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from '../components/Footer';
import NavDesktop from "../components/NavDesktop";
import NavMobile from "../components/NavMobile";

const Cart = () => {
    return (
        <div className="animate__animated animate__fadeIn">
        <Header />
        <NavMobile />
        <div id="content" className="main-content">
        <div className="spacer"></div>
        <div className="index-section animate__animated animate__fadeIn cart-page">
        <h1 className="center">Cart</h1>
        <br/>
        <div className="cart center">
            <div classname="empty-cart center">
                <p>Your cart is currently empty.</p>
                <Link to="/products">
                <p className="link cart-view-products">VIEW PRODUCTS</p>
                </Link>
            </div>
        </div>
        </div>
        </div>
        <Footer />
        <NavDesktop />
        </div>
    );
}

export default Cart;