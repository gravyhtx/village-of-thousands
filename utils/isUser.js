import { useState, useEffect } from "react";

import Auth from '../utils/auth';
import { getSingleUser, resendConfirmationFetch } from '../utils/API';

export const isUser = () => {
  
  const [isPending, setIsPending] = useState(null);
  const [userData, setUserData] = useState({pending: null});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        const response = await getSingleUser(token);
        if(!response.ok) {
          return;
        }
        const user = await response.json();
        setUserData(user);
        if(userData.pending && isPending !== null) {
          setIsPending(false)
          return;
        }
        if(!userData.pending && (isPending !== null || !isPending)) {
          setIsPending(true)
        }        
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();    
  }, [userDataLength]);

  return isPending;
}