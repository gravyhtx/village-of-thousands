import { useState } from 'react';
import Link from "next/link";

import { Accordion, AccordionDetails, capitalize } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';

import Login from '../components/Login';
import Register from '../components/Register';
import RandomQuote from "../components/dynamic-content/RandomQuote";

const LoginContainer = ({ name, mapBoth, reloadPage, activationPage, showQuote, admin }) =>  {

  // Ensure names are correct
  name = name === 'login' || activationPage === true || admin === true ? 'login' : 'register';

  // Sets admin to 'false' by default unless specified
  admin = admin === true ? true : false;

  // Display collapsible of both components (Login & Register) or choose one (determined by "name")
  // -- Default is 'true'.
  mapBoth = mapBoth === false || activationPage === true || admin === true ? false : true;

  // Determine if quote is shown or not -- Default is 'true'.
  showQuote = showQuote === false || admin === true ? false : true;

  // If "reloadPage" is true, page will reload on login (instead of go to home) -- Default is 'false'.
  //  ** Used in '/activate/[slug]', '/admin', and QR pages -- wherever
  //     login is needed to continue on the same page **
  reloadPage = reloadPage === true || activationPage === true || admin === true ? true : false;
  
  // Check to see which component is expanded
  const [expanded, setExpanded] = useState(name || 'login');

  // Handle expanded component change
  const handleChange = (panel) => (event, newExpanded) => {
    mapBoth ? setExpanded(newExpanded ? panel : false) : setExpanded(panel);
  };

  // Component object
  const signupContainers = [{name:'login', component: <Login reloadPage={reloadPage}/>}, {name:'register', component: <Register/>}];

  const accordianComponent = (container, index) =>
      <Accordion
        className="collapsible"
        onChange={handleChange(container.name)}
        expanded={expanded === container.name}
        disableGutters
        key={index}
      >
        <AccordionSummary className="collapsible-header center" id={container.name+"-header"}>
          <div
            style={expanded === container.name || mapBoth === false ? {color: '#ebebeb'} : {color: '#787878'}}
            className={container.name+"-header disable-highlight"}>
              {capitalize(container.name)}
          </div>
        </AccordionSummary>
        <AccordionDetails className={
            container.name+"-collapsible-item" +
            ((mapBoth === false && container.name === "login") || (activationPage)
              ? " margin"
              : "")
          }>
          {container.component}
          { ((mapBoth === false && container.name === "login") || (activationPage)) && admin === false
            ? <div className="login-only-message">
              <Link href="/register"><a className="did-you-register">
                <div className="monospace">[ DID YOU EVEN REGISTER YET, BROH? ]</div>
              </a></Link></div>
            : <></> }
        </AccordionDetails>
      </Accordion>
  
  
  return (<>
    <div className="signup-collapsible">
      {  mapBoth === false && name === "login"
          ? accordianComponent(signupContainers[0], 0)
        : mapBoth === false && name === "register"
          ? accordianComponent(signupContainers[1], 0)
        : signupContainers.map((container, index) => {
            return accordianComponent(container, index)
          })
      }</div>
      { showQuote 
        ? <div className="center-text italics">
            <RandomQuote
              className={"center-text "
                + activationPage
                ? "activate-zen"
                : "login-zen" }
              type="zen" />
          </div>
        : <></>}
  </>)
}

export default LoginContainer;