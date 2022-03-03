import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
import { useRouter } from 'next/router';
import Link from 'next/link';
// import Logo from "../images/header.svg";
// import Image from 'next/image';
import ImageContainer from "./ImageContainer";
import SvgContainer from "./SvgContainer";
import NotificationBar from './NotificationBar';
import SiteData from "../config/site-data.json"
import Auth from '../utils/auth';
import { getSingleUser } from '../utils/API';
import HeaderImg from '../public/images/header.svg';

const Header = () => {

  // Get User Data
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    let notificationBar = document.getElementById('notification-bar');
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        const response = await getSingleUser(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);

      } catch (err) {
        console.error(err);
      }
      notificationBar.classList.remove('hide');
    };
    // console.log(userData)
    getUserData();
  }, [userDataLength]);

  // const getWallet = localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses');

  let siteName = SiteData.name;
  let abbv = SiteData.abbreviation.toLowerCase();
  let notification;

  // const { asPath, pathname } = withRouter();
  // console.log(asPath); // '/blog/xyz'
  // console.log(pathname); // '/blog/[slug]'

  const router = useRouter();
  const path = router.pathname;

  const notificationLink = "/register"

  notification =
    <>
      Create your account today and get a <u>FREE</u> Limited Edition VoT NFT!&nbsp;
      <span className="info-icon" id="info-icon">
        <i className="material-icons info-icon">info_outline</i>
      </span>
    </>;

  return (
    <header className="site-header" id="site-header">
      <div className="navbar-container black" id="header-container">
        <Link className="navbar-brand container" href="/" id="header-link-container">
          <div className="header-img-container" id="header-img-container">
            <div className={path === "/" ? "header-img animate__animated animate__fadeInDown " + abbv + "-txt-header" : abbv + "-txt-header header-img"}>
              <SvgContainer
                layout="responsive"
                src={HeaderImg}
                id="header-img"
                draggable="false"
                description={siteName ? siteName + " Logo" : "Website Logo"}
              />
            </div>
          </div>
        </Link>
        {userData.walletAddress ? <></>
          : <div id="notification-bar"><NotificationBar text={notification} link={notificationLink} /></div>
        }
      </div>
    </header>

  );
}

export default Header;