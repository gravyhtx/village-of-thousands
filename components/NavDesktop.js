import React from "react";
import Link from "next/link";
import { Button, Icon } from 'react-materialize';
import Auth from '../utils/auth';
// import BlockiesIdenticon from "./BlockiesIdenticon";
// import BlockiesIdenticon from 'blockies/react-component';


const NavDesktop = ( userData ) => {

    const navlinks = []
    const fingerprint = <Icon className="avatar">fingerprint</Icon>
    const account = "/login";
    // const account = Auth.loggedIn() ? "/account" : "/login";

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
        icon={<Icon>person</Icon>}
        node="button"
        /></a>
        </Link>
        <Link href="/products">
        <a><Button
            className="btn-floating navigation-link"
            floating
            icon={<Icon>remove_red_eye</Icon>}
            node="button"
        /></a>
        </Link>
        <Link href="/faq">
        <a><Button
            className="btn-floating navigation-link"
            floating
            icon={<Icon>all_inclusive</Icon>}
            node="button"
        /></a>
        </Link>
        <Link href="/cart">
        <a><Button
            className="btn-floating navigation-link"
            floating
            icon={<Icon>shopping_cart</Icon>}
            node="button"
        /></a>
        </Link>
        </Button>
    </div>
        
    );
}

export default NavDesktop;