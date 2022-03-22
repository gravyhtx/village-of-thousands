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
  // const [ activationId, setActivationId ] = useState('');
  const router = useRouter();
  const [slug, setSlug] = useState("");
  
  // const slug = router.query.slug;

  const [pendingUser, setPendingUser] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  // const [slug, setSlug] = useState("")
  useEffect(() => {
    const checkLogged = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (token) {
          setIsLogged(true);
          // setSlug(router.query.slug);
          // setTimeout(() => {
            activatePendingUser();
          // }, 2000);
        }
      } catch (err) {
        console.error(err)
      }
    }

    checkLogged();
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
      <div className="index-section container animate__animated animate__fadeIn activate-page center">
        <Content />
        {!isLogged ? (
          <>
            <LoginContainer />
          </>
        ) : 
        (
          <>
            <div>yolo</div>
            {/* <Link href="/"><a>
              <p className="link cart-view-products">GO HOME</p>
            </a></Link> */}
          </>
        )
        }
      </div>
    </DefaultLayout>
  );
}

// export default withAuth(Activate);
export default Activate;