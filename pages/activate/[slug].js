import React, { useEffect, useState } from "react";
import Link from "next/link";
import DefaultLayout from "../../templates/DefaultLayout";
import { useRouter } from "next/router";

import votHeader from '../../public/images/header.svg';

import { accountActivation, getPendingUser } from "../../utils/API";
import withAuth from '../../utils/withAuth';
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

  const [pendingUser, setPendingUser] = useState([]);

  useEffect(() => {
    const loadPendingUser = async () => {
      try {
        const userExists = await getPendingUser(slug);
        console.log(userExists);
        
        if(!userExists) {
          console.log('user does not exist')
          return
        }
        const user = await userExists.json()
        console.log(user, slug)
        const activate = await accountActivation(slug);

        
        if(!activate) {
          console.log('activation error at slug js')
          return
        }

        setPendingUser(userExists)
      } catch (err) {
        console.error(err)
      }
    }

    loadPendingUser();
  }, [])

  const Content = () => {
      return (
        <>
        {pendingUser.length ? (
          <div> Welcome to the jungle</div>
          ): (
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
      images={{src:"/_next/static/media/header.fb0ffabf.png"}}
      id="header-img"
      draggable="false"
      description="Village of Thousands Logo"
    />
  ]
  
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

// export default withAuth(Activate);
export default Activate;