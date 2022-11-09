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

  const queryPath = query && query === 'claim'
      ? { path:'/qr/claim' , text: 'GO TO CLAIM PAGE'}
    : query && query.includes('activate')
      ? { path: query.replaceAll('-', '/') , text: 'GO TO ACTIVATION PAGE'}
      : false;

  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  const [userCheck, setUserCheck] = useState(null);
  
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

        if(userData.pending === false) {
          router.push('/')
        }

      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  return (
    <DefaultLayout title={"Create Account"} withAuth={true}>
    {userData.pending === true ?
      <div className="user-registration-container center">
        <h1 className="user-registration-header">Complete Your Registration</h1>
        <div className='user-registration-details container'>
          <h2>You're almost there!</h2>
          <div>
            Finish your account activation by checking your email and following the activation link.
            Once your account is active you can sign up with your in-browser wallet so you can get your free
            limited-edition NFT when our Web 3.0 site goes live!
          </div>
          <div>
            <p><Link href="/faq#8" target="_blank" rel="noopener noreferrer"><a>
              Click here for more info on how to claim your FREE Limited Edition VoT NFT.
              <br/>
              <b>(Coming soon // VoT 2023, Babyyyyy)</b>
            </a></Link></p>
          </div>
          <br/>
          <div className='check-your-spam'>
            <p className='note'><b>**NOTE**</b></p>
            <p>If you do not see your activation link, first double-check that your email you
            registered with is correct
            {userData.foundUser ? 
              <>
                <span> <b>({userData.foundUser.email})</b></span>. If this is your correct email then
                it&nbsp;
              </>
            : <>. It </>}
            
            may show up in your PROMOTIONS folder, especially common with GMail, or SPAM.</p>
            {userData.foundUser ? 
              <p>If that was not your email, it's cool, dawg... just sign up again!</p>
            : <></>}
          </div>
        </div>
        
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
      </div> : <></>}
    </DefaultLayout>
  )
}

export default UserRegistration;