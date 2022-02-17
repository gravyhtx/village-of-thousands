import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const Register = () =>  {

  const [userFormData, setUserFormData] = useState({ email:'', password:'', mnemonic:''});
  const [formError, setFormError] = useState({ email: '', password: '' });
  const [errorClass, setErrorClass] = useState({ email: '', password: '' })

  const router = useRouter();

  const errorElements = [
    <div className='signup-error error-message italics' id='email-error'> Please enter a valid email address.</div>,
    <div className='signup-error error-message italics' id='password-error'> Password must be between 6 to 20
    characters withat least one numeric digit, one uppercase and one lowercase letter.</div>
  ]

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({...userFormData, [name]: value });
    console.log(userFormData.email);
    console.log(event.target.value);
    setErrorClass({
      email: '',
      password: ''
    })
  }

  function formValidation(email, password) {
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const pwFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;  // 6 to 20 characters with at least one numeric digit, one uppercase and one lowercase letter

    setFormError({
      email: email.match(emailFormat) ? '' : errorElements[0],
      password: password.match(pwFormat) ? '' : errorElements[1]
    })
    setErrorClass({
      email: email.match(emailFormat) ? '' : ' input-error',
      password: password.match(pwFormat) ? '' : ' input-error'
    })
    
    console.log(errorClass)
    console.log(formError)
  }

  const handleFormSubmit = async (event) => {

    event.preventDefault();
    event.stopPropagation();

    formValidation(userFormData.email, userFormData.password);
    // const form = event.currentTarget;
    // if(form.checkValidity() === false) {
    if(formError.email === errorElements[0] || formError.password === errorElements[1]) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userFormData);

      if(!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
        console.log(user.length);

      Auth.login(token);
      router.push('/signup-1');

    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
      mnemonic: 'false'
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
            {formError.password}
        </div>
          
      </div>
      <div className="center-text">
        <Button
          node="button"
          waves="light"
          className="login-btn"
          onClick={handleFormSubmit}
        >
          Create Account
        </Button>
      </div>
    </>
  )      
}
export default Register;