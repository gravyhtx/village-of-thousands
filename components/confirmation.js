import React from "react";
import Link from "next/link";

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
                <div className="products-link_view-all center disable-highlight">
                  <span className="special-link products-link_view-all">
                  <Link href="/">
                  <a className="blue-outline special-link special-border">
                  <span className="view-all-products">GO HOME</span></a></Link>
                  </span>
                </div>
            </div>
        </>
    );
}

export default Succcess;