import { useEffect, useState } from "react";
import { SocialCircles } from "../containers/SocialCircles";
import TextContainer from '../containers/TextContainer';

import Auth from '../../utils/auth';

import styles from './Claim.module.css'
import { useRouter } from "next/router";
import { claimOrder, getSingleUser, resendConfirmationFetch } from "../../utils/API";

const ClaimPage = () => {
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  const [userCheck, setUserCheck] = useState();
  
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
        setLoaded(true);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
    setUserCheck(userData.completeRegistration ? true : false);
  }, [userDataLength]);

  const [input, setInput] = useState({ code: '', });
  const [errorClass, setErrorClass] = useState({ code: '', });

  const router = useRouter();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({...input, [name]: value.toUpperCase() });
    setErrorClass({ code: '', })
  }
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if(form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      const profile = token ? Auth.getProfile() : null;
      console.log(profile)
      const claimObj = {
        id: profile.data._id,
        simpleHash: input.code
      }

      const request = await claimOrder(claimObj)
      const response = await request.json()
      console.log(response)
      if(!response.success) {
        alert(response.message)
      }

    } catch (err) {
      console.error(err);
    }
    setInput({
        code: '',
    });
  }

  const resendConfirmation = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    const profile = token ? Auth.getProfile() : null;

    resendConfirmationFetch(profile)
  }

  const ClaimBox = () => {
    return (
      <div className={styles.claimBox}>
        <TextContainer header="ENTER YOUR CODE"
          containerClasses="reverse thick shadow padding dark-gradient no-margin"
          border={true}
          backgroundColor={false}>
          <div className={styles.inputContainer + ' input-field col'}>
            <input
              type='text'
              className={styles.input + ' input-field center' + errorClass.code}
              id='claim-code_input'
              name='code'
              onChange={handleInputChange}
              value={input.code}
            />
          </div>
          <div className="center-text">
            <button
              onClick={handleFormSubmit}
              className='theme-btn'
            >
              CLAIM
            </button>
          </div>
        </TextContainer>
      </div>
    )
  }

  const ActivateYourAccount = () => {
    return (
      <div className={styles.activateAccountContainer}>
        <div className={styles.activateAccountText}>You must Activate your account to Claim Your Order.</div>
        <div className={styles.activationResendContainer}>
          <button
            className={styles.activateResendButton + " resend-confirmation not-a-button monospace"}
            onClick={resendConfirmation}>
            <span className="resend-confirmation-text">[RESEND CONFIRMATION EMAIL]</span>
          </button>
        </div>
      </div>)
  }

  return(
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <div className={styles.componentHeader}>
          <div className={styles.headerText}>CLAIM YOUR ORDER</div>
        </div>
        { userCheck === true ? <ClaimBox /> : <ActivateYourAccount /> }
        <div className={styles.socials}>
          <p className={styles.socialsText + ' monospace'}>VISIT OUR SOCIALS</p>
          <SocialCircles />
        </div>
      </div>
    </div>)
}

export default ClaimPage;