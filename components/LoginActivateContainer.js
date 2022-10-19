import Link from "next/link";

import { Accordion, AccordionDetails, capitalize } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';

import Login from '../components/Login';

const LoginContainer = ({ message, mapBoth }) =>  {

  return (
    <>
      <div className="signup-collapsible">
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
          <AccordionDetails className="login-collapsible-item margin">
            <Login reloadPage={true} />
            <Link href="/register"><a className="did-you-register">
              <div className="monospace">[ DID YOU EVEN REGISTER YET, BROH? ]</div>
            </a></Link>
            <br/>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  )
}

export default LoginContainer;