import { useState } from 'react';
import Link from "next/link";

import { Accordion, AccordionDetails, capitalize } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';

import Login from '../components/Login';
import RandomQuote from '../components/dynamic-content/RandomQuote';

const LoginContainer = ({ name, message }) =>  {

  const ErrorMessage = () => { return message ? <div className='login-error'>{message}</div> : <></> }

  return (
    <>
      <div className="signup-collapsible">
      <ErrorMessage />
        <Accordion
          className="collapsible"
          expanded={true}
          disableGutters
        >
          <AccordionSummary className="collapsible-header center" id="login-header">
            <div
              style={{color: '#ebebeb'}}
              className="login-header disable-highlight">
                {capitalize("Login")}
            </div>
          </AccordionSummary>
          <AccordionDetails className="activate-login login-collapsible-item">
            <Login activation={true} />
            <Link href="/register"><a className="did-you-register">
              <div className="monospace">[ DID YOU EVEN REGISTER YET, BROH? ]</div>
            </a></Link>
            <br/>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="center-text italics"><RandomQuote className="center-text activate-zen" type="zen" /></div>
    </>
  )
}

export default LoginContainer;