import { useEffect, useState, useRef } from "react";

import DefaultLayout from "../templates/DefaultLayout";

import { Accordion, AccordionDetails } from "@mui/material";
import AccordionSummary from '@mui/material/AccordionSummary'
;
import SiteImage from "../components/SiteImage";
import Questions from "../components/FaqContent";
import RandomQuote from "../components/dynamic-content/RandomQuote";

import Cartas from "../public/images/art/cartas.png";

import scrollToEl from "../modules/scrollToEl";

// import CryptoConverter from "../components/modules/CryptoConverter";

const Faq = () => {
  const questions = Questions();

  let checkId = "";
  const qId = Number(checkId-1);
  useEffect(() => {
    checkId = window.location.hash ? window.location.hash.substring(1) : "";
    if (checkId) {
      scrollToEl(("scrollToEl-"+qId),200);
    }
  })

  const [expanded, setExpanded] = useState(undefined);
  const accordElem = useRef(null);
  const scroll = () => {
    scrollToEl(expanded !== undefined ? ('scrollToEl-'+expanded) : expanded === undefined ? ('layout', 200) : null);
  }
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const question = () => {
    return (
      questions.map((q, index) =>
        <div id={"scrollToEl-"+index}>
        <Accordion
          className={expanded === index ? "collapsible active" : "collapsible"}
          expanded={expanded === index}
          onChange={handleChange(index)}
          ref={accordElem}
          disableGutters
          key={index}>
          <AccordionSummary className="faq-question-header" onClick={scroll()}>
            <span className="faq-number">{(index+1) < 10 ? ("00"+(index+1)+"//") : ("0"+(index+1)+"//")}&emsp;</span>
            {q.question}
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