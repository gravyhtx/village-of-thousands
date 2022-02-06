import { useEffect, useState } from "react";
import { getSingleUser } from '../utils/API';

export default function getUserData(fn,tokenRoute) {
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
  const userData = async () => {
      try {
          const token = Auth.loggedIn() ? Auth.getToken() : null;

          if(tokenRoute && !token) {
              window.location.assign(tokenRoute);
              return false
          }

          const response = await getSingleUser(token);

          if(!response.ok){
              throw new Error('Something went wrong!');
          }

          if(fn){ fn(); }

          const user = await response.json();
          setUserData(user);
      } catch (err) {
          console.error(err);
      }
  };
  userData();
  // console.log(userData);
  }, [userDataLength]);
  return userData;
}