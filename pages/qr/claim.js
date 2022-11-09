import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import DefaultLayout from '../../templates/DefaultLayout';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import LoginContainer from '../../components/LoginContainer';
import RandomQuote from '../../components/dynamic-content/RandomQuote';
import { SocialCircles } from '../../components/containers/SocialCircles';

import { authCheck } from '../../utils/siteFunctions';
import Auth from '../../utils/auth';
import ClaimPage from "../../components/qr/ClaimPage";


const Claim = () => {

  const router = useRouter();

  const [isLogged, setIsLogged] = useState(false);
  const [claimedStatus, setClaimed] = useState(false);

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

    if(claimedStatus) {
      setTimeout(function(){
        router.push('/account')
      }, 15000);
    }
  }, [])

  // const login = authCheck() === false ?
  //   <div className="row container signup-container login-container">
  //     <LoginContainer name={'login'} mapBoth={false} changeComponents={true} reloadPage={true} path={'claim'} />
  //   </div> : <></>
    

  return (
    <DefaultLayout title="Claim Your Product">
      <div className="qr claim">
      {!isLogged ? (
        <div className="row container signup-container login-container">
          <LoginContainer name={'login'} mapBoth={false} reloadPage={true} changeComponents={true} path={'claim'} />
        </div> 
        )
        : <>
            <ClaimPage />
          </>}
      </div>
    </DefaultLayout>
  )
}

export default Claim;