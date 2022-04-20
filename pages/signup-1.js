import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import DefaultLayout from '../templates/DefaultLayout';
import Mnemonic from "../components/Mnemonic";
import { Button, Checkbox, FormControlLabel } from '@mui/material';

// import withAuth from '../utils/withAuth';
import { updatePendingUser, getSingleUser } from '../utils/API';
import Auth from '../utils/auth';

const UserMnemonic = () => {
  let router = useRouter();

  // Get User Data
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
          router.push('/login')
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
  }, [userDataLength]);

  // Add Seed Phrase Hex
  // const [userFormData, setUserFormData] = useState({ email: '', password: '', mnemonic: '', completeRegistration: false });
  const m = new Mnemonic(96)
  const hex = m.toHex()
  const [seedHex, setSeedHex] = useState(hex);

  useEffect(() => {
    const getMnemonic=localStorage.getItem('seed_hex');
    if (getMnemonic) {
      setSeedHex(getMnemonic);
    } else {
      localStorage.setItem('seed_hex', seedHex);
    }
    handleMnemonicSubmit();
  }, []);

  let getHex = Mnemonic.fromHex(seedHex);
  let phrase = getHex.toWords();;

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
  const handleMnemonicSubmit = async () => {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    try {
      let updateObj = {
        seedHex: seedHex
      }
      updatePendingUser(updateObj, token)
      .then(response => {
        if (!response.ok) {
          router.push('/login');
        }
      });

    } catch (err) {
      console.error(err);
    }
  }

  handleMnemonicSubmit();
  const ErrorMessage = () => {
    if (!checked && !refresh) {
      return (
        <div className="blue-glow center italics">** Please save your seed phrase and click the checkbox. **</div>
      )
    } else {
      return (<></>)
    }
}

  // const Agree = () => {
  //   if (!checked) {  // ENABLE "NEXT" BUTTON
  //     checked = true;
  //     return (
  //       <Button
  //         node="button"
  //         style={{
  //           margin: '0 auto',
  //           width: '250px'
  //         }}
  //         waves="light"
  //         className="account-wallet-btn"
  //         onClick={handleMnemonicSubmit}
  //         suppressHydrationWarning
  //       >
  //         Next
  //       </Button>
  //     )
  //   } else {  // DISABLE "NEXT" AND DISPLAY ERROR MESSAGE IF AGREEMENT IS UNCHECKED
  //     checked = false;
  //     return (
  //       <Button
  //         node="button"
  //         style={{
  //           margin: '0 auto',
  //           width: '250px'
  //         }}
  //         waves="light"
  //         className="theme-btn disabled-btn"
  //         onClick={handleAgreement}
  //         suppressHydrationWarning
  //       >
  //         Next
  //       </Button>
  //     )
  //   }
  // }
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

  return (
    <DefaultLayout withAuth={true}>
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
                  <div className="seed-word col s10" suppressHydrationWarning>{word}</div>
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
          {/* <ErrorMessage />
          <FormControlLabel
            label="I have saved my seed phrase."
            control={<Checkbox checked={checked} onChange={() => handleChange()} />}
          /> */}
        </div>
        <div className="user-registration-next center">
          {/* <Agree /> */}
          <Link href="/signup-2"><a><Button
            node="button"
            style={{
              margin: '0 auto',
              width: '250px'
            }}
            waves="light"
            className="account-wallet-btn"
            // onClick={handleMnemonicSubmit}
            suppressHydrationWarning
          >
            Next
          </Button></a></Link>
        </div>
        <br /><br />
      </div>
    </DefaultLayout>
  )
}

export default UserMnemonic;