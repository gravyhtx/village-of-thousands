import { useRouter } from "next/router";
import { useState } from "react";

import Auth from '../utils/auth';

const authCheck = () => {
  const token = Auth.loggedIn();
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false);
  console.log(token);
  return isLoggedIn;
};

export default authCheck;