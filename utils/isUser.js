import { useState, useEffect } from "react";

import Auth from '../utils/auth';
import { getSingleUser } from '../utils/API';

export const isUser = async () => {
  try {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    const response = await getSingleUser(token);
    if(!response.ok) {
      return false;
    }
    const user = await response.json();
    if(user.pending) {
      return "pending";
    }
    if(!user.pending) {
      return "active"
    }

  } catch (err) {
    console.error(err);
    return "error";
  }
}