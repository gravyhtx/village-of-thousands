import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextInput, Button } from 'react-materialize';

import { createUser } from '../utils/API';
import Auth from '../utils/auth';

const Register = () =>  {

    const [userFormData, setUserFormData] = useState({ email: '', password: '', mnemonic: ''});
    const [validated] = useState(false);
    let navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({...userFormData, [name]: value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const form = event.currentTarget;
        if(form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            const response = await createUser(userFormData);

            if(!response.ok) {
                throw new Error('something went wrong!');
            }

            const { token, user } = await response.json();
            // console.log(user);
            Auth.login(token);
            navigate('/signup-1')
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            email: '',
            password: '',
            mnemonic: 'false'
        })

        // need use History
        // window.location.assign('/#/signup-1');
    }

    return (
        <>
            <div className="login-input-container">
                <div id="user-register-email">Email</div>
                <TextInput
                    email
                    name="email"
                    aria-labelledby="user-register-email"
                    className="input-field"
                    id="user-register-email_input"
                    onChange={handleInputChange}
                    value={userFormData.email}
                    validate />
            </div>
            <div className="login-input-container">
                <div id="user-register-password">Password</div>
                <TextInput
                    name="password"
                    type="password"
                    aria-labelledby="user-register-password"
                    className="input-field"
                    id="user-register-password_input"
                    onChange={handleInputChange}
                    value={userFormData.password} />
            </div>
            <div className="center-text">
                    <Button
                        node="button"
                        waves="light"
                        className="login-btn"
                        onClick={handleFormSubmit}
                    >
                        Create Account
                    </Button>
            </div>
        </>
    )      
}
export default Register;