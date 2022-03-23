import React, { useEffect } from 'react';
import Link from "next/link";

const NotificationBar = ({ text, link, ext }) =>  {
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
    <div className="notify" id="notify">
      <Link href={link}>
        <a className="notify-link" id="notify-link">
          {text}
        </a>
      </Link>
      {ext}
    </div>
  )
}
export default NotificationBar;