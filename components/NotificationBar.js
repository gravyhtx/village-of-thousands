import React, { useEffect } from 'react';
import Link from "next/link";

const NotificationBar = ({ text, link }) =>  {
  let component;

  useEffect(() => {
    component=   
    <Link href={link}>
      <a className="notify-link" id="notify-link">
      <div className="notify" id="notify">
        <>{text}</>
      </div>
      </a>
    </Link>
  })

  return (
    <Link href={link}>
      <a className="notify-link" id="notify-link">
      <div className="notify" id="notify">
        <>{text}</>
      </div>
      </a>
    </Link>
  )
}
export default NotificationBar;