import DefaultLayout from "../templates/DefaultLayout";

import { Button } from "@mui/material";

import AccountContainer from "../components/AccountContainer";
// import BackToTop from "../components/BackToTop";

import Auth from '../utils/auth';
import withAuth from "../utils/withAuth";

const Account = () => {

  return(
    <DefaultLayout>
    <div className="account">
      <h1 className="account-header">Account</h1>
      <AccountContainer />
      <div className="account-logout">
        <Button
          node="button"
          style={{
            width: '250px'
          }}
          waves="light"
          className="logout-btn"
          onClick={Auth.logout}
        >
          LOG OUT
        </Button>
      </div>
    </div>
    </DefaultLayout>
  )
}

export default withAuth(Account);