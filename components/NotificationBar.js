import React from 'react';
import Link from "next/link";

const NotificationBar = ({ text, link }) =>  {

    const component=   
        <Link href={link} className="nav-link" id="notify-link">
            <a>
            <div className="notify" id="notify">
                {text}
            </div>
            </a>
        </Link>

    return (
        <>{text ? component : <></>}</>
    )
}
export default NotificationBar;