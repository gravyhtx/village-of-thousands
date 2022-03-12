import { useState, useEffect } from "react";
import DefaultLayout from "../templates/DefaultLayout";

import { Button } from "@mui/material";
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
  let getMnemonic;
  useEffect(() => {
    getMnemonic = localStorage.getItem('seed_hex');
  })
  if (getMnemonic) {
    seedHex = getMnemonic;
  }
  // Verify Seed Phrase
  const getHex = Mnemonic.fromHex(seedHex);
  const phraseArr = getHex.toWords();
  let phrase = phraseArr.join(' ');
  let seedArr = [];
  useEffect(() => {
    localStorage.removeItem('upload_data');
  })
  let [txtSeed, setTextSeed] = '';
  let seed = "";
  let [pass, setPass] = useState(false);
  let [reset, setReset] = useState(false);
  console.log(pass);

  let seedPhrase;
  let submitButton;
  let emailInput;

  let email;
  let button;
  let container;

  useEffect(() => {
    // Checks and Handle Submit
    // const captcha = localStorage.getItem('hCaptcha_token');
    email = document.getElementById('email');
    button = document.getElementById('submit');
    container = document.getElementById('seed-container');
  });
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
    // txtSeed = localStorage.getItem('upload_data')
    console.log("seed: "+ seed);
    console.log("txtSeed: "+ txtSeed);
    console.log("Email (Data): "+userData.email);
    console.log("Email (Value): "+email.value);
    if ((seed === phrase && seedArr.length ===  9 && email.value === userData.email) || (txtSeed === phrase && email.value === userData.email)) {
      setPass(true)
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

  console.log(txtSeed);

  seedPhrase = SeedPhraseInput();

  submitButton = <button
    className="theme-btn"
    onClick={handleSubmit}
    id="submit"
    >SUBMIT</button>

  emailInput = <div name="email" className="pw-recovery-email" id="pw-recovery-email"><input className="center" id="email" onChange={handleChange} /></div>

  const instructions = "GET SEED PHRASE FROM .TXT FILE";

  return (
    <DefaultLayout>
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
      <div className="pw-recovery-section-header">EMAIL</div>
      {emailInput}
    </div>
      <br/>
    <div className="pw-recovery-input-container row" id='seed-container'>
      <div className="pw-recovery-section-header">SEED PHRASE</div>
      {seedPhrase}
    </div>
    <div className="upload-file-instructions upload-seed-phrase sm">{instructions}</div>
    <UploadFile
      data={txtSeed}
      containerClasses="upload-seed-phrase"
     />
    <div className="big-spacer" />
    {submitButton}
    </div>
    : <NewPassword />
    }
    </div>
    </div>
    <br/>
    <br/><br/>
    </DefaultLayout>
  )
}

export default UserPasswordRecovery;