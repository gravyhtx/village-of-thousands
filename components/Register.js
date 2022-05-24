import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const Register = () =>  {

  const [userFormData, setUserFormData] = useState({ email:'', password:'', reEnterPassword: ''});
  const [formError, setFormError] = useState({ email: '', password: '', passwordSpacing: '', passwordMatch: '' });
  const [errorClass, setErrorClass] = useState({ email: '', password: '', passwordSpacing: '', passwordMatch: '' });

  const [pass, setPass] = useState(false);
  const [pwReEnter, setPwReEnter] = useState(false);

  useEffect(() => {
    handleFormSubmit();
  }, [pass])

  const router = useRouter();

  const errorElements = [
    <div className='signup-error error-message italics' id='email-error'>Please enter a valid email address.</div>,
    <span className='signup-error error-message italics' id='password-error'>Password must be between 6 to 20
    characters with at least one numeric digit, one uppercase, and one lowercase letter.</span>,
    <span className='signup-error error-message italics' id='password-error'>Password cannot contain spaces.</span>,
    <span className='signup-error error-message italics' id='password-error'>Passwords do not match or contain errors.
    Please re-enter your password. (6-20 characters, no spaces, 1 number, 1 uppercase, 1 lowercase letter)</span>
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({...userFormData, [name]: value });
    setErrorClass({
      email: '',
      password: '',
      passwordSpacing: '',
      passwordMatch: ''
    })
  }

  function formValidation(email, password) {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;  // 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter

    const pwFormatSpaces = /^\S*$/;  // No white space

    if (emailFormat.test(email) && pwFormat.test(password) && pwFormatSpaces.test(password)) {
      setPass(true);
    } else {
      setPass(false);
    }
    setFormError({
      email: email.match(emailFormat) ? '' : errorElements[0],
      password: password.match(pwFormat) ? '' : errorElements[1],
      passwordSpacing: password.match(pwFormatSpaces) ? '' : errorElements[2]
    })
    setErrorClass({
      email: email.match(emailFormat) ? '' : ' input-error',
      password: (password.match(pwFormat) && password.match(pwFormatSpaces)) ? '' : ' input-error',
    })
  }

  function nextValidation(email, password) {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;  // 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter

    const pwFormatSpaces = /^\S*$/;  // No white space

    if (emailFormat.test(email) && pwFormat.test(password) && pwFormatSpaces.test(password)) {
      setPwReEnter(true);
    } else {
      setPwReEnter(false);
    }
    setFormError({
      email: email.match(emailFormat) ? '' : errorElements[0],
      password: password.match(pwFormat) ? '' : errorElements[1],
      passwordSpacing: password.match(pwFormatSpaces) ? '' : errorElements[2]
    })
    setErrorClass({
      email: email.match(emailFormat) ? '' : ' input-error',
      password: (password.match(pwFormat) && password.match(pwFormatSpaces)) ? '' : ' input-error',
    })
  }

  const formHandlerPass = () => {
    if(userFormData.password === userFormData.reEnterPassword) {
      formValidation(userFormData.email, userFormData.password)
    } else {
      const emailValue = document.getElementById('user-register-email_input').value;
      setPwReEnter(false);
      setUserFormData({
        email: emailValue,
        password: '',
        reEnterPassword: '',
      });
      setErrorClass({
        email: '',
        password: ' input-error',
      })
      setFormError({ passwordMatch: errorElements[3] })
    }
  }

  const formHandlerNext = () => {
    if(userFormData.email && userFormData.password){ nextValidation(userFormData.email, userFormData.password) }
  }

  const handleFormSubmit = async () => {

    if(!pass) {
      return 
    }

    try {
      const response = await createUser(
        {
          email: userFormData.email.toLowerCase(),
          password: userFormData.password
        }
      );

      if(!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      
      if(pass) {
        Auth.login(token);
        localStorage.removeItem('seed_hex');
        router.push('/signup-1');
      }

    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    })
  }

  const passwordLabel = [
    <div className='login-input-label' id="user-register-password">Password</div>,
    <div className='login-input-label form-text-blink password-match-label' id="user-register-password">Re-enter Password</div>
  ]

  const enterPassword =
        <><input
            name="password"
            type="password"
            aria-labelledby="user-register-password"
            className={"input-field" + errorClass.password}
            id="user-register-password_input"
            onChange={handleInputChange}
            value={userFormData.password} />

          <div>{formError.password}
          {formError.password && formError.passwordSpacing ? <span>&nbsp;</span> : ''}
          {formError.passwordSpacing}</div></>

  const reEnterPassword =
        <><input
            name="reEnterPassword"
            type="password"
            aria-labelledby="user-register-password"
            className={"input-field form-input-blink password-match-input" + errorClass.password}
            id="user-register-password_input"
            onChange={handleInputChange}
            value={userFormData.reEnterPassword} /></>

  const passwordField = () => {
    return(<>
      <div className="login-input-container" id='user-register-container'>
        {!pwReEnter ? passwordLabel[0] : passwordLabel[1]}
        <div className='input-field col'>
          {!pwReEnter ? enterPassword : reEnterPassword}
        </div>
      </div>
      <div>{formError.passwordMatch}</div>
    </>)
  }

  const submitButton = [
    <div className="center-text"><button className="login-btn next-button" onClick={formHandlerNext}>Next</button></div>,
    <div className="center-text"><button className="login-btn form-text-blink" onClick={formHandlerPass}>Create Account</button></div>
  ]

  return (
    <>
      <div className="login-input-container" id='user-register-container'>
        <div className='login-input-label' id="user-register-email">
          Email
        </div>
        <div className='input-field col'>
          <input
            name="email"
            aria-labelledby="user-register-email"
            className={"input-field" + errorClass.email}
            id="user-register-email_input"
            onChange={handleInputChange}
            value={userFormData.email} />
            {formError.email}
          </div>
      </div>
      {passwordField()}
      {!pwReEnter ? submitButton[0] : submitButton[1]}
    </>
  )      
}
export default Register;