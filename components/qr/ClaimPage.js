import { useState } from "react";
import { SocialCircles } from "../containers/SocialCircles";
import TextContainer from '../containers/TextContainer';

import Auth from '../../utils/auth';

import styles from './Claim.module.css'
import { useRouter } from "next/router";

const ClaimPage = () => {

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

      // const response = await loginUser(userFormData);
      
      // setErrorClass({
      //   email: response.ok ? '' : ' input-error',
      //   password: response.ok ? '' : ' input-error',
      // });
      
      // if(!response.ok) {
      //   const { message } = await response.json();
      //   console.log(message)
      //   throw new Error('something went wrong!');
      // }
      
      const { token, user } = await response.json();
      
      Auth.login(token);

      router.push('/account');

    } catch (err) {
      console.error(err);
    }
    setInput({
        code: '',
    });
  }

  return(
    <div className={styles.main}>
      <div className={styles.contentContainer}>
        <div className={styles.componentHeader}>
          <div className={styles.headerText}>CLAIM YOUR ORDER</div>
        </div>
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
        <div className={styles.socials}>
          <p className={styles.socialsText + ' monospace'}>VISIT OUR SOCIALS</p>
          <SocialCircles />
        </div>
      </div>
    </div>)
}

export default ClaimPage;