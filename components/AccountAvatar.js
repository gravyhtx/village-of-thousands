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
  const [loaded, setLoaded] = useState(false);
  const [userCheck, setUserCheck] = useState();
  const [userData, setUserData] = useState({
    colorScheme: '',
    walletAddress: [{
      walletAddress: ''
    }]
  });
  const userDataLength = Object.keys(userData).length;

  const [wallet, setWallet] = useState('');
  
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
          seed: props.wallet.length ? props.wallet[0].walletAddress : "Claire Richard",
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
        setWallet(props.wallet);
        setLoaded(true);
      } catch (err) {
        console.error(err);
        setLoaded(true);
        setLoaded(true);
      }
    };
    getUserData();
  }, [userDataLength]);

  useEffect(() => {
    if(!avatar){ setAvatar(pendingIcon) };
  }, [avatar]);

  useEffect(() => {
    if(!wallet){ setWallet(props.wallet) };
    if(loaded && props.wallet){ setAvatar(UserBlockie) }
    else if (loaded && !props.wallet){ setAvatar(Logo) }
    if(!props.wallet && !userCheck && !avatar){ setAvatar(pendingIcon) }
  }, [props.wallet]);

  useEffect(() => {
    setUserCheck(userData.completeRegistration ? true : false);
    // if(loaded && props.wallet){ setAvatar(UserBlockie) }
    // else if (loaded && !props.wallet){ setAvatar(Logo) }
    // if(!props.wallet && !userCheck && !avatar){ setAvatar(pendingIcon) }
  }, [userData]);

  let RenderAvatar = () => { return avatar };

  return (
    <>
      <div className="blockie-container">
        { loaded ? <RenderAvatar/> : <></> }
      </div>
      {props.wallet ?
        <button
          className="blockie-colors not-a-button monospace"
          onClick={setColorScheme}>
          <span className="blockie-colors-text">[CHANGE COLORS]</span>
        </button>:<></>}
    </>
  )
}

export default AccountAvatar;