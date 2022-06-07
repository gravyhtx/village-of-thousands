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

  const [userFormData, setUserFormData] = useState({})

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
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

    props.handleFormSubmit(userFormData)

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

  return (
    <>
      <div className='register-address-container container'>
        <div className="register-input-container" id="user-register-container">
          <div className="user-register-address-header">SHIPPING ADDRESS</div>
          <AddressCheckoutForm handleInputChange={handleInputChange} />
        </div>
        <br />
        <div className='row'>
          <div className='input-field col s12'>

            <label>
              <input type="checkbox" onChange={handleSameAddress}/>
              <span>

                My shipping address is the same as yo momma
              </span>
            </label>
          </div>
        </div>
        <div className='user-address-edit'>
          <button
            className="account-wallet-btn"
            onClick={handleFormSubmit}
          >
            CONFIRM ADDRESS
          </button>
        </div>
      </div>
    </>
  )
}

export default AddressCheckout;