import React from "react";
import Link from "next/link";

// make array to loop for "links-list"
const Footer = () => {

    // const links = [
    //   ["home", "products", "faq", "cart"],
    //   ["login", ""]
    // ]
    // const siteMap = {

    // }

    return (
    <div className="footer animate__animated animate__fadeIn">
      <div className="page-footer" id="online">
        <div className="footer-container container-fluid center">
          <div className="links-list disable-highlight" id="links-list">
            <Link href="/">
              <a><span className="footer-link">
              HOME
              </span></a>
            </Link> &emsp;//&emsp;
            <Link href="/products">
            <a><span className="footer-link">
              SHOP
              </span></a>
            </Link> &emsp;//&emsp;
            <Link href="/faq#1">
            <a><span className="footer-link">
              ABOUT
              </span></a>
            </Link> &emsp;//&emsp;
            <Link href="/cart">
              <a><span className="footer-link">
              CART
              </span></a>
            </Link>
            </div>
            <div className="disable-highlight">
            <Link href="/news">
            <a><span className="footer-link">
                NEWS
                </span></a>
            </Link>&emsp;//&emsp;
            <Link href="/faq">
            <a><span className="footer-link">
                FAQ
                </span></a>
            </Link>&emsp;//&emsp;
            <Link href="/faq#3">
            <a><span className="footer-link">
                CONTACT US
                </span></a>
            </Link>
            </div>
        </div>
        <div className="copyright container center">
            <div className="copyright-text">Copyright &copy; 2022 // Village of Thousands</div>
            <span className="gravydidit highlight-selection gravy-font container center">
                <span className="highlight-selection-light cursor-help">
                <a className="highlight-selection-light cursor-help" href="https://www.instagram.com/gravydesignco/"
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