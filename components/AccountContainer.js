import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

import AddressFormContainer from "./AddressFormContainer";
import Auth from '../utils/auth';
import { getSingleUser } from '../utils/API';

import Web3Wallet from "./Web3Wallet.tsx";

import Blockie from "./Blockie";
import Avatar from "../public/images/icons/vot_avatar.svg";
import SvgContainer from "../components/SvgContainer";

const AccountContainer = () => {

  const router = useRouter();

  const [wallet, setWallet] = useState('');
  const [colors, setColors] = useState('');

  useEffect(() => {
    setWallet(localStorage.getItem('-walletlink:https://www.walletlink.org:Addresses'));
    setColors(localStorage.getItem('blockie-color'));
  })

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

  // console.log(themeSchema("vot", themeColors))

  let color1 = themeColors[0];
  let color2 = themeColors[1];
  let color3 = themeColors[2];
  let scheme = themeSchema.colors?themeSchema.colors:0;

  useEffect(() => {
    const setColors = (n) => localStorage.setItem('blockie-color', n);
    if (scheme < 1) {
      setColors(scheme);
      // console.log("Scheme:",scheme);
      color1 = themeColors[0];
      color2 = themeColors[1];
      color3 = themeColors[2];
    } else if (scheme > 1) {
      setColors(scheme);
      // console.log("Scheme:",scheme);
      color1 = themeColors[2];
      color2 = themeColors[0];
      color3 = themeColors[1];
    } else {
      setColors(scheme);
      // console.log("Scheme:",scheme);
      color1 = themeColors[1];
      color2 = themeColors[2];
      color3 = themeColors[0];
    }
  });

  const setScheme = () => {
    console.log('click')
    if (scheme === 1) {
      scheme++;
      setColors(scheme);
      console.log(scheme);
    } else if (scheme > 1) {
      scheme = 0;
      setColors(scheme);
      console.log(scheme);
    } else {
      scheme++;
      setColors(scheme);
      console.log(scheme);
    }
    router.reload();
    // window.location.reload();
  }
  
  const [ avatar, setAvatar ] = useState(<></>);
  let AccountAvatar = () => { return avatar };
  const UserBlockie = () => {
    return (
    <Blockie
      onClick={setScheme}
      className="blockie-nav"
      opts={{
        seed: wallet || userData.walletAddress ? wallet : "Claire Richard",
        color: color1,
        bgcolor: color2,
        size: 9,
        scale: 7,
        spotcolor: color3
    }}/>)
  }
  const Logo = () => { return (<SvgContainer src={Avatar} classes="no-avatar" />) }
  const [userData, setUserData] = useState([]);
  // const userDataLength = Object.keys(userData).length;
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
          window.location.assign('/login');
          return false
        }

        const response = await getSingleUser(token);

        // const response = await loadAwait(token);

        if(!response.ok){
          // throw new Error('something went wrong!');
        }

        const user = await response.json();
        console.log(user)
        setUserData(user);
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
    // console.log(userData);
  // }, [userDataLength]);
  }, []);
  // var canvas = userData.walletAddress?blockie:<></>
  // var blockieCanvas = document.getElementById('blockie-canvas');
  // const blockieUrl = blockieCanvas.toDataURL()
  // console.log(blockieUrl);
  // const dataURL = () => {
  //   let url = blockieCanvas.toDataURL()
  //   return(url)
  // }
  // const blockiePng = document.write('<img src="'+dataURL+'"/>');
  // console.log(dataURL);
  // var dataURL = canvas.toDataURL();
  // console.log(dataURL);
  // const blockie = document.write('<img src="'+img+'"/>');

  return (
    <>
    <div className={userData.walletAddress ? "account-container" : "vot-account-container"} id="account-container">
      <br/>
      <div className="blockie-container">
        <AccountAvatar/>
      </div>
      {userData.walletAddress
        ?<button
          className="blockie-colors not-a-button monospace"
          onClick={setScheme}>
          <span className="blockie-colors-text">[CHANGE COLORS]</span>
        </button>
        :<></>}
      <div className="account-info-name">{(userData.first_name && userData.last_name)?userData.first_name+" "+userData.last_name:""}</div>
      <div className="account-info-email"><span className="account-info-email_text">{userData.email}</span></div>

      <div className="account-wallet">
      <div className="user-wallet-header">WALLET</div>
      <Web3Wallet />
      </div>
    </div>
    <AddressFormContainer />
    </>
  )
}

export default AccountContainer;