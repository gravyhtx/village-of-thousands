import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Icon } from "@mui/material";

import Auth from '../utils/auth';
import { getSingleUser, resendConfirmationFetch } from '../utils/API';

import Web3Wallet from "./Web3Wallet.tsx";

import Blockie from "./Blockie";
import Avatar from "../public/images/icons/vot_avatar.svg";
import SvgContainer from "../components/SvgContainer";
import AddressFormContainer from "./AddressFormContainer";

import { isLoaded } from "../utils/isLoaded";

const AccountContainer = () => {

  const router = useRouter();

  // const [wallet, setWallet] = useState();
  const [isUser, setIsUser] = useState(false);
  // const [colors, setColors] = useState('');

  // useEffect(() => {
  //   setWallet(localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses'));
  //   // setColors(localStorage.getItem('blockie-color'));
  // })

  const themeVot = ['#111111','#3b4954','#7FCCE4'];

  let theme = "vot";
  let themeColors = themeVot;

  if (theme === "vot") {
    themeColors = themeVot
  } else {
    themeColors = themeVot
  }

  const themeSchema = (themeColors, themeName, optionNumber) => {
    return {
      name: themeName,
      colors: themeColors,
      option: optionNumber
    }
  }

  let color1 = themeColors[0];
  let color2 = themeColors[1];
  let color3 = themeColors[2];
  let scheme = themeSchema.colors?themeSchema.colors:0;

  useEffect(() => {
    const setColors = (n) => localStorage.setItem('blockie-color', n);
    if (scheme < 1) {
      setColors(scheme);
      color1 = themeColors[0];
      color2 = themeColors[1];
      color3 = themeColors[2];
    } else if (scheme > 1) {
      setColors(scheme);
      color1 = themeColors[2];
      color2 = themeColors[0];
      color3 = themeColors[1];
    } else {
      setColors(scheme);
      color1 = themeColors[1];
      color2 = themeColors[2];
      color3 = themeColors[0];
    }
  });

  const setScheme = () => {
    if (scheme === 1) {
      scheme++;
      setColors(scheme);
    } else if (scheme > 1) {
      scheme = 0;
      setColors(scheme);
    } else {
      scheme++;
      setColors(scheme);
    }
    router.reload();
  }
  
  const [ avatar, setAvatar ] = useState(<></>);
  const [userData, setUserData] = useState([]);
  const userDataLength = Object.keys(userData).length;

  const iconArr = ["fingerprint", "code", "outlet", "person_outline", "self_improvement"];

  const randomIcon = () => {
    const n = Math.floor(Math.random() * iconArr.length);
    return iconArr[n]
  }

  const pendingIcon = () => { return <Icon className="user-not-found">{randomIcon()}</Icon> };

  const Logo = () => { return <SvgContainer src={Avatar} classes="no-avatar" /> }
  
  const resendConfirmation = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    const profile = token ? Auth.getProfile() : null;

    resendConfirmationFetch(profile)
  }

  useEffect(() => {
    setAvatar(pendingIcon)
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const response = await getSingleUser(token);

        if(!response.ok) {
          return;
        }
        
        const user = await response.json();
        
        if(user.pending) {
          setIsUser(false)
          return;
        }
        setIsUser(true);
        setUserData(user.foundUser);
        if (user.walletAddress) {
          setAvatar(UserBlockie);
        } else {
          setAvatar(Logo);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();    
  }, [userDataLength]);

  // console.log(userData)
  
  let AccountAvatar = () => { return avatar };
  const UserBlockie = () => {
    return (
    <Blockie
      onClick={setScheme}
      className="blockie-nav"
      opts={{
        seed: userData.walletAddress[0] ? userData.walletAddress[0] : "Claire Richard",
        color: color1,
        bgcolor: color3,
        size: 9,
        scale: 7,
        spotcolor: color2
    }}/>)
  }

  const pending = () => {
    if(isUser && isLoaded) {
      return <>{userData.email}</>
    } else {
      return (
      <>
        <div className="italics">** Pending User **</div>
        <button
          className="resend-confirmation not-a-button monospace"
          onClick={resendConfirmation}>
          <span className="resend-confirmation-text">[RESEND CONFIRMATION EMAIL]</span>
        </button>
        <br/>
      </>)
    }
  }

  return (
    <>
      <div className={userData.walletAddress ? "account-container center" : "vot-account-container center"} id="account-container">
        <br/>
        <div className="blockie-container">
          <AccountAvatar/>
        </div>
        {/* {userData.walletAddress
          ?<button
            className="blockie-colors not-a-button monospace"
            onClick={setScheme}>
            <span className="blockie-colors-text">[CHANGE COLORS]</span>
          </button>
          :<></>} */}
        <div className="account-info-name">{(userData.first_name && userData.last_name)?userData.first_name+" "+userData.last_name:""}</div>
        <div className="account-info-email">
          <div className="account-info-email_text">
            {pending()}
          </div>
        </div>
        {!isUser ?
          <></> :
          <div className="account-wallet">
            <div className="user-wallet-header">WALLET</div>
            <Web3Wallet />
          </div>}
      </div>
      {/* {!isUser ?
        <></> :
        <AddressFormContainer activeUser={userData} />} */}

    </>
  )
}

export default AccountContainer;