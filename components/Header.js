import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Logo from "../images/header.svg";
// import Image from 'next/image';
// import ImageContainer from "./ImageContainer";
import SvgContainer from "./SvgContainer";
import NotificationBar from './NotificationBar';
import SiteData from "../config/site-data.json"
import Auth from '../utils/auth';
import { getSingleUser } from '../utils/API';
import HeaderImg from '../public/images/header.png';
import HeaderSvg from '../public/images/header.svg';
import ImageContainer from "./ImageContainer";
import { useWindowSize } from "../modules/getWindow";

const Header = ({ images }) => {

  // Get User Data
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        const response = await getSingleUser(token);

        // if (!response.ok) {
        //   throw new Error('something went wrong!');
        // }

        const user = await response.json();
        setUserData(user);

      } catch (err) {
        console.error(err);
      }
    };
    // console.log(userData)
    getUserData();
  }, [userDataLength]);

  // const getWallet = localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses');

  let siteName = SiteData.name;
  let notification;

  // const { asPath, pathname } = withRouter();
  // console.log(asPath); // '/blog/xyz'
  // console.log(pathname); // '/blog/[slug]'

  const router = useRouter();
  const path = router.pathname;

  const notificationLink = "/register";

  const Svg = () => {
    return (images ? images[0] :
    <SvgContainer
      layout="responsive"
      src={HeaderSvg}
      id="header-img"
      draggable="false"
      description="Village of Thousands Logo"
    />)
  }
  
  const Png = () => {
    return (images ? images[1] :
    <ImageContainer
      layout="responsive"
      src={HeaderImg}
      id="header-img"
      draggable="false"
      description="Village of Thousands Logo"
    />)
  }

  useEffect(() => {
    notification =
    <>
      Create your account today and get a <u>FREE</u> Limited Edition VoT NFT!&nbsp;
      <span className="info-icon" id="info-icon">
        <Link href="/faq#8"><a>
        <i className="material-icons info-icon">info_outline</i>
        </a></Link>
      </span>
    </>;
  })

  return (
    <header className="site-header" id="site-header">
      <div className="navbar-container black" id="header-container">
        <Link className="navbar-brand container" href="/" id="header-link-container">
          <div className="header-img-container" id="header-img-container">
            <div className={
              path === "/"
              ? "header-img animate__animated animate__fadeInDown vot-txt-header"
              : "vot-txt-header header-img" }>
              {/* {useWindowSize().width > 2400
              ? <SvgContainer
                  layout="responsive"
                  src={HeaderSvg}
                  id="header-img"
                  draggable="false"
                  description="Village of Thousands Logo"
                />
              : <ImageContainer
                  layout="responsive"
                  src={HeaderImg}
                  id="header-img"
                  draggable="false"
                  description="Village of Thousands Logo"
                />} */}
              {useWindowSize().width > 2400
                ? <Svg />
                : <Png />}
            </div>
          </div>
        </Link>
        {userData.walletAddress
          ? <></>
          : <div id="notification-bar"><NotificationBar text={notification} link={notificationLink} /></div>
        }
      </div>
    </header>

  );
}

export default Header;