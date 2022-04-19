import { useState, useEffect } from "react";

import Auth from '../utils/auth';
import { getSingleUser, resendConfirmationFetch } from '../utils/API';

import Web3Wallet from "./Web3Wallet.tsx";

import AccountAvatar from "./AccountAvatar";

const AccountContainer = () => {
  const [loaded, setLoaded] = useState(false);
  const [userData, setUserData] = useState({
    walletAddress: [{
      walletAddress: ''
    }]
  });
  const userDataLength = Object.keys(userData).length;
  
  // const [wallet, setWallet] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  // const userDataWallet = userData.walletAddress ? userData.walletAddress : false;
  // const userDataWalletAddress = userData.walletAddress ? userData.walletAddress[0].walletAddress : '';
  
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
        setWalletAddress(user.walletAddress ? user.walletAddress[0].walletAddress : '');
        setLoaded(true);
        // console.log(userData)
      } catch (err) {
        console.error(err);
        setLoaded(true);
      }
    };
    getUserData();
  }, [userDataLength]);

  const [userCheck, setUserCheck] = useState();
  const [acctContainer, setAcctContainer] = useState();
  const [walletContainer, setWalletContainer] = useState();
  const [containerClasses, setContainerClasses] = useState();

  useEffect(() => {
    setUserCheck(userData.completeRegistration ? true : false);
    setContainerClasses(walletAddress ? "account-container center" : "vot-account-container center");
    setAcctContainer(<></>);
    setWalletContainer(<></>);
    if(!userCheck && loaded) {
      setAcctContainer(pending());
    }
    // console.log(userCheck)
  }, [userData]);
  
  useEffect(() => {
    if(userCheck && loaded) {
      setAcctContainer(<>{userData.email}</>);
      setWalletContainer(<div className="account-wallet">
          <div className="user-wallet-header">WALLET</div>
          <Web3Wallet wallet={walletAddress}/>
        </div>);
    }
  }, [walletAddress])

  const pending = () => {
    return (
    <>
      <div className="italics">** Pending User **</div>
      <div className="pending-instructions">Please activate your account by clicking the link in the
      welcome email sent to <span className="underline italics">{userData.email}</span>.</div>
      <button
        className="resend-confirmation not-a-button monospace"
        onClick={resendConfirmation}>
        <span className="resend-confirmation-text">[RESEND CONFIRMATION EMAIL]</span>
      </button>
      <br/>
    </>)
  }

  return (
    <>
      <div className={ containerClasses } id="account-container">
        <br/>
        <AccountAvatar wallet={walletAddress} />
        {/* <div className="account-info-name">{(userData.first_name && userData.last_name)?userData.first_name+" "+userData.last_name:""}</div> */}
        <div className="account-info-email">
          <div className="account-info-email_text">
            { loaded ? acctContainer : <></> }
          </div>
        </div>
        { loaded ? walletContainer : <></> }
      </div>
      {/* {!userCheck ?
        <></> :
        <AddressFormContainer activeUser={userData} />} */}
    </>
  )
}

export default AccountContainer;