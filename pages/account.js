import DefaultLayout from "../templates/DefaultLayout";

import AccountContainer from "../components/AccountContainer";
// import BackToTop from "../components/BackToTop";

import Auth from '../utils/auth';
import { formatDate, isToday, valiDate } from "../utils/siteFunctions";

const Account = () => {

  const inputDate = '10/21/2022';
  console.log(formatDate(inputDate,true))
  console.log(valiDate(inputDate))
  console.log(isToday(inputDate))

  return(
    <DefaultLayout title={"Account"} withAuth={true}>
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

export default Account;