import React from 'react';
import Link from "next/link";

const NotificationBar = ({ text, link }) =>  {

    const component=   
        <Link href=""className="nav-link" id="notify-link">
            <div className="notify" id="notify">
                {text}
            </div>
        </Link>

    return (
        <>{text ? component : <></>}</>
    )
}
export default NotificationBar;