import { useState, useEffect } from "react";

import { Icon } from "@mui/material";

import Auth from '../utils/auth';
import { getSingleUser, updateUser } from '../utils/API';

import Blockie from "./Blockie";
import Avatar from "../public/images/icons/vot_avatar.svg";
import SvgContainer from "../components/SvgContainer";
import { useRouter } from "next/router";

import { isLoaded } from "../utils/isLoaded";
// import { isUser } from "../utils/isUser";
import { shuffleArr, randomize } from "../utils/generator";

const AccountAvatar = (props) => {

  const router = useRouter();
  const [userCheck, setUserCheck] = useState();
  const [wallet, setWallet] = useState('');
  const [userData, setUserData] = useState({
    colorScheme: '',
    walletAddress: [{
      walletAddress: ''
    }]
  });
  const userDataLength = Object.keys(userData).length;
  
  // SET BLOCKIE COLORS
  const themeVot = ['#111111','#3b4954','#7FCCE4']

  const [themeColors, setThemeColors] = useState();

  const setColorScheme = async () => {
    const colorChange = shuffleArr(themeVot);
    setThemeColors(colorChange);
    console.log(colorChange)
    
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    try {
      const response = await updateUser({colorScheme: colorChange}, token);
      
      if(!response.ok) {
        throw new Error('something went wrong!');
      }
      router.reload();
    } catch (err) {
      console.error(err);
    }
  }


  // SET AVATAR
  const [ avatar, setAvatar ] = useState(null);

  // useEffect(() => {
  //   setAvatar(<div className="blockie-loading"><SvgContainer src={Avatar} classes="no-avatar" /></div>);
  // }, [avatar])

  const iconArr = ["fingerprint", "code", "outlet", "person_outline", "self_improvement"];
  const randomIcon = () => {
    const n = randomize(iconArr.length);
    return iconArr[n]
  }

  const pendingIcon = () => { return <Icon className="user-not-found">{randomIcon()}</Icon> }
  const Logo = () => { return <SvgContainer src={Avatar} classes="no-avatar" /> }
  const UserBlockie = () => {
    return (
      <div onClick={setColorScheme}><Blockie
        className="blockie-nav"
        opts={{
          seed: wallet ? wallet : "Claire Richard",
          color: userData.colorScheme ? userData.colorScheme[0] : themeColors[0],
          bgcolor: userData.colorScheme ? userData.colorScheme[1] : themeColors[1],
          size: 9,
          scale: 7,
          spotcolor: userData.colorScheme ? userData.colorScheme[2] : themeColors[2]
      }}/></div>
    )
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const response = await getSingleUser(token);

        if(!response.ok) {
          return;
        }
        
        const user = await response.json();
        setUserData(user.foundUser);
        setThemeColors(userData.colorScheme);
        // setWallet(userData && userData.walletAddress[0].walletAddress ? userData.walletAddress[0].walletAddress : '');
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [userDataLength]);

  useEffect(() => {
    if(!avatar){ setAvatar(pendingIcon) };
  }, [avatar]);

  useEffect(() => {
    if(!wallet && userData){ setWallet(userData.walletAddress[0].walletAddress ? userData.walletAddress[0].walletAddress : '') };
  }, [wallet])

  useEffect(() => {
    setUserCheck(userData.completeRegistration ? true : false);
    if(isLoaded && !wallet && userCheck){ setAvatar(Logo) }
    if(isLoaded && wallet && userCheck){ setAvatar(UserBlockie) }
    if(!wallet && !userCheck && !avatar){ setAvatar(pendingIcon) }
  }, [userData]);

  let RenderAvatar = () => { return avatar };

  return (
    <>
      <div className="blockie-container">
        { isLoaded() ? <RenderAvatar/> : <></> }
      </div>
      {wallet ?
        <button
          className="blockie-colors not-a-button monospace"
          onClick={setColorScheme}>
          <span className="blockie-colors-text">[CHANGE COLORS]</span>
        </button>:<></>}
    </>
  )
}

export default AccountAvatar;