import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { events } from './eventsData';

import styles from './Event.module.css';
import { isToday } from '../../utils/siteFunctions';
import { SocialCircles } from "../containers/SocialCircles";
import Link from "next/link";

const PopUpPage = () => {
  const [currentEvent, setCurrentEvent] = useState(false);

  const checkCurrentEvent = () => {
    for(let i=0; i < events.yr22.length; i++) {
      if(isToday(events.yr22[i].dates)) {
        setCurrentEvent(events.yr22[i]);
        return;
      }
    }
  }

  useEffect( () => { checkCurrentEvent() }, [] )

  const [readMore, setReadMore] = useState(false);

  const DisplayPopUp = () => {

    const more = () => {
      setReadMore(!readMore)
    }

    const ReadMore = () =>  {
      return (<div className={styles.more}>
        <p className={styles.wya}>
            ...and if you didn't find your way to this page at the pop-up...
            then what are ya waiting for, dawg? Come on out and join us, there's still time!
        </p>
        <p className={styles.about}>
          We hope you're having a wonderful time so far and, while we don't want you to miss
          ANY of the action today, if you're already here we invite you to look around
          our <Link href='/'><a><b>Digital HQ</b></a></Link> and we really appreciate you checking out
          out other accounts as well.
        </p>
        <p className={styles.about}>
          So, if you don't mind taking a few minutes while you're here, please give us a follow on our
          Socials, we've included those links below, and if you're looking to check out our products or
          want to know more about us, our dev team worked tirelessly to provide you some hella sick buttons
          with some Quick Links around the site.
        </p>
          <p onClick={() => more()} className={styles.readLess + ' monospace'}>
            <span>CLICK HERE TO READ LESS</span>
          </p>
      </div>)
    }

    const SiteLinks = () => {
      return (<>
        <div className={styles.siteLinks}>
          <div className={"row"}>
            <div className="col s12 m3">
              <span className="special-link">
                <Link href="/faq">
                  <a className="blue-outline special-link special-border">
                  <span className={styles.siteButtons}>ABOUT VOT</span></a>
                </Link>
                </span>
            </div>
            <div className="col s12 m3">
              <span className="special-link">
                <Link href="/shop">
                  <a className="blue-outline special-link special-border">
                  <span className={styles.siteButtons}>THE SHOP</span></a>
                </Link>
                </span>
            </div>
            <div className="col s12 m3">
              <span className="special-link">
                <Link href="/register">
                  <a className="blue-outline special-link special-border">
                  <span className={styles.siteButtons}>SIGN UP</span></a>
                </Link>
                </span>
            </div>
            <div className="col s12 m3">
              <span className="special-link">
                <Link href="/products">
                  <a className="blue-outline special-link special-border">
                  <span className={styles.siteButtons}>PRODUCTS</span></a>
                </Link>
                </span>
            </div>
          </div>
        </div>
      </>)
    }

    return(
      <div>
        <div className={styles.welcomeText}>
          <p className={styles.sup}><b>Suppp, dood?!</b></p>
          <p className={styles.intro}>
            If you're here, you already know what time it is!!
            On behalf of the <span className={styles.vot}>Village of Thousands</span> team,
            we <span className={styles.fr}>sincerely</span> thank you
            for coming out to check us out today!
          </p>

          {readMore ?
            <ReadMore /> :
            <p onClick={() => more()} className={styles.readMore + ' monospace'}>
              <span>CLICK HERE TO READ MORE</span>
            </p>}
        </div>

        <SiteLinks />
        <div className={styles.popUpSocials}>
          <p className={styles.popUpSocialsText + ' monospace'}>VISIT OUR SOCIALS</p>
          <SocialCircles />
        </div>

      </div>)
  }
  return (
    <div className={styles.main}>
      <div className={styles.componentHeader + ' monospace'}>
        {/* <div className={styles.welcomeHeader}>welcome to...</div> */}
        
        <div className={styles.eventPageFor}>THE EVENT PAGE FOR...</div>
        <div className={styles.eventNameHeader}>{currentEvent.textName}</div>
        {currentEvent.textSubName ?
          <div className={styles.eventNameSubHeader}>{currentEvent.textSubName}</div>
        : <></>}
        {/* <div className={styles.welcomeHeader}>WELCOMES YOU TO</div> */}
      </div>
        {currentEvent !== false ? <DisplayPopUp /> : <>Please check back with us soon!</>}
      
    </div>)
}

export default PopUpPage;