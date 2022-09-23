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

  const [errorClasses, setErrorClasses] = useState({});

  let router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      setWindowLocation(router.pathname);
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        const response = await getSingleUser(token);

        if (!response.ok) {
          router.replace("/login")
          throw new Error('User is not logged in, something went wrong!');
        }

        const user = await response.json();
        setUserData(user.foundUser);
      } catch (err) {
        console.error(err);
      }
    };
    getUserData();
  }, [userDataLength]);


  const [itChecksOut, setChecks] = useState(false);

  useEffect(() => {
    if(userFormData.first_name) {
    }
    if(userFormData) { performChecks() }
  });

  const [userFormData, setUserFormData] = useState({
    first_name: "",
    last_name: "",
    // OPTIONAL //
    phone: "",
    // ENTER IN ADDRESS FORM //
    addressOne: "",
    addressTwo: "",
    city: "",
    state: "",
    zip: ""
  })

  const performChecks = () => {
    if( userFormData.first_name.length !== 0 &&
      userFormData.last_name.length !== 0 &&
      userFormData.addressOne.length !== 0 &&
      userFormData.city.length !== 0 &&
      userFormData.state.length !== 0 &&
      userFormData.zip.length >= 5 &&
      userFormData.zip !== isNaN() ) {
        setChecks(true);
      } else {
      setChecks(false);
    }
  }

  return (
    <>
      <div className='register-address-container container'>
        <div className="register-input-container" id="user-register-container">
          <div className="user-register-address-header">BILLING ADDRESS</div>
          <AddressCheckoutForm errorClasses={errorClasses} user={userData} handleInputChange={props.billingFn} />
        </div>
        <br />
        <div className='row checkout_billing-check'>
          <div className='input-field col s12'>

            <label>
              <input type="checkbox" onChange={props.sameAddressFn}/>
              <span>
                My shipping address is the same as my billing address
              </span>
            </label>
          </div>
        </div>
        {!props.sameAddressCheck ? (
          <>
            <br />
            <div className="register-input-container" id="user-register-container">
              <div className="user-register-address-header">SHIPPING ADDRESS</div>
              <AddressCheckoutForm errorClasses={errorClasses} user={userData} handleInputChange={props.shippingFn} />
            </div>
          </>
        ) : (<></>)}
      </div>
    </>
  )
}

export default AddressCheckout;