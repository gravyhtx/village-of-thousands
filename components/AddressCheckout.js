import { useState, useEffect } from 'react';

import Auth from '../utils/auth';
import { useRouter } from 'next/router';
import { updateUser, getSingleUser } from '../utils/API';
import AddressCheckoutForm from './AddressCheckoutForm';

const AddressCheckout = (props) => {
  // Get User Data
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;
  const [windowLocation, setWindowLocation] = useState('');

  let router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      setWindowLocation(router.pathname);
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const response = await getSingleUser(token);

        if (!response.ok) {
          // router.replace("/login")
          throw new Error('User is not logged in, something went wrong!');
        }

        const user = await response.json();
        console.log(user)
        setUserData(user.foundUser);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [userDataLength]);

  return (
    <>
      <div className='register-address-container container'>
        <div className="register-input-container" id="user-register-container">
          <div className="user-register-address-header">SHIPPING ADDRESS</div>
          <AddressCheckoutForm handleInputChange={props.inputFn} />
        </div>
        <br />
        <div className='row checkout_billing-check'>
          <div className='input-field col s12'>

            <label>
              <input type="checkbox" onChange={props.sameAddress}/>
              <span>
                My shipping address is the same as yo momma
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddressCheckout;