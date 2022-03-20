import React, { useEffect } from 'react';
import Link from "next/link";

const NotificationBar = ({ text, link }) =>  {
  let component;

  useEffect(() => {
    component=   
    <Link href={link}>
      <a className="nav-link" id="notify-link">
      <div className="notify" id="notify">
        {text}
      </div>
      </a>
    </Link>
  })

  return (
    <>{text ? component : <></>}</>
  )
}
export default NotificationBar;