import { useState } from 'react';

import { Accordion, AccordionDetails, capitalize } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';

import DefaultLayout from '../templates/DefaultLayout';
import Login from '../components/Login';
import Register from '../components/Register';
import RandomQuote from '../components/dynamic-content/RandomQuote';

const UserLoginCollapsible = () =>  {
  const [expanded, setExpanded] = useState('register');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const signupContainers = [{name:'login', component: <Login/>}, {name:'register', component: <Register/>}];

  return (
    <DefaultLayout>
      <div className="row container signup-container animate__animated animate__fadeIn login-container">
        <div className="signup-collapsible">
        {signupContainers.map((container, index) =>
          <Accordion
            className="collapsible"
            expanded={expanded === container.name}
            onChange={handleChange(container.name)}
            disableGutters
            key={index}
          >
            <AccordionSummary className="collapsible-header center" id="login-header">
              <div className="login-header disable-highlight">{capitalize(container.name)}</div>
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

export default UserLoginCollapsible;