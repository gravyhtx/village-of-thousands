import React, { useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/router";

const NotificationBar = ({ text, link, ext, extLink }) =>  {
  const router = useRouter();

  useEffect(() => {
    if(!document.getElementById('ext-link').matches(':hover')) {
      document.getElementById('notify').addEventListener('click', () => {
        router.push(link);
      });
    }
    document.getElementById('ext-link').addEventListener('click', () => {
      router.push(extLink);
    });
  });

  return (
    <div className="notify" id="notify">
      {text}
      {ext ? <span id="ext-link">{ext}</span> : <></>}
    </div>
  )
}
export default NotificationBar;