import { useEffect, useState } from "react";
import { getSingleUser } from '../utils/API';

export async function getUserData(fn,tokenRoute) {
  let userData;
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
      userData = user;
  } catch (err) {
      console.error(err);
  }
  return userData;
}