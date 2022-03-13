import React from "react";
import Link from "next/link";

const Footer = () => {

  const row1 = [
    { link: "/", name: "HOME" },
    { link: "/shop", name: "SHOP" },
    { link: "/faq#1", name: "ABOUT" },
    { link: "/cart", name: "CART" }
  ];

  const row2 = [
    { link: "/faq", name: "FAQ" },
    { link: "/news", name: "NEWS" },
    { link: "/faq#10", name: "CONTACT" }
  ];

  const spacer = <> &emsp;{"//"}&emsp;</>;

  const copyright = <>Copyright &copy; 2022 // Village of Thousands</>;

  const RowOne = () => {
    return (
      row1.map((row, index) =>
      <span key={index}>
        <Link href={row.link}><a>
          <span className="footer-link">{row.name}</span>
        </a></Link>{index !== row1.length-1 ? spacer : <></>}
      </span>
    ))
  };

  const RowTwo = () => {
    return (
      row2.map((row, index) =>
      <span key={index}>
        <Link href={row.link}><a>
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
          <span className="gravydidit highlight-selection gravy-font container center">
            <span className="highlight-selection-light cursor-help">
            <a className="highlight-selection-light cursor-help madewithlove" href="https://www.instagram.com/gravydesignco/"
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