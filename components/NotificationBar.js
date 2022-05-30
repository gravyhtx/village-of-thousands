import React, { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";

const NotificationBar = ({ text, link, ext, extLink }) =>  {
  const router = useRouter();

  useEffect(() => {
    if(extLink){
      if(!document.getElementById('ext-link').matches(':hover')) {
        document.getElementById('notify').addEventListener('click', () => {
          if(link){ router.push(link) }
        });
      } else {
        document.getElementById('ext-link').addEventListener('click', () => {
          if(extLink){ router.push(extLink) }
        })
      }
    }
  });

  return (
    <div className="notify" id="notify">
      <div className="notify-container">
        {text}
        {ext ? <span id="ext-link">{ext}</span> : <></>}
      </div>
    </div>
  )
}
export default NotificationBar;