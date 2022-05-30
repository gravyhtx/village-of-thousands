import { useRouter } from "next/router";
import { useState } from "react";

import Auth from '../utils/auth';

const authCheck = () => {
  const token = Auth.loggedIn();
  const authorized = token ? true : false;
  return authorized;
};

export default authCheck;