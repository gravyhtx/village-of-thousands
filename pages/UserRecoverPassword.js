import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from '../components/Footer';
import NavDesktop from "../components/NavDesktop";
import NavMobile from "../components/NavMobile";

import { Button } from "react-materialize";
import UploadFile from "../components/UploadFile";

import Mnemonic from "../components/Mnemonic";
import NewPassword from "../components/NewPassword";
import { updateUser, getSingleUser } from '../utils/API';
import Auth from '../utils/auth';
// import Captcha from "../components/Captcha";

const UserPasswordRecovery = () => {

    // Get User Data
    const [userData, setUserData] = useState({});
    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
    const getUserData = async () => {
        try {
            const token = Auth.loggedIn() ? Auth.getToken() : null;

            // if(!token) {
            //     window.location.assign('/login');
            //     return false
            // }

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

    // Get Seed Phrase Hex from Database
    let seedHex = '';
    const getMnemonic = localStorage.getItem('seed_hex');
    if (getMnemonic) {
        seedHex = getMnemonic;
    }

    // Verify Seed Phrase
    const getHex = Mnemonic.fromHex(seedHex);
    const phraseArr = getHex.toWords();
    let phrase = phraseArr.join(' ');
    let seedArr = [];
    localStorage.removeItem('upload_data');
    let txtSeed = '';
    let seed = "";
    let [pass, setPass] = useState(false);
    let [reset, setReset] = useState(false);
    console.log(pass);

    // Checks and Handle Submit
    // const captcha = localStorage.getItem('hCaptcha_token');
    const email = document.getElementById('email');
    const button = document.getElementById('submit');
    const container = document.getElementById('seed-container');

    const handleChange = () => {
        if(!pass && reset) {
            setReset(false);
            container.style.borderColor = '#222224';
            email.style.borderColor = '#9e9e9e';
            button.style.borderColor = '#7FCCE4';
            button.style.backgroundColor = '#111111';
        }
    }
    
    const handleSubmit = () => {
        seedArr = [];
        for (let i=0; i < 9; i++) {
            const input = document.getElementById('pw-'+i).value;
            seedArr.push(input);
        }
        seed = seedArr.join(' ').toLowerCase();
        txtSeed = localStorage.getItem('upload_data')
        console.log("seed: "+ seed);
        console.log("txtSeed: "+ txtSeed);
        console.log("Email (Data): "+userData.email);
        console.log("Email (Value): "+email.value);
        if ((seed === phrase && seedArr.length ===  9 && email.value === userData.email) || (txtSeed === phrase && email.value === userData.email)) {
            setPass(true)
            // console.log("pass: "+pass)
            // console.log(captcha);
            container.style.borderColor = '#222224';
            email.style.borderColor = '#9e9e9e';
            button.style.borderColor = '#7FCCE4';
            button.style.backgroundColor = '#111111';
        } else if (email.value !== userData.email) {
            setReset(true);
            email.style.borderColor = '#D24B4B';
            button.style.borderColor = '#D24B4B';
            button.style.backgroundColor = '#D24B4B10';
            button.style.borderColor = '#D24B4B';
        }  else if ((seed !== phrase && seedArr.length ===  9) || (txtSeed !== phrase)) {
            setReset(true);
            container.style.borderColor = '#D24B4B';
            button.style.borderColor = '#D24B4B';
            button.style.backgroundColor = '#D24B4B10';
            button.style.borderColor = '#D24B4B';
        } else {
            console.log("fail");
            setReset(true);
            button.style.borderColor = '#D24B4B';
            button.style.backgroundColor = '#D24B4B10';
            button.style.borderColor = '#D24B4B';
        }
    }

    const SeedPhraseInput = () => {
        let inputs = [];
        for (let i=0; i < 9; i++) {
            inputs[i] = <div className="pw-recovery-input col s4" id="pw-recovery-input" key={i}>
                            <input name={"input-"+i} id={"pw-"+i} placeholder={i+1} onChange={handleChange} />
                        </div>
        }
        return inputs;
    }

    const instructions = "GET SEED PHRASE FROM .TXT FILE";

    return (
        <>
        <Header />
        <NavMobile />
        <div className="pw-recovery-container animate__animated animate__fadeIn box-container-fluid" id="user-registration-container">
        <h1 className="pw-recovery-header center">Recover Password</h1>
        <div className="pw-recovery-container center">
        {!pass
        ? <div>
        <p className="pw-recovery-message container sm">
        Please enter your account email address and seed phrase. If you downloaded the .txt file when you created your account, you may
        choose to upload the seed phrase file instead.
        </p>
        <br/>
        <div className="pw-recovery-input-container row">
            EMAIL
            <br/>
            <div name="email" className="pw-recovery-email" id="pw-recovery-email"><input className="center" id="email" onChange={handleChange} /></div>
        </div>
            <br/>
        <div className="pw-recovery-input-container row" id='seed-container'>
            SEED PHRASE<br/><br/>
            <SeedPhraseInput />
        </div>
        <div className="upload-file-instructions upload-seed-phrase sm">{instructions}</div>
        <UploadFile
            data={txtSeed}
            containerClasses="upload-seed-phrase"
         />
        <div className="big-spacer" />
        {/* <Captcha />
        <br/> */}
        <Button
            node="button"
            style={{
                margin: '0 auto',
                width: '250px'
            }}
            waves="light"
            className="theme-btn"
            onClick={handleSubmit}
            id="submit"
        >SUBMIT</Button>
        </div>
        : <NewPassword />
        }
        </div>
        </div>
        <br/>
        <br/><br/>
        <Footer />
        <NavDesktop />
        </>
    )
}

export default UserPasswordRecovery;