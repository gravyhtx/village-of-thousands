import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { Button } from '@mui/material';

import { loginUser, searchUserByEmail } from '../utils/API';
import Auth from '../utils/auth';

const Login = ({ activation }) =>  {

  const router = useRouter();

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [formError, setFormError] = useState({ email: [], password: []});
  const [errorClass, setErrorClass] = useState({ email: '', password: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({...userFormData, [name]: value });
    setErrorClass({ email: '', password: '' })
  }

  const checkEmail = async (email) => {
    try {
      const response = searchUserByEmail(email);
    } catch (err) {
      console.error(err);
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if(form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    checkEmail(userFormData.email)

    try {

      const response = await loginUser(userFormData);
      
      setErrorClass({
        email: response.ok ? '' : ' input-error',
        password: response.ok ? '' : ' input-error',
      });
      
      if(!response.ok) {
        const { message } = await response.json();
        console.log(message)
        throw new Error('something went wrong!');
      }
      
      const { token, user } = await response.json();
      
      Auth.login(token);

      if(!activation){ router.push('/'); }
      else{ router.reload(window.location.pathname); }

    } catch (err) {
      console.error(err);
    }
    setUserFormData({
        email: '',
        password: ''
    });
  }

  return (
    <>
    <div className='login-input-container' id='user-login-container'>
      <div className='login-input-label' id='user-login-email'>Email</div>
      <div className='input-field col'>
        <input
          type='email'
          className={'input-field' + errorClass.email}
          id='user-login-email_input'
          aria-labelledby='user-login-email'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
        />
      </div>
    </div>
    <div className="login-input-container" id="user-login-container">
      <div className='login-input-label' id="user-login-password">
      Password
      {/* &nbsp;
      <Link href="/recover-password"><a>
      <span className="forgot-password">{"// "}<u className='forgot-password-link'>Forgot password?</u></span>
      </a></Link> */}
      </div>
      <div className='input-field col'>
        <input 
          type='password'
          className={'input-field' + errorClass.password} 
          id='user-login-password_input'
          aria-labelledby='user-login-password'
          autoComplete="current-password"
          name='password'
          onChange={handleInputChange}
          value={userFormData.password}
        />
      </div>
    </div>
    <div className="center-text">
      <button
        onClick={handleFormSubmit}
        className='login-btn'
      >
        SIGN IN
      </button>
    </div>
    </>
  )   
}
export default Login;