import { useEffect, useState, useRef } from "react";

import DefaultLayout from "../templates/DefaultLayout";

import { Accordion, AccordionDetails } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary';
import SiteImage from "../components/SiteImage";
import Questions from "../components/FaqContent";
import RandomQuote from "../components/dynamic-content/RandomQuote";

import Cartas from "../public/images/art/cartas.png";

import scrollToEl from "../modules/scrollToEl";

// import CryptoConverter from "../components/modules/CryptoConverter";

const Faq = () => {
  const questions = Questions();

  const [expanded, setExpanded] = useState(undefined);
  const [scrollLoad, setScrollLoad] = useState(true);
  const accordElem = useRef(null);

  const scroll = () => {
    // scrollToEl(expanded !== undefined ? ('scrollToEl-'+expanded) : expanded === undefined ? ('layout', 200) : null);
    scrollToEl(expanded !== undefined ? ('scrollToEl-'+expanded) : null);
  }
  const handleChange = (panel) => (event, newExpanded) => {
    setScrollLoad(false);
    setExpanded(newExpanded ? panel : false);
  };

  let checkId = "";
  useEffect(() => {
    checkId = window.location.hash ? window.location.hash.substring(1) : "";
    scrollLoad ? setExpanded(checkId-1) : null;
  });

  const question = () => {
    return (
      questions.map((q, index) =>
        <div id={"scrollToEl-"+index} key={index}>
        <Accordion
          className={expanded === index ? "collapsible active" : "collapsible"}
          expanded={expanded === index}
          onChange={handleChange(index)}
          ref={accordElem}
          disableGutters>
          <AccordionSummary className="faq-question-container" onClick={scroll()}>
            <span className="faq-number">{(index+1) < 10 ? (`00${index+1}//`) : (`"0${index+1}//`)}&emsp;</span>
            <h2 className="faq-question-header">{q.question}</h2>
          </AccordionSummary>
          <AccordionDetails className="faq-body">
            <div>
              {q.answer.map((a, index) => <div className="faq-answer p-style" key={index}>{a}</div>)}
            </div>
          </AccordionDetails>
        </Accordion>
        </div>
      )
    )
  }
  return(
    <DefaultLayout>
      <div className="faq-container animate__animated animate__fadeIn" id="faq-container">
        <SiteImage
          layout="responsive"
          containerClasses="faq-image-container"
          imgClasses="faq-image"
          description="Cartas"
          images={Cartas} />
        <h1 className="faq-header center italics thin focus-in-expand">frequently ask questions...</h1>
        <div className="faq-collapsible container">
        {question()}
        </div>
      </div>
      <br/><br/>
      <RandomQuote className="center faq-quote italics" type="rap" />
      <br/><br/>
    </DefaultLayout>
  )
}

export default Faq;