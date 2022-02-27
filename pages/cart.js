import React from "react";
import Link from "next/link";
import DefaultLayout from "../templates/DefaultLayout";

const Cart = () => {
  return (
    <DefaultLayout>
      <div className="main-conten animate__animated animate__fadeIn" id="content">
        <div className="index-section animate__animated animate__fadeIn cart-page">
          <h1 className="center cart-header">Cart</h1>
          <div className="cart center">
            <div classname="empty-cart center">
              <p>Your cart is currently empty.</p>
              <Link href="/shop"><a>
              <p className="link cart-view-products">VIEW PRODUCTS</p>
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Cart;