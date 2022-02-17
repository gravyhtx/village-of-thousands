import { useState } from 'react';
import { Link, useRouter } from 'next/router'
import { TextField, Button } from '@mui/material';

import DefaultLayout from '../templates/DefaultLayout';

import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const Test = () =>  {

  const router = useRouter();

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({...userFormData, [name]: value });
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if(form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }

    try {

      const response = await loginUser(userFormData);

      if(!response.ok) {
          throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);

      Auth.login(token);

      router.push('/');

    } catch (err) {
      console.error(err);
    }

    setUserFormData({
        email: '',
        password: ''
    })
  }

  return (
    <DefaultLayout>
    <div className='login-collapsible-item'>
      <div className='login-input-container' id='user-login-container'>
        <div id='user-login-email'>Email</div>
        <TextField
          email
          className='input-field' 
          id='user-login-email_input'
          aria-labelledby='user-login-email'
          name='email'
          onChange={handleInputChange}
          value={userFormData.email}
          validate
        />
      </div>
    <div className="login-input-container" id="user-login-container">
      <div id="user-login-password">
      Password&nbsp;
      <Link href="/recover-password">
      <span className="forgot-password">{"// "}<u className='forgot-password-link'>Forgot password?</u></span>
      </Link>
      </div>
      <TextField 
        className='input-field' 
        id='user-login-password_input'
        aria-labelledby='user-login-password'
        type='password'
        name='password'
        onChange={handleInputChange}
        value={userFormData.password}
      />
    </div>
    <div className="center-text">
      <Button
        node='button'
        onClick={handleFormSubmit}
        className='login-btn'
      >
        SIGN IN
      </Button>
    </div>
    </div>
    </DefaultLayout>
  )   
}
export default Test;