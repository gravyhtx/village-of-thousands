import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import SvgContainer from "./SvgContainer";
import NotificationBar from './NotificationBar';
import Auth from '../utils/auth';
import { getSingleUser } from '../utils/API';
import ImageContainer from "./ImageContainer";
import { resendConfirmationFetch } from "../utils/API";


const Header = ({ images }) => {

  const [userData, setUserData] = useState({
    email: '',
    walletAddress: []
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        if(!token) {
          return
        }

        const response = await getSingleUser(token);

        const user = await response.json();
        setUserData(user.foundUser);
        setLoaded(true);
      } catch (err) {
        console.error(err);
        setLoaded(true);
      }
    };
    
    getUserData();
  }, []);

  const router = useRouter();
  const path = router.pathname;

  const notificationLink = "/register";

  const svgHeader = "/_next/static/media/header.77dc7a1a.svg"
  const Svg = () => {
    return (images ? images[0] :
    <SvgContainer
      layout="responsive"
      src={svgHeader}
      id="header-img"
      draggable="false"
      description="Village of Thousands Logo"
    />)
  }
  const pngHeader = "/_next/static/media/header.fb0ffabf.png"

  const Png = () => {
    return (images ? images[1] :
    <ImageContainer
      layout="responsive"
      src={pngHeader}
      id="header-img"
      draggable="false"
      description="Village of Thousands Logo"
    />)
  }


  // NEED TO CHANGE TEXT TO SOMETHING ELSE -- Check email
  const notificationText = <>Create an account with us today to shop our line of sustainable apparel and join the movement!</>
  const notificationTextWallet = <>Add your In-Browser Web3 Wallet to your account to prepare for our Web 3.0 online community!&nbsp;</>

  const helpLink = "/faq#3"
  const help =
    <span className="info-icon" id="info-icon">&nbsp;
      <Link href={helpLink}>
        <i className="material-icons info-icon">info_outline</i>
      </Link>
    </span>

  const [emailSent, setEmailSent] = useState(false)

  const resendConfirmation = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const profile = token ? Auth.getProfile() : null;
    resendConfirmationFetch(profile);
    setEmailSent(true);
  }

  const activateText = emailSent ?
      <span className="notify_email-sent form-text-blink">
        Activation email sent to <span className="notify_sent-to underline weight-4">{ userData.email }</span>.
        Please check your "Spam" and "Promotions" folders, or DM us on Instagram if you still don't see it.
      </span> :
      <span onClick={resendConfirmation}>
        Please activate your account. Check your email for instructions or click here to resend the activation link.
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
        /_next/static/media/header.fb0ffabf.png?imwidth=640 640w,
        /_next/static/media/header.fb0ffabf.png?imwidth=750 750w,
        /_next/static/media/header.fb0ffabf.png?imwidth=828 828w,
        /_next/static/media/header.fb0ffabf.png?imwidth=1080 1080w,
        /_next/static/media/header.fb0ffabf.png?imwidth=1200 1200w,
        /_next/static/media/header.fb0ffabf.png?imwidth=1920 1920w,
        /_next/static/media/header.fb0ffabf.png?imwidth=2048 2048w,
        /_next/static/media/header.fb0ffabf.png?imwidth=3840 3840w"
      src="/_next/static/media/header.fb0ffabf.png?imwidth=3840"
      decoding="async" className="image-class"
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
  
  const Notification = () => {
    if(!userData.email) {
      return (
        <div id="notification-bar">
        <NotificationBar text={notificationText} link={notificationLink} ext={help} extLink={helpLink} />
        </div>
      )
    }
    if(loaded && userData.email && !userData.completeRegistration) {
      return (
        <div id="notification-bar">
        <NotificationBar text={activateText} />
        </div>
      )
    }
    if(loaded && userData.email && !userData.walletAddress.length) {
      return(
        <div id="notification-bar">
        <NotificationBar text={notificationTextWallet} link={notificationLink} ext={help} extLink={helpLink} />
        </div>
      )
    }
    return(<></>)
  }
  
  return (
    <header className="site-header" id="site-header">
      <div className="navbar-container black" id="header-container">
        <Link className="navbar-brand container" href="/" id="header-link-container">
          <div className="header-img-container disable-highlight" id="header-img-container">
            <div className={
              path === "/"
              ? "header-img animate__animated animate__fadeInDown vot-txt-header"
              : "vot-txt-header header-img" }>
              <Fallback />
            </div>
          </div>
        </Link>
        <Notification />
      </div>
    </header>

  );
}

export default Header;