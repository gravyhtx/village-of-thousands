import Auth from '../utils/auth';
import LoginContainer from '../components/LoginContainer';

const withAuth = Component => {
  const Render = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    // const { isLoggedIn } = props;

    // If user is not logged in, return login component
    if (!Auth.loggedIn()) {
      return (
        <LoginContainer state="login" />
      );
    }

    // If user is logged in, return original component
    return (
      <Component {...props} />
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Render.getInitialProps = Component.getInitialProps;
  }

  return Render;
};

export default withAuth;