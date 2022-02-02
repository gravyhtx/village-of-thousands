import React from 'react';
import { Link } from "react-router-dom";

const NotificationBar = ({ text, link }) =>  {

    const component=   
        <Link to={link} className="nav-link" id="notify-link">
            <div className="notify" id="notify">
                {text}
            </div>
        </Link>

    return (
        <>{text ? component : <></>}</>
    )
}
export default NotificationBar;