import { useState, useEffect } from "react";

import Auth from '../utils/auth';
import { getSingleUser } from '../utils/API';
import { isLoaded } from '../utils/isLoaded';

export const isUser = () => {
  
  // const [isPending, setIsPending] = useState(false);
  // const [userData, setUserData] = useState({ seedHex: '' });
  // const userDataLength = Object.keys(userData).length;
  
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;
  //       const response = await getSingleUser(token);
  //       if(!response.ok) {
  //         return;
  //       }
  //       const user = await response.json();
  //       setUserData(user.foundUser);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   getUserData();    
  //   // console.log(userData)
  // }, [userDataLength]);

  // useEffect(() => {
  //   setIsPending(!userData.seedHex ? true : false);
  // }, [isPending])

  return true;
}