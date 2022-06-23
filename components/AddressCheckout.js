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


  const [itChecksOut, setChecks] = useState(false);

  useEffect(() => {
    if(userFormData.first_name) {
      console.log(userFormData.first_name.length)
    }
    if(userFormData) { performChecks() }
    console.log(itChecksOut)
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
    // performChecks();
    // console.log(userFormData.first_name.length);
    // console.log(itChecksOut)
  }

  const handleSameAddress = (event) => {
    console.log("I'm checked")
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    props.handleFormSubmit(userFormData);

    setUserFormData({
      first_name: "",
      last_name: "",
      // OPTIONAL //
      phone: "",
      // ENTER IN ADDRESS FORM //
      addressOne: "",
      addressTwo: "",
      city: "",
      state: "",
      zip: "",
      // // GET FROM NEW WALLET APP //
      // walletAddress: "",
      // walletBalance: "",
      // completed: true
    });
  }

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
          <div className="user-register-address-header center-text">SHIPPING ADDRESS</div>
          <AddressCheckoutForm errorClasses={errorClasses} handleInputChange={props.inputFn} />
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