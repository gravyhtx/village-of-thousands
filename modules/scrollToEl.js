import { useEffect } from "react";
import { useRouter } from "next/router";

const scrollToEl = (el,t) => {
  const router = useRouter();
  const { pathname } = router.pathname;
  useEffect(() => {
    const rootEl = document.getElementById('layout');
    const getEl = document.getElementById(el);
    setTimeout(() => {
      getEl
      ? getEl.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
      ? el === null : null
      : rootEl.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})},t?t:1);
    })
}

export default scrollToEl;