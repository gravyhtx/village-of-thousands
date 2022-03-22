import React, { useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "../../templates/DefaultLayout";
import { useRouter } from "next/router";

import votHeader from '../../public/images/header.svg';

import { accountActivation, getPendingUser } from "../../utils/API";
import Auth from '../../utils/auth';
import ImageContainer from "../../components/ImageContainer";
import SvgContainer from "../../components/SvgContainer";

import LoginContainer from "../../components/LoginActivateContainer";

import HeaderImg from './header.png';
import HeaderSvg from './header.svg';
import SiteImage from "../../components/SiteImage";

const Activate = () => {
  const router = useRouter();

  const [pendingUser, setPendingUser] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [activateStatus, setActivateStatus] = useState(false);

  useEffect(() => {
    const checkLogged = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (token) {
          setIsLogged(true);
          // activatePendingUser();
        }
      } catch (err) {
        console.error(err)
      }
    }

    checkLogged();

    if(activateStatus) {
      setTimeout(function(){
        router.push('/')
      }, 6000);
    }
  }, [])

  const activatePendingUser = async () => {

    const userExists = await getPendingUser(router.query.slug);
    console.log(userExists);

    if (!userExists) {
      console.log('user does not exist')
      return
    }
    const user = await userExists.json()
    console.log(user)
    const activate = await accountActivation(router.query.slug);


    if (!activate) {
      console.log('activation error at slug js')
      return
    }

    setActivateStatus(true)
    setPendingUser(userExists);
  }

  const Content = () => {
    return (
      <>
        {isLogged ? (
          <div> Welcome to the jungle</div>
        ) : (
          <div>
            {/* This is a slug. The slug is {slug}. */}
            Click here to resend activation email.
          </div>
        )}
      </>
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
      images={{ src: "/_next/static/media/header.fb0ffabf.png" }}
      id="header-img"
      draggable="false"
      description="Village of Thousands Logo"
    />
  ]

  return (
    <DefaultLayout images={images}>
      <div className="index-section animate__animated animate__fadeIn activate-page center">
        <Content />
        {!isLogged ? (
          <>
            <Link href="/"><a>
              <p className="link cart-view-products">GO HOME</p>
              </a></Link>
            <LoginContainer />
          </>
        ) : 
        (
          <div>
            {!activateStatus ? (
              <button onClick={activatePendingUser} >You will press me to activate</button>
            ): (
              <h1>CONGRATS ON ACTIVATING YOUR ACCOUNT NERD</h1>
            )}
          </div>
        )
        }
      </div>
    </DefaultLayout>
  );
}

// export default withAuth(Activate);
export default Activate;