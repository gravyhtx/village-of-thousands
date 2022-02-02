import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from 'react-materialize';
import Auth from '../utils/auth';
// import BlockiesIdenticon from "./BlockiesIdenticon";
// import BlockiesIdenticon from 'blockies/react-component';


const NavDesktop = ( userData ) => {

    const fingerprint = <Icon className="avatar">fingerprint</Icon>
    // const blockie = <Icon className="avatar">fingerprint</Icon>
    const account = Auth.loggedIn() ? "/account" : "/login";
    // blockie = <BlockiesIdenticon className="blockie-nav" opts={{seed: "foobafdsafr"}}/>
    // document.onload = console.log(Auth.loggedIn())
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
                <Link to={account}>
                    <Button
                        className="btn-floating navigation-link"
                        floating
                        icon={<Icon>person</Icon>}
                        node="button"
                    />
                </Link>
                <Link to="/products">
                    <Button
                        className="btn-floating navigation-link"
                        floating
                        icon={<Icon>remove_red_eye</Icon>}
                        node="button"
                    />
                </Link>
                <Link to="/faq">
                    <Button
                        className="btn-floating navigation-link"
                        floating
                        icon={<Icon>all_inclusive</Icon>}
                        node="button"
                    />
                </Link>
                <Link to="/cart">
                    <Button
                        className="btn-floating navigation-link"
                        floating
                        icon={<Icon>shopping_cart</Icon>}
                        node="button"
                    />
                </Link>
            </Button>
        </div>
        
    );
}

export default NavDesktop;