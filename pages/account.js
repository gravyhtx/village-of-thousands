import DefaultLayout from "../templates/DefaultLayout";

import AccountContainer from "../components/AccountContainer";
// import BackToTop from "../components/BackToTop";

import Auth from '../utils/auth';
import withAuth from "../utils/withAuth";

const Account = () => {

  return(
    <DefaultLayout>
    <div className="account">
      <h1 className="account-header center">Account</h1>
      <AccountContainer />
      <div className="account-logout">
        <button
          className="logout-btn"
          onClick={Auth.logout}
        >
          LOG OUT
        </button>
      </div>
    </div>
    </DefaultLayout>
  )
}

export default withAuth(Account);