import { useState, useEffect } from 'react';

import Auth from '../utils/auth';
import { useRouter } from 'next/router';
import { updateUser, getSingleUser } from '../utils/API';

const AddressForm = () => {
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

        if(!response.ok){
          throw new Error('Something went wrong!');
        }

        const user = await response.json();
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
    setUserFormData({...userFormData, [name]: value });
    console.log(userFormData)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if(form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      router.push('/404');
      return false;
    }

    try {
      const response = await updateUser(userFormData, token);

      if(!response.ok) {
        throw new Error('something went wrong!');
      }
      console.log(userData)

    } catch (err) {
      console.error(err);
    }

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

    console.log(userFormData)

    // router.push('/');
    // router.reload()
  }

  const fields = [
    { name: 'addressOne',
      placeholder: 'Address Line 1' },
    { name: 'addressTwo',
      placeholder: 'Address Line 2' },
    { name: 'city',
      placeholder: 'City' },
    { name: 'state',
      placeholder: 'State' },
    { name: 'zip',
      placeholder: 'Zip' },
  ];

  return (
    <>
    <div className='register-address-container container'>
      <div className="register-input-container" id="user-register-container">
      <div className="user-register-address-header">SHIPPING ADDRESS</div>
        {fields.map((field, index) => {
          return (
            <>
            {userData[field] ?
              <div key={key}>{userData[field]}</div> :
              <input
                className="input-field"
                id={"user-register-"+field.name+"_input"}
                aria-labelledby="user-register-address"
                name={field.name}
                placeholder={userData[field] ? userData[field] : field.placeholder}
                // placeholder={userData.addressOne?userData.addressOne:'Address Line 1'}
                onChange={handleInputChange}
                // value={userData.addressOne?userData.addressOne:''}
                key={index}
              />
            }
            </>
          )})
        }
      </div>
      {/* <AddressForm fields={fields} handleChange={handleChange} /> */}
      <br/>
      {windowLocation === "/signup-2" ?
        <div className='user-register-finish'>
        <button
          className="account-wallet-btn"
          onClick={handleFormSubmit}
        >
          COMPLETE REGISTRATION
        </button>
        </div>
        : <div className='user-address-edit'>
        <button
          className="account-wallet-btn"
          onClick={handleFormSubmit}
        >
          EDIT ADDRESS
        </button>
        </div>}
    </div>
    </>
  )
}

export default AddressForm;