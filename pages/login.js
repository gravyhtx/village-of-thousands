import DefaultLayout from "../templates/DefaultLayout";
import RandomQuote from "../components/dynamic-content/RandomQuote";
import LoginContainer from "../components/LoginContainer";

const Login = () => {
  const showQuoteInContainer = true;
  return (
    <DefaultLayout title="Login">
      <div className="row container signup-container animate__animated animate__fadeIn login-container">
        <LoginContainer showQuote={showQuoteInContainer} name="login" />
        {!showQuoteInContainer 
          ? <div className="center-text italics"><RandomQuote className="center-text login-zen" type="zen" /></div>
          : <></>}
      </div>
    </DefaultLayout>
  )
}

export default Login;