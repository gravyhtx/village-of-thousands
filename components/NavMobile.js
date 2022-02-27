import React from "react";
import Link from "next/link";
import { Button, Icon } from '@mui/material';
import Auth from '../utils/auth';

const NavMobile = () => {

    // const account = "/login";
    const account = Auth.loggedIn() ? "/account" : "/login";

    return (
        <div className="mobile-nav mobile">

            <div className="col s3 nav-mobile-col">
            <Link href={account}>
              <a><Button
                color="inherit"
                className="btn-floating navigation-link"
                floating
                node="button"
              ><Icon>person</Icon></Button></a>
            </Link>
            </div>

            <div className="col s3 nav-mobile-col">
            <Link href="/products">
              <a><Button
                className="btn-floating navigation-link"
                floating
                node="button"
            ><Icon>remove_red_eye</Icon></Button></a>
            </Link>
            </div>

            <div className="col s3 nav-mobile-col">
            <Link href="/faq">
               <a><Button
                className="btn-floating navigation-link"
                floating
                node="button"
              ><Icon>all_inclusive</Icon></Button></a>
            </Link>
            </div>

            <div className="col s3 nav-mobile-col">
            <Link href="/cart">
            <a><Button
                className="btn-floating navigation-link"
                floating
                node="button"
            ><Icon>shopping_cart</Icon></Button></a>
            </Link>
            </div>

        </div>
    );
}

export default NavMobile;