import { useState } from 'react';

import { Accordion, AccordionDetails, capitalize } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';

import Login from '../components/Login';
import RandomQuote from '../components/dynamic-content/RandomQuote';

const LoginContainer = ({ name, message }) =>  {
  const [expanded, setExpanded] = useState(name || 'login');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // const signupContainers = [{name:'login', component: <Login/>}, {name:'register', component: <Register/>}];

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
            <div className="login-header disable-highlight">{capitalize("Login")}</div>
          </AccordionSummary>
          <AccordionDetails className="activate-login login-collapsible-item">
            <Login activation={true} />
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="center-text italics"><RandomQuote className="center-text activate-zen" type="zen" /></div>
    </>
  )
}

export default LoginContainer;