import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import DefaultLayout from '../templates/DefaultLayout';

import AddressFormContainer from '../components/AddressFormContainer';
import Web3Wallet from '../components/Web3Wallet.tsx';

import Auth from '../utils/auth';
import {getSingleUser} from '../utils/API';

import withAuth from '../utils/withAuth';

const UserRegistration = () => {
    
  let router = useRouter();

  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
          return false;
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
    <DefaultLayout>
    <div className="user-registration-container center">
      <h1 className="user-registration-header">Complete Your Registration</h1>
      <Link href="/faq" target="_blank" rel="noopener noreferrer">
      <div className='user-registration-details container italics'>
      ** Finish your account details to access quick checkout and get your free limited-edition NFT when our Web 3.0 site goes live! **
      </div>
      </Link>
      <div className='user-registration-account-header'>ACCOUNT INFORMATION</div>
      <div className='user-registration-info container'>
        <div className="user-register-email-header">USER</div>
        <div className='user-registration-email container'>{userData.email}</div>
        <div className='user-registration-wallet'>
          <Web3Wallet />
        </div>
      </div>
      <div className="user-registration-forms">
        <AddressFormContainer />
      </div>
    </div>
    </DefaultLayout>
  )
}

export default withAuth(UserRegistration);