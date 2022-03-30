import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const Register = () =>  {

  const [userFormData, setUserFormData] = useState({ email:'', password:'', mnemonic:''});
  const [formError, setFormError] = useState({ email: '', password: '', passwordSpacing: '' });
  const [errorClass, setErrorClass] = useState({ email: '', password: '' });
  const [pass, setPass] = useState(false);

  useEffect(() => {
    handleFormSubmit();
  }, [pass])

  const router = useRouter();

  const errorElements = [
    <div className='signup-error error-message italics' id='email-error'>Please enter a valid email address.</div>,
    <span className='signup-error error-message italics' id='password-error'>Password must be between 6 to 20
    characters with at least one numeric digit, one uppercase, and one lowercase letter.</span>,
    <span className='signup-error error-message italics' id='password-error'>Password cannot contain spaces.</span>
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({...userFormData, [name]: value });
    setErrorClass({
      email: '',
      password: '',
      passwordSpacing: ''
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

  const formHandlerPass = () => {
    formValidation(userFormData.email, userFormData.password, userFormData.passwordSpacing);
  }

  const handleFormSubmit = async () => {

    if(!pass) {
      return 
    }

    try {
      const response = await createUser(userFormData);

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
      <div className="login-input-container" id='user-register-container'>
        <div className='login-input-label' id="user-register-password">
          Password
        </div>
        <div className='input-field col'>
          <input
            name="password"
            type="password"
            aria-labelledby="user-register-password"
            className={"input-field" + errorClass.password}
            id="user-register-password_input"
            onChange={handleInputChange}
            value={userFormData.password} />
            <div>{formError.password}
            {formError.password && formError.passwordSpacing ? <span>&nbsp;</span> : <></>}
            {formError.passwordSpacing}</div>
        </div>
      </div>
      <div className="center-text">
        <button
          className="login-btn"
          onClick={formHandlerPass}
        >
          Create Account
        </button>
      </div>
    </>
  )      
}
export default Register;