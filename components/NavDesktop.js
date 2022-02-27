import React from "react";
import Link from "next/link";
import { Button, Icon } from '@mui/material';
import Auth from '../utils/auth';
// import BlockiesIdenticon from "./BlockiesIdenticon";
// import BlockiesIdenticon from 'blockies/react-component';


const NavDesktop = ( userData ) => {

    const navlinks = []
    const fingerprint = <Icon className="avatar">fingerprint</Icon>
    // const account = "/login";
    const account = Auth.loggedIn() ? "/account" : "/login";

    return (
    <div className="fixed-action-btn toolbar desktop">
        <Button
        className="btn-floating btn-large action-nav waves-effect waves-light pulse z-depth-1"
        fab={{
            direction: 'top',
            toolbarEnabled: true
        }}
        floating
        icon={fingerprint}
        large
        node="button"
        >
        <Link href={account}>
        <a><Button
        className="btn-floating navigation-link"
        floating
        node="button"
        ><Icon>person</Icon></Button></a>
        </Link>
        <Link href="/products">
        <a><Button
            className="btn-floating navigation-link"
            floating
            node="button"
            ><Icon>remove_red_eye</Icon></Button></a>
        </Link>
        <Link href="/faq">
        <a><Button
            className="btn-floating navigation-link"
            floating
            node="button"
            ><Icon>all_inclusive</Icon></Button></a>
        </Link>
        <Link href="/cart">
        <a><Button
            className="btn-floating navigation-link"
            floating
            node="button"
            ><Icon>shopping_cart</Icon></Button></a>
        </Link>
        </Button>
    </div>
        
    );
}

export default NavDesktop;