import React from "react";
import { Link } from "react-router-dom";

// make array to loop for "links-list"
const Footer = () => {

    const links = [
      ["home", "products", "faq", "cart"],
      ["login", ""]
    ]
    const siteMap = {

    }
    return (
      <div className="footer animate__animated animate__fadeIn">
        <div className="page-footer" id="online">
          <div className="footer-container container-fluid center">
            <div className="links-list disable-highlight" id="links-list">
              <div>
                <Link to="/">
                  <span className="footer-link">
                    HOME
                  </span>
                </Link> &emsp;//&emsp;
                <Link to="/faq#1">
                  <span className="footer-link">
                    ABOUT
                  </span>
                </Link> &emsp;//&emsp;
                <Link to="/shipping">
                  <span className="footer-link">
                    SHIPPING
                  </span>
                </Link> &emsp;//&emsp;
                <Link to="/returns">
                  <span className="footer-link">
                    RETURNS
                  </span>
                </Link>
              </div>
              <div>
                <Link to="/news">
                  <span className="footer-link">
                    NEWS
                  </span>&emsp;//&emsp;
                </Link>
                <Link to="/faq">
                  <span className="footer-link">
                    FAQ
                  </span>
                </Link>&emsp;//&emsp;
                <Link to="/faq#3">
                  <span className="footer-link">
                    CONTACT US
                  </span>
                </Link>
                </div>
            </div>
            <div className="copyright container center">Copyright &copy; 2022 // Village of Thousands</div>
            <br/>
          </div>
        </div>
      </div>
    );    
}

export default Footer;