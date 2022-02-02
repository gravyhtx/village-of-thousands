import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from '../components/Footer';
import NavDesktop from "../components/NavDesktop";
import NavMobile from "../components/NavMobile";
import Mnemonic from "../components/Mnemonic";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox } from "react-materialize";

import { updateUser, getSingleUser } from '../utils/API';
import Auth from '../utils/auth';

const UserMnemonic = () => {
    let navigate = useNavigate()

    // Get User Data
    const [userData, setUserData] = useState({});
    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if ((token && userData.email && userData.mnemonic) || !token) {
                    navigate('/')
                    return false
                }

                const response = await getSingleUser(token);

                if (!response.ok) {
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

    // Add Seed Phrase Hex
    const [userFormData, setUserFormData] = useState({ email: '', password: '', mnemonic: '', completeRegistration: false });
    const m = new Mnemonic(96)
    const hex = m.toHex()
    let seedHex = hex;

    const getMnemonic=localStorage.getItem('seed_hex');
    if (getMnemonic) {
        seedHex = getMnemonic;
    } else {
        localStorage.setItem('seed_hex', seedHex);
    }

    let getHex = Mnemonic.fromHex(seedHex);
    const phrase = getHex.toWords();

    // Handle Agreement
    let [checked, setChecked] = useState(false);
    const handleChange = () => {
        handleAgreement();
        setChecked(!checked);
    };

    // Check for page refresh
    let [refresh, setRefresh] = useState(true);
    const handleAgreement = () => {
        setRefresh(false);
        setChecked(false);
    };

    // Store Seed Phrase Hex  
    const handleMnemonicSubmit = async (event) => {
        event.preventDefault();

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            // window.location.assign('/404');
            return false;
        }

        try {
            let updateObj = {
                seedHex: seedHex,
                completeRegistration: true
            }
            updateUser(updateObj, token)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('something went wrong!');
                    } else {
                        // window.location.assign('/signup-2');
                    }

                });


        } catch (err) {
            console.error(err);
        }

        navigate('/signup-2')
    }

    const ErrorMessage = () => {
        if (!checked && !refresh) {
            return (
                <div className="blue-glow center italics">** Please save your seed phrase and click the checkbox. **</div>
            )
        } else {
            return (<></>)
        }
    }

    const Agree = () => {
        if (!checked) {  // ENABLE "NEXT" BUTTON
            checked = true;
            return (
                <Button
                    node="button"
                    style={{
                        margin: '0 auto',
                        width: '250px'
                    }}
                    waves="light"
                    className="account-wallet-btn"
                    onClick={handleMnemonicSubmit}
                >
                    Next
                </Button>
            )
        } else {  // DISABLE "NEXT" AND DISPLAY ERROR MESSAGE IF AGREEMENT IS UNCHECKED
            checked = false;
            return (
                <Button
                    node="button"
                    style={{
                        margin: '0 auto',
                        width: '250px'
                    }}
                    waves="light"
                    className="theme-btn disabled-btn"
                    onClick={handleAgreement}
                >
                    Next
                </Button>
            )
        }
    }
    const seedTxt = () => {
        const text = phrase.join(' ')
        return (text)
    }
    const downloadTxtFile = () => {
        const textData = document.createElement("a");
        const file = new Blob([seedTxt()], { type: 'text/plain' });
        textData.href = URL.createObjectURL(file);
        textData.download = "vot_seed_phrase.txt";
        document.body.appendChild(textData); // Required for this to work in FireFox
        textData.click();
    }

    if (userData.email && userData.password && !userData.mnemonic) {
        return (
            <>
                <Header />
                <NavMobile />
                <div className="user-mnemonic-container animate__animated animate__fadeIn box-container-fluid" id="user-registration-container">
                    <h1 className="user-registration-header center">Complete Your Registration</h1>
                    <div className="seed-phrase">
                        {/* <h2 className="center">Seed Phrase</h2> */}
                        <br />
                        <div className="seed-phrase-container center container row" id="seed-phrase">
                            {phrase.map((word, index) =>
                                <div className="seed-word-container center col s4" key={index}>
                                    <div className="row">
                                        <div className="seed-word-number col s2 disable-highlight">{index + 1}.&nbsp;</div>
                                        <div className="seed-word col s10">{word}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="seed-phrase-checkbox center">
                        <div className="container">
                            <div className="important">IMPORTANT!</div>
                            <div className="seed-phrase-reminder container">
                                This is the "seed phrase" (aka mnemonic) associated with your account. If you lose your password or want to change it
                                in the future, entering your seed phrase is the only method of recovery. Please take a second to write down and/or save this
                                phrase and keep it safe to avoid losing access to your account!
                            </div>
                            <div className='download-seed-phrase container center sm' id='download' onClick={downloadTxtFile}>DOWNLOAD SEED PHRASE TO .TXT</div>
                        </div>
                        <ErrorMessage />
                        <Checkbox
                            onChange={handleChange}
                            checked={false}
                            id="seed-phrase-checkbox"
                            label="I have saved my seed phrase."
                            value="I have saved my seed phrase."
                        />
                    </div>
                    <div className="user-registration-next center">
                        <Agree />
                    </div>
                    <br /><br />
                </div>
                <Footer />
                <NavDesktop />
            </>
        )
    } else { return (<></>) }
}

export default UserMnemonic;