import React from "react";
import Link from "next/link";

import DefaultLayout from "../../templates/DefaultLayout";

const Activate = () => {
  return (
    <DefaultLayout>
      <div className="index-section animate__animated animate__fadeIn activate-page center">
        <p>Your account has been successfully activated!</p>
        <Link href="/"><a>
        <p className="link cart-view-products">GO HOME</p>
        </a></Link>
      </div>
    </DefaultLayout>
  );
}

export default Activate;