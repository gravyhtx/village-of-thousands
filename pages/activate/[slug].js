import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { accountActivation, getPendingUser } from "../../utils/API";
import Auth from '../../utils/auth';

import DefaultLayout from "../../templates/DefaultLayout";

import LoginContainer from "../../components/LoginContainer";
import SiteImage from "../../components/SiteImage";

const Activate = () => {
  const router = useRouter();

  const [isLogged, setIsLogged] = useState(false);
  const [activateStatus, setActivateStatus] = useState(false);

  useEffect(() => {
    const checkLogged = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (token) {
          setIsLogged(true);
        }
      } catch (err) {
        console.error(err)
      }
    }

    checkLogged();

    if(activateStatus) {
      setTimeout(function(){
        router.push('/')
      }, 15000);
    }
  }, [])

  const activatePendingUser = async () => {

    const userExists = await getPendingUser(router.query.slug);

    if (!userExists) {
      //user did not exist, get out
      //need to include different content displayed with explanation
      return
    }
    
    const activate = await accountActivation(router.query.slug);

    if (!activate) {
      //activation failed, get dunked
      return
    }

    Auth.activationLogout();
    setActivateStatus(true);
  }

  const activateHeader = "SUPPP, BROH?!";

  return (
    <DefaultLayout title={activateStatus ? "Activate" : "Ya Did It!"}>{/* <DefaultLayout headerImages={headerImages}> */}
      <div className="activate-page center container animate__animated animate__fadeIn">
        {!isLogged ? (
          <div className="row container signup-container login-container">
            <LoginContainer changeComponents={true} activationPage={true} />
          </div>
        ) : 
        (
          <div className="activate-content">
            {!activateStatus ? (
              <>
                <h1 className="activate-header">
                  {activateHeader.split("").map((letter, index)=> {
                    return <span key={index}>{letter}</span>
                  })}
                </h1>
                <button className="activate-button not-a-button" onClick={activatePendingUser}>
                  <div className="content">
                    <div>
                      <p className="activate-click-me_broh">
                        <b className="activate-here italics cursor-pointer">
                        [Click here]</b> to activate your account.
                      </p>
                    </div>
                    <div className="activate_or-here right cursor-pointer">...or here, even</div>
                    <div className="activate_here-too left cursor-pointer">here too...</div>
                  </div>
                </button>
                <p className="activate-almost-there_broh monospace glow">[ You're almost there, dood. ]</p>
              </>
            ): (
              <>
                <Link href="/"><a style={{cursor: 'pointer'}}><h1 className="activated-header">
                  <div className="activated-congrats glow">CONGRATS!</div>
                  <div className="activated-is-activated">YOUR ACCOUNT IS ACTIVE, DAWG!</div>
                </h1>
                <div className="activated-content">
                  <SiteImage
                    containerClasses="activated-image"
                    siteImage="Bro"
                    draggable="false"
                    description="You activated your account, broh."
                  />
                  <div className="activated-emoji monospace">[INSERT APPROPRIATE EMOJI]</div>
                </div></a></Link>
              </>
            )}
          </div>
        )
        }
      </div>
    </DefaultLayout>
  );
}

export default Activate;