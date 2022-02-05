import React from "react";
import Link from "next/link";
import { Button, Icon } from 'react-materialize';
// import Auth from '../utils/auth';

const NavMobile = () => {

    const account = "/login";
    // const account = Auth.loggedIn() ? "/account" : "/login";

    return (
        <div className="mobile-nav mobile">

            <div className="col s3 nav-mobile-col">
            <Link to={account}>
              <a><Button
                className="btn-floating navigation-link"
                floating
                icon={<Icon>person</Icon>}
                node="button"
              /></a>
            </Link>
            </div>

            <div className="col s3 nav-mobile-col">
            <Link to="/products">
              <a><Button
                className="btn-floating navigation-link"
                floating
                icon={<Icon>remove_red_eye</Icon>}
                node="button"
            /></a>
            </Link>
            </div>

            <div className="col s3 nav-mobile-col">
            <Link to="/faq">
               <a><Button
                className="btn-floating navigation-link"
                floating
                icon={<Icon>all_inclusive</Icon>}
                node="button"
              /></a>
            </Link>
            </div>

            <div className="col s3 nav-mobile-col">
            <Link to="/cart">
            <a><Button
                className="btn-floating navigation-link"
                floating
                icon={<Icon>shopping_cart</Icon>}
                node="button"
            /></a>
            </Link>
            </div>

        </div>
    );
}

export default NavMobile;