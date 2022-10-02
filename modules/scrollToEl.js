import { useEffect } from "react";

const scrollToEl = (el,t) => {
  let getEl;
  t = t ? t : 500;
  useEffect(() => {
    getEl = document.getElementById(el);
    if(getEl) {
      setTimeout(() => { getEl.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" }) }, t)
    }
  });
}
export default scrollToEl;