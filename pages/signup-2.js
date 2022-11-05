import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import DefaultLayout from '../templates/DefaultLayout';

import Auth from '../utils/auth';
import {getSingleUser} from '../utils/API';

const UserRegistration = () => {
    
  let router = useRouter();
  const query = router.query.q

  const queryPath = query === 'claim'
      ? { path:'/qr/claim' , text: 'GO TO CLAIM PAGE'}
    : query.includes('activate')
      ? { path: query.replaceAll('-', '/') , text: 'GO TO ACTIVATION PAGE'}
      : false;

  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
          router.push('/login');
        }

        const response = await getSingleUser(token);

        if(!response.ok) {
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

  return (
    <DefaultLayout title={"Create Account"} withAuth={true}>
    <div className="user-registration-container center">
      <h1 className="user-registration-header">Complete Your Registration</h1>
      <Link href="/faq#8" target="_blank" rel="noopener noreferrer">
      <div className='user-registration-details container'>
      <h2>You're almost there!</h2>
      Finish your account activation by checking your email and following the activation link.
      Once your account is active you can sign up with your in-browser wallet so you can get your free
      limited-edition NFT when our Web 3.0 site goes live!
      </div>
      </Link>
      
      {queryPath ?
        <div className="query-btn">
          <Link href={queryPath.path}>
            <a><Button
              node="button"
              style={{
                width: '250px'
              }}
              waves="light"
              className="back-btn"
            >
              {queryPath.text}
            </Button></a>
          </Link>
        </div>
      : <Link href="/account">
          <a><Button
            node="button"
            style={{
              width: '250px'
            }}
            waves="light"
            className="back-btn"
          >
            CHECK OUT YOUR ACCOUNT
          </Button></a>
        </Link>}
    </div>
    </DefaultLayout>
  )
}

export default UserRegistration;