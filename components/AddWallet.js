import React, { useState, useEffect } from 'react';
import { updateUser, getSingleUser } from '../utils/API';
import Auth from '../utils/auth';

const AddWallet = (walletAddress, walletBalance) => {
    // Get User Data
    const [userData, setUserData] = useState({});
    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
    const getUserData = async () => {
        try {
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            const response = await getSingleUser(token);

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

    const [userWallet, setUserWallet] = useState({walletAddress:'', walletBalance:''})

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            window.location.assign('/404');
            return false;
        }

        try {
            const response = await updateUser(userWallet, token);

            if(!response.ok) {
                throw new Error('something went wrong!');
            }

        } catch (err) {
            console.error(err);
        }

        setUserWallet({
            walletAddress: walletAddress,
            walletBalance: walletBalance
        })

        window.location.assign('/');
    }
    handleSubmit();
}

export default AddWallet;