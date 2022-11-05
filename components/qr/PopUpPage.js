import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import styles from './Event.module.css';

const PopUpPage = () => {
  const DisplayPopUp = () => {
    return(<div></div>)
  }
  return (
    <div className={styles.main}>
      <div className={styles.componentHeader}>
        <div className={styles.headerText}>VoT Events</div>
      </div>
      <DisplayPopUp />
    </div>)
}

export default PopUpPage;