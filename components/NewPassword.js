import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { getSingleUser, updateUser } from "../utils/API";
import Auth from '../utils/auth';

const NewPassword = () => {

  // Get User Data
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    localStorage.removeItem('upload_data');
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const response = await getSingleUser(token);

        if(!response.ok){
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [userDataLength]);
  
  const [userFormData, setUserFormData] = useState({password: ''})

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({...userFormData, [name]: value });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if(form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    try {
      const response = await updateUser(userFormData, token);

      if(!response.ok) {
        throw new Error('something went wrong!');
      }

    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      password: ""
    })

    window.location.assign('/');
  }

  return (
    <>
    <div className="pw-recovery-input-container new-password-container row">
      <div className="new-password-label-1">ENTER NEW PASSWORD</div>
      <input 
        className='new-password center'
        style={{color: 'white'}}
        id='new-password-1'
        aria-labelledby='new-password-label-1'
        type='password'
        name='password'
        onChange={handleInputChange}
        value={userFormData.passwordOne}
      />

      <div className="new-password-label-2">RE-ENTER NEW PASSWORD</div>
      <input 
        className='new-password center'
        style={{color: 'white'}}
        id='new-password-2'
        aria-labelledby='new-password-label-2'
        type='password'
        name='password'
        onChange={handleInputChange}
        value={userFormData.passwordTwo}
      />
      
    </div>
    <div className="new-password-submit">
    <br/>
      <Button
        node="button"
        style={{
          margin: '0 auto',
          width: '250px'
        }}
        waves="light"
        className="theme-btn"
        onClick={handleSubmit}
        id="submit"
      >CREATE NEW PASSWORD</Button>
    </div>
    </>
  )
}

export default NewPassword;