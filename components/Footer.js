import React from "react";
import Link from "next/link";

const Footer = () => {

  const row1 = [
    { link: "/", name: "HOME", label: "There's no place like home... unless home isn't VoT Digital HQ, which this is." },
    { link: "/shop", name: "SHOP", label: "Shop Products from Our Current SZN" },
    { link: "/faq#1", name: "ABOUT", label: "Learn all about Village of Thousands and our Digital HQ" },
    { link: "/faq", name: "FAQ", label: "FAQ means Frequently Ask Questions" },
  ];

  const row2 = [
    { link: "/products", name: "SZN", label: "Learn about Products from our Current SZN" },
    { link: "/news", name: "NEWS", label: "This page does not exist yet... but visit it anyway" },
    { link: "/faq#11", name: "CONTACT", label: "Get in touch with us" },
    { link: "/cart", name: "CART", label: "View your Cart" }
  ];

  const spacer = <> &emsp;{"//"}&emsp;</>;

  const copyright = <>Copyright &copy; 2022 // Village of Thousands</>;

  const RowOne = () => {
    return (
      row1.map((row, index) =>
      <span key={index}>
        <Link href={row.link}><a aria-label={row.label}>
          <span className="footer-link">{row.name}</span>
        </a></Link>{index !== row1.length-1 ? spacer : <></>}
      </span>
    ))
  };

  const RowTwo = () => {
    return (
      row2.map((row, index) =>
      <span key={index}>
        <Link href={row.link}><a aria-label={row.label}>
          <span className="footer-link">{row.name}</span>
        </a></Link>{index !== row2.length-1 ? spacer : <></>}
      </span>
    ))
  };

  return (
    <div className="footer animate__animated animate__fadeIn">
      <div className="page-footer" id="online">
        <div className="footer-container container-fluid center disable-highlight">
          <div><RowOne /></div>
          <div><RowTwo /></div>
        </div>
        <div className="copyright container center">
          <div className="copyright-text">{copyright}</div>
          <span className="gravydidit highlight-selection gravy-font container center" aria-label="You found me!">
            <span className="highlight-selection-light cursor-help">
            <a className="highlight-selection-light cursor-help madewithlove"
            href="https://www.instagram.com/gravydesignco/"
            rel="noreferrer" target="_blank">
            &nbsp;MADE WITH LOVE BY GRÄVY DESIGN CO.</a>
            </span>
          </span>
        </div>
        <br/>
      </div>
    </div>
  );    
}

export default Footer;