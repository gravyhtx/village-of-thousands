import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-materialize';
import { Button } from 'react-materialize';
// import Web3Wallet from './Web3Wallet';
import Auth from '../utils/auth';
import { Link, useNavigate } from 'react-router-dom';
import { updateUser, getSingleUser } from '../utils/API';

const AddressForm = () => {
    // Get User Data
    const [userData, setUserData] = useState({});
    const userDataLength = Object.keys(userData).length;
    let navigate = useNavigate();

    useEffect(() => {
    const getUserData = async () => {
        try {
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            // if(!token) {
            //     window.location.assign('/login');
            //     return false
            // }

            const response = await getSingleUser(token);

            console.log(token)
            if(!response.ok){
                throw new Error('something went wrong!');
            }

            const user = await response.json();
            setUserData(user);
        } catch (err) {
            console.error(err);
        }
    };
    getUserData();
    // console.log(userData);
    }, [userDataLength]);
    // firstName?firstName:""
    const [userFormData, setUserFormData] = useState({
        // GET FROM PREVIOUS FORM //
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
        // walletBalance: ""
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({...userFormData, [name]: value });
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
            navigate('/404');
            return false;
        }

        try {
            const response = await updateUser(userFormData, token);

            if(!response.ok) {
                throw new Error('something went wrong!');
            }

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
        })

        navigate('/');
    }

    return (
        <>
        <div className='register-address-container container'>
            <div className="register-input-container" id="user-register-container">
            <div className="user-register-address-header">ADDRESS</div>
                <TextInput
                    className="input-field" 
                    id="user-register-address1_input"
                    aria-labelledby="user-register-address"
                    name="addressOne"
                    placeholder='Address Line 1'
                    onChange={handleInputChange}
                    // value={userData.addressOne?userData.addressOne:''}
                />
                <TextInput
                    email
                    className="input-field" 
                    id="user-register-address2_input"
                    aria-labelledby="user-register-address"
                    name="addressTwo"
                    placeholder='Address Line 2'
                    onChange={handleInputChange}
                    // value={userData.addressTwo?userData.addressTwo:''}
                />
                <TextInput
                    email
                    className="input-field" 
                    id="user-register-city_input"
                    aria-labelledby="user-register-address"
                    name="city"
                    placeholder='City'
                    onChange={handleInputChange}
                    // value={userData.city?userData.city:''}
                />
                <TextInput
                    email
                    className="input-field" 
                    id="user-register-state_input"
                    aria-labelledby="user-register-address"
                    name="state"
                    placeholder='State'
                    onChange={handleInputChange}
                    // value={userData.state?userData.state:''}
                />
                <TextInput
                    email
                    className="input-field" 
                    id="user-register-zip_input"
                    aria-labelledby="user-register-address"
                    name="zip"
                    placeholder='Zip Code'
                    onChange={handleInputChange}
                    // value={userData.zip?userData.zip:''}
                />
            </div>
            <br/>
            {!userData.complete
            ?<div className='user-register-finish'>
            <Button
                node="button"
                style={{
                    width: '250px'
                }}
                waves="light"
                className="account-wallet-btn"
                onClick={handleFormSubmit}
            >
                {userData.completed?"ADD ADDRESS":"COMPLETE REGISTRATION"}
            </Button>
            </div>
            :<div className='user-address-edit'>
            <Button
                node="button"
                style={{
                    marginRight: '5px',
                    width: '250px'
                }}
                waves="light"
                className="account-wallet-btn"
                onClick={handleFormSubmit}
            >
                EDIT ADDRESS
            </Button>
            </div>}
        </div>
        </>
    )
}

export default AddressForm;