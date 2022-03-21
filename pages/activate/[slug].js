import React, { useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "../../templates/DefaultLayout";
import { useRouter } from "next/router";

import ImageContainer from "../../components/ImageContainer";
import SvgContainer from "../../components/SvgContainer";

import LoginContainer from "../../components/LoginActivateContainer";

import HeaderImg from './header.png';
import HeaderSvg from './header.svg';
import SiteImage from "../../components/SiteImage";

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
          This is a slug. The slug is {slug}.
          {/* Click here to resend activation email. */}
        </div>
      )
  };

  const images = [
    <SvgContainer
      layout="responsive"
      src={HeaderSvg}
      id="header-img"
      draggable="false"
      description="Village of Thousands Logo"
    />,
    <SiteImage
      images={{src:"/_next/static/media/header.fb0ffabf.png"}}
      id="header-img"
      draggable="false"
      description="Village of Thousands Logo"
    />
  ]
  
  console.log(slug);

  return (
    <DefaultLayout images={images}>
      <div className="index-section animate__animated animate__fadeIn activate-page center">
        <Content />
        <Link href="/"><a>
          <p className="link cart-view-products">GO HOME</p>
        </a></Link>
        <LoginContainer />
      </div>
    </DefaultLayout>
  );
}

export default Activate;