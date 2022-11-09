import { useEffect,  useState } from "react";

import { SocialCircles } from "../containers/SocialCircles";
import TextContainer from '../containers/TextContainer';

import { claimOrder, getSingleUser, resendConfirmationFetch } from "../../utils/API";
import Auth from '../../utils/auth';

import styles from './Claim.module.css'
import { useRouter } from "next/router";
import { style } from "@mui/system";
import { MiCon } from "../icons/MatIco";

const ClaimPage = () => {
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  const [userCheck, setUserCheck] = useState(false);

  const [claimSuccess, setClaimSuccess] = useState(null);
  const [claimErrors, setClaimErrors] = useState({class: '', message: ''});
  
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
    setUserCheck(userData.completeRegistration ? true : false);
  }, [userDataLength]);

  const [input, setInput] = useState({ code: '', });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log(value)
    setInput({...input, [name]: value.toUpperCase() });
    setClaimErrors({ class: '', message: '' })
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
      // console.log(profile)
      const claimObj = {
        id: profile.data._id,
        simpleHash: input.code
      }

      const request = await claimOrder(claimObj);
      const response = await request.json();

      // console.log(response);

      if(response.success) {
        setClaimSuccess(true);
      }
      if(!response.success) {
        // alert(response.message)
        setClaimSuccess(false);
        setClaimErrors({ ...claimErrors, class: ' '+styles.error })
        console.log(claimErrors)
      }

    } catch (err) {
      console.error(err);
    }
  }

  const resendConfirmation = async () => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    const profile = token ? Auth.getProfile() : null;

    resendConfirmationFetch(profile);
  }

  const ActivateYourAccount = () => {
    return (
      <div className={styles.activateAccountContainer}>
        <div className={styles.activateAccountText}>
          <p>You must Activate your account to Claim Your Order. Please revisit this page when
          you have activated your account.</p>
          <p>Please check your <b>Spam</b> and <b>Promotions</b> folders
          if you cannot find it.</p>
        </div>
        <div className={styles.activationResendContainer}>
          <button
            className={styles.activateResendButton + " resend-confirmation not-a-button monospace"}
            onClick={resendConfirmation}>
            <span className="resend-confirmation-text">[RESEND CONFIRMATION EMAIL]</span>
          </button>
        </div>
      </div>)
  }

  const claimBoxHeader =
      <span className={(claimSuccess ? styles.boxHeaderSuccess : styles.boxHeader) + claimErrors.class}>
        {claimSuccess ? 'SUCCESS!' : "ENTER YOUR CODE"}
      </span>

  const successMessage =
      <span className={successMessage}>
        SWEEEEEEET! YOUR ORDER HAS SUCCESSFULLY BEEN CLAIMED TO YOUR ACCOUNT! IF YOU HAVE MORE
        CLAIM CODES, PLEASE REFRESH THIS PAGE TO PROCESS ADDITIONAL ORDER VERIFICATION CODES.
      </span>

  const router = useRouter();
  const refreshPage = () => router.reload();

  const errorIcon =  <MiCon name={'Invalid Code'} icon={'warning'} classes={styles.errorIcon} />
  const buttonText = claimSuccess
    ? 'CLAIM ANOTHER CODE'
    : ( claimErrors.class ? <>INVALID CODE</> :'CLAIM')

  return(
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <div className={styles.componentHeader}>
          <div className={styles.headerText}>CLAIM YOUR ORDER</div>
        </div>
        { userCheck === true ?
          <div className={styles.claimBox}>
            <TextContainer header={claimBoxHeader}
              containerClasses={styles.container + " reverse thick shadow padding dark-gradient no-margin" + claimErrors.class}
              border={true}
              backgroundColor={false}>
              {claimSuccess ? successMessage : <>
                <div className={styles.inputContainer  + claimErrors.class + ' input-field col'}>
                  <input
                    type='text'
                    className={styles.input + claimErrors.class + ' input-field center'}
                    id='claim-code_input'
                    key='code'
                    name='code'
                    maxLength={7}
                    onChange={handleInputChange}
                    value={input.code}
                  />
                </div>
                <div className="center-text">
                  <button
                    onClick={ claimSuccess ? refreshPage : handleFormSubmit }
                    className={'theme-btn' + ' ' + styles.claimBtn + claimErrors.class
                              + ( claimSuccess ? ' '+styles.success : '' )}
                    >{ buttonText }
                  </button>
                </div>
              </>}
            </TextContainer>
          </div>
        : <ActivateYourAccount /> }
        <div className={styles.socials}>
          <p className={styles.socialsText + ' monospace'}>VISIT OUR SOCIALS</p>
          <SocialCircles />
        </div>
      </div>
    </div>)
}

export default ClaimPage;