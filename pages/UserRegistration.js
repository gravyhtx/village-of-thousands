// import React, {useState} from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-materialize';
import Header from "../components/Header";
import Footer from '../components/Footer';
import NavMobile from "../components/NavMobile";
import NavDesktop from "../components/NavDesktop";
import AddressForm from '../components/AddressForm';
import CompleteUserRegistration from '../components/CompleteUserRegistration';
import Web3Wallet from '../components/Web3Wallet';

import Auth from '../utils/auth';
import {getSingleUser} from '../utils/API';

const UserRegistration = () => {
    let navigate = useNavigate()

    const [userData, setUserData] = useState({});
    const userDataLength = Object.keys(userData).length;
    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if(!token) {
                    navigate('/')
                    return false
                }

                const response = await getSingleUser(token);

                if(!response.ok){
                    throw new Error('something went wrong!');
                }

                const user = await response.json();
                setUserData(user);
                // navigate('/')
            } catch (err) {
                console.error(err);
            }
        };

        getUserData();
        console.log(userData);
    }, [userDataLength]);

    return (
        <>
        <Header />
        <NavMobile />
        <div className="user-registration-container center">
            <h1 className="user-registration-header">Complete Your Registration</h1>
            <Link to="/faq" target="_blank" rel="noopener noreferrer">
            <div className='user-registration-details container italics'>
            ** Finish your account details to access quick checkout and get your free limited-edition NFT when our Web 3.0 site goes live! **
            </div>
            </Link>
            <div className='user-registration-account-header'>ACCOUNT INFORMATION</div>
            <div className='user-registration-info container'>
                <div className="user-register-email-header">USER</div>
                {/* {userData.email? */}
                <><div className='user-registration-email container'>{userData.email}</div>
                <div className='user-registration-wallet'>
                    <Web3Wallet />
                </div></>
                {/* : */}
                {/* <div className='user-registration-email important container'>SIGNUP ERROR! Seems like we're missing some information. Please try creating your account again or
                contact us for support on Instagram (@villageofthousands).</div>} */}
            </div>
            <div className="user-registration-forms">
                <AddressForm />
                {/* <CompleteUserRegistration /> */}
            </div>
        </div>
        <Footer />
        <NavDesktop />
        </>
    )
}

export default UserRegistration;