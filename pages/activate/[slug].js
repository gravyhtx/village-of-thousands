import React, { useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "../../templates/DefaultLayout";
import { useRouter } from "next/router";

import votHeader from '../../public/images/header.svg'

const Activate = () => {
  // const [ activationId, setActivationId ] = useState('');
  const router = useRouter();
  const slug = router.query.slug;

  // useEffect(() => {
  //   const slug = router.query.slug;
  //   setActivationId(slug);
  //   console.log(activationId);
  // })

  const Content = () => {
      return (
				<div>
          {/* This is a slug. The slug is {slug}. */}
          Click here to resend activation email.
        </div>
      )
  };
  
  console.log(slug);

  return (
    <DefaultLayout>
      <div className="index-section activation-page center">
        <Content />
        <Link href="/"><a>
          <p className="link cart-view-products">GO HOME</p>
        </a></Link>
      </div>
    </DefaultLayout>
  );
}

export default Activate;