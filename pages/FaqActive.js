import React from "react";
import { Collapsible,  CollapsibleItem } from "react-materialize";

import Header from "../components/Header";
import NavDesktop from "../components/NavDesktop";
import NavMobile from "../components/NavMobile";
import Footer from "../components/Footer";

import ImageContainer from "../components/ImageContainer";
import Questions from "../components/modules/FaqModule";
import RandomQuote from "../components/modules/RandomQuote";

import Cartas from "../images/art/cartas.png";

// import CryptoConverter from "../components/modules/CryptoConverter";

const Faq = () => {
    const questions = Questions()
    const checkId = window.location.hash ? window.location.hash.substring(1) : "";

    // GET 'ETH' + 'BTC' PRICES //
    // CryptoConverter(40);
    // UPDATE COIN PRICES //
    // setInterval(() => {CryptoConverter(40)}, 15000);

    // useEffect needed for "scrollIntoView({ behavior: 'smooth' })"
    const question = () => {
        return (
            questions.map((q, index) =>
                <CollapsibleItem
                    expanded={false}
                    // className={checkId === index ? "active" : ""}
                    className="active"
                    id={"header-"+q.id}
                    header={
                        <div className="faq-question-header" key={"q-"+index}>
                            <span className="faq-number">{(index+1) < 10 ? ("00"+(index+1)+"//") : ("0"+(index+1)+"//")}&emsp;</span>
                            {q.question}
                        </div>}
                    key={index}>
                        <div>
                            {q.answer.map((a, index) => <div className="faq-answer p-style" key={index}>{a}</div>)}
                        </div>
                </CollapsibleItem>
            )
        )
    }
    return(
        <div className="animate__animated animate__fadeIn">
        <Header />
        <NavMobile />
        <div className="faq-container animate__animated animate__fadeIn" id="faq-container">
            <br />
            <ImageContainer imgClasses="faq-image" description="Cartas" src={Cartas} />
            <h1 className="faq-header center italics thin">frequently ask questions...</h1>
            <div className="faq-collapsible container">
            <br />
            <Collapsible accordion={false}>
                {question()}
            </Collapsible>
            </div>
        </div>
        <br/><br/>
        <RandomQuote className={"center faq-quote italics"} type={"rap"} />
        <br/><br/>
        <NavDesktop />
        <Footer />
        </div>
    )
}

export default Faq;