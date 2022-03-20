import React from "react";
import Link from "next/link";

import DefaultLayout from "../../templates/DefaultLayout";

const Activate = () => {
  return (
    <DefaultLayout>
      <div className="main-conten animate__animated animate__fadeIn" id="content">
        <div className="index-section animate__animated animate__fadeIn cart-page">
          {/* <h1 className="center cart-header">Cart</h1> */}
          <div className="cart center">
            <div classname="empty-cart center">
              <p>Your account has been successfully activated!</p>
              <Link href="/"><a>
              <p className="link cart-view-products">GO HOME</p>
              </a></Link>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Activate;