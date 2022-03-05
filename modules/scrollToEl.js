import { useEffect } from "react";
import { useRouter } from "next/router";

const scrollToEl = (el,t) => {
  // const router = useRouter();
  // const { pathname } = router.pathname;
  let rootEl;
  let getEl;
  useEffect(() => {
    rootEl = document.getElementById('layout');
    getEl = document.getElementById(el);
    setTimeout(() => {
      getEl
      ? getEl.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
      ? el === null : null
      : rootEl.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})},t?t:1);
    })
  }

export default scrollToEl;