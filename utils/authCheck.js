import Auth from '../utils/auth';

const authCheck = () => {
  const token = Auth.loggedIn();
  return !!token;
};

export default authCheck;