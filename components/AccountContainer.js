import { useState, useEffect } from "react";

import Auth from '../utils/auth';
import { getSingleUser, resendConfirmationFetch } from '../utils/API';

import Web3Wallet from "./Web3Wallet.tsx";

import AccountAvatar from "./AccountAvatar";

import { isLoaded } from "../utils/isLoaded";

import { isUser } from "../utils/isUser";

const AccountContainer = () => {
  
  const [wallet, setWallet] = useState('');
  const [userData, setUserData] = useState({
    walletAddress: [{
      walletAddress: ''
    }]
  });
  const userDataLength = Object.keys(userData).length;
  
  const resendConfirmation = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    const profile = token ? Auth.getProfile() : null;

    resendConfirmationFetch(profile)
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
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
    // console.log(userData)
  }, [userDataLength]);
  
  // console.log(isUser())

  useEffect(() => {
    setWallet(userData && (userData.walletAddress[0].walletAddress) ? userData.walletAddress[0].walletAddress : '');
  }, [wallet]);

  const pending = () => {
    if (!isLoaded) {
      return <></>;
    }
    if(!isUser() && isLoaded) {
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
    } else if (isUser() && isLoaded) {
      return <>{userData.email}</>
    }

  }

  return (
    <>
      <div className={wallet ? "account-container center" : "vot-account-container center"} id="account-container">
        <br/>
        <AccountAvatar/>
        {/* <div className="account-info-name">{(userData.first_name && userData.last_name)?userData.first_name+" "+userData.last_name:""}</div> */}
        <div className="account-info-email">
          <div className="account-info-email_text">
            {!isUser() && isLoaded ? pending() : <></> }
          </div>
        </div>
        {!isUser() && isLoaded ?
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