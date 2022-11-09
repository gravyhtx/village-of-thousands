import DefaultLayout from "../templates/DefaultLayout";

import AccountContainer from "../components/account/AccountContainer";
import OrderHistory from "../components/account/OrderHistory";
// import BackToTop from "../components/BackToTop";

import Auth from '../utils/auth';
import { formatDate, isToday, valiDate } from "../utils/siteFunctions";

const Account = () => {

  return(
    <DefaultLayout title={"Account"} withAuth={true}>
    <div className="account">
      <h1 className="account-header center">Account</h1>
      <AccountContainer />
      <OrderHistory />
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

export default Account;