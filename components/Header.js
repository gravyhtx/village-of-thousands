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
        
        if(!token) {
          return
        }

        const response = await getSingleUser(token);

        const user = await response.json();
        setUserData(user);

      } catch (err) {
        console.error(err);
      }
    };
    
    getUserData();
  }, [userDataLength]);

  let siteName = SiteData.name;

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

  const notificationText = <>Create your account today and get a <u>FREE</u> Limited Edition VoT NFT!&nbsp;</>

  const helpLink = "/faq#8"
  const help =
    <span className="info-icon" id="info-icon">
      <Link href={helpLink}><a>
      <i className="material-icons info-icon">info_outline</i>
      </a></Link>
    </span>

  const fallbackStyles = {
    position: 'absolute',
    inset: '0px',
    boxSizing: 'border-box',
    padding: '0px',
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: '0px',
    height: '0px',
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%'
  }
  const fallbackImage =
    <img alt="Village of Thousands Logo" id="header-img" draggable="false" sizes="100vw"
      srcSet="
        https://villageofthousands.com/_next/static/media/header.fb0ffabf.png?imwidth=640 640w,
        https://villageofthousands.com/_next/static/media/header.fb0ffabf.png?imwidth=750 750w,
        https://villageofthousands.com/_next/static/media/header.fb0ffabf.png?imwidth=828 828w,
        https://villageofthousands.com/_next/static/media/header.fb0ffabf.png?imwidth=1080 1080w,
        https://villageofthousands.com/_next/static/media/header.fb0ffabf.png?imwidth=1200 1200w,
        https://villageofthousands.com/_next/static/media/header.fb0ffabf.png?imwidth=1920 1920w,
        https://villageofthousands.com/_next/static/media/header.fb0ffabf.png?imwidth=2048 2048w,
        https://villageofthousands.com/_next/static/media/header.fb0ffabf.png?imwidth=3840 3840w"
      src="https://villageofthousands.com/_next/static/media/header.fb0ffabf.png?imwidth=3840"
      decoding="async" data-nimg="responsive" className="image-class"
      style={fallbackStyles}/>
  
  const Fallback = () => {
    return (
    <div className="image-container">
      <span style={{ boxSizing: 'border-box', display: 'block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '0px', position: 'relative'}}>
      <span style={{ boxSizing: 'border-box', display: 'block', width: 'initial', height: 'initial', background: 'none', opacity: '1', border: '0px', margin: '0px', padding: '7.45% 0px 0px'}}></span>
      { fallbackImage }
      </span>
    </div>)
  }

  return (
    <header className="site-header" id="site-header">
      <div className="navbar-container black" id="header-container">
        <Link className="navbar-brand container" href="/" id="header-link-container">
          <div className="header-img-container" id="header-img-container">
            <div className={
              path === "/"
              ? "header-img animate__animated animate__fadeInDown vot-txt-header"
              : "vot-txt-header header-img" }>
              {useWindowSize().width > 2400
                ? <Svg />
                : <Fallback />}
            </div>
          </div>
        </Link>
        {!userData.walletAddress
          ? <div id="notification-bar"><NotificationBar text={notificationText} link={notificationLink} ext={help} extLink={helpLink} /></div>
          : <></>}
      </div>
    </header>

  );
}

export default Header;