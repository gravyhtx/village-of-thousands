import { useState } from 'react';

import { Accordion, AccordionDetails, capitalize } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';

import DefaultLayout from '../templates/DefaultLayout';
import Login from '../components/Login';
import Register from '../components/Register';
import RandomQuote from '../components/dynamic-content/RandomQuote';

const LoginContainer = ({ name, message }) =>  {
  const [expanded, setExpanded] = useState(name || 'login');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const signupContainers = [{name:'login', component: <Login/>}, {name:'register', component: <Register/>}];

  const headerStyle = () => {
    if(h = 'login') {
      return {
        color: "#ebebeb"
      }
    } else {
      return {
        color: "#787878"
      }
    }
  };

  const ErrorMessage = () => { return message ? <div className='login-error'>{message}</div> : <></> }

  return (
    <DefaultLayout>
      <div className="row container signup-container animate__animated animate__fadeIn login-container">
        <div className="signup-collapsible">
        <ErrorMessage />
        {signupContainers.map((container, index) =>
          <Accordion
            className="collapsible"
            onChange={handleChange(container.name)}
            expanded={expanded === container.name}
            disableGutters
            key={index}
          >
            <AccordionSummary className="collapsible-header center" id="login-header">
              <div
                style={expanded === container.name ? {color: '#ebebeb'} : {color: '#787878'}}
                className="login-header disable-highlight">
                {capitalize(container.name)}
              </div>
            </AccordionSummary>
            <AccordionDetails className={container.name+"-collapsible-item"}>
              {container.component}
            </AccordionDetails>
          </Accordion>
        )}
        </div>
        <div className="center-text italics"><RandomQuote className="center-text login-zen" type="zen" /></div>
      </div>
    </DefaultLayout>
  )
}

export default LoginContainer;