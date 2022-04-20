import { useState, useEffect } from "react";

import Auth from '../utils/auth';
import { getSingleUser } from '../utils/API';
import { isLoaded } from '../utils/isLoaded';

export const isUser = () => {
  
  // const [userData, setUserData] = useState({ seedHex: '' });
  // const userDataLength = Object.keys(userData).length;
  // let isPending;
  
  // useEffect(() => {
    const getUserData = async () => {
    let userCheck;
    try {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
      const response = await getSingleUser(token);
      if(!response.ok) {
        return;
      }
      const user = await response.json();
      userCheck = !user.pending;

    } catch (err) {
      console.error(err);
    }
  };
  getUserData();    
  // console.log(userData)
  // }, [userDataLength]);

  // useEffect(() => {
  //   setIsPending(!userData.seedHex ? true : false);
  // }, [isPending])

  return user;
}