import DefaultLayout from "../templates/DefaultLayout";
import RandomQuote from "../components/dynamic-content/RandomQuote";
import LoginContainer from "../components/LoginContainer";

const Register = () => {
  return (
    <DefaultLayout title="Register">
      <div className="row container signup-container animate__animated animate__fadeIn login-container">
        <LoginContainer name="register" />
      </div>
      <div className="center-text italics">
        <RandomQuote className="center-text login-zen" type="zen" />
      </div>
    </DefaultLayout>
  )
}

export default Register;