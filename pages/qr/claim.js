import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import SocialCircles from '../../components/SocialCircles';
import RandomQuote from '../../components/dynamic-content/RandomQuote';
import LoginContainer from '../../components/LoginContainer';

import DefaultLayout from '../../templates/DefaultLayout';

import { authCheck } from '../../utils/siteFunctions';


const Claim = () => {

  const login =
    <div className="row container signup-container login-container">
      <LoginContainer mapBoth={true} />
    </div>

  return (
    <DefaultLayout title="Claim Your Product">
      <div className="qr claim">
      { authCheck() === false ? login :
        <>
          <SocialCircles />
          <RandomQuote className={"zen"} type={"zen"} />
        </>}
      </div>
    </DefaultLayout>
  )
}

export default Claim;