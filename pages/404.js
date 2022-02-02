import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-materialize";
import Header from "../components/Header";
import Footer from '../components/Footer';
import NavDesktop from "../components/NavDesktop";
import NavMobile from "../components/NavMobile";

import SiteImage from "../components/SiteImage";
import RandomQuote from "../components/modules/RandomQuote";


const PageNotFound = () => {

    const header = [
        <>Hey, broh...</>,
        <>Oh, hi, Mark...</>,
        <>Uhhhhh...</>,
        <>Yo, dawg...</>
    ]
    const text = [
        <>Sorry to inform you, but this page does not exist.
        Don't give up now. We all get lost sometimes.</>,
        <>There are many paths to take in life. Unfortunately,
        this is not one of them.</>,
        <>Well, this is awkward. Pretty sure the page you were
        hoping to find isn't this one.</>,
        <>If you think our developers made a mistake, please
        call our emergency hotline:<br/><b>(719) 266-2837</b></>,
        <>Ah, crap. Guess we didn't put up a page here. Please
        enjoy our complimentary quote for your inconvenience.</>
    ]
    
    const select = (el) => {
        let n = Math.floor(Math.random()*el.length);
        return el[n];
    }
    
    return (
      <div>
      <Header />
      <NavMobile />
      <div id="content" className="main-content animate__animated animate__fadeIn">
            <div className="big-spacer"></div>
            <div className="location-error-section">
                <div className="box-container row">

                    <div className="box-col col s12 m6 lost-container">
                        <div className="lost-mobile-header mobile only">
                            <div className="lost-header gravy-font left-text">{select(header)}</div>
                            <div className="lost-header right-text">r u lost??</div>
                        </div>
                        <SiteImage files={["fall_error", "cop_error"]} imgClasses={"lost-img"} description={"Sorry, broh. You're on the wrong page."} />
                        <br/>
                    </div>

                    <div className="box-col col s12 m6 center">
                        <div className="lost-header gravy-font left-text desktop only">{select(header)}</div><div className="lost-header right-text desktop only">r u lost??</div>
                        <br/>
                        <div className="container lost-text gravy-font weight-4">{select(text)}</div>
                        <Link to="/">
                        <Button
                            node="button"
                            style={{
                                width: '250px'
                            }}
                            waves="light"
                            className="back-btn"
                        >
                            FIND YOUR WAY HOME
                        </Button>
                        </Link>
                        <br/><br/>
                        <RandomQuote className={"i-am-lost italics"} type={"locationError"} />
                    </div>
                </div>
            </div>
            <br/>
        </div>
      <Footer />
      <NavDesktop />
      </div> 
    );
}

export default PageNotFound;