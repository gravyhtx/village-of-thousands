import { useEffect } from "react";

const scrollToEl = (el,t) => {
  let getEl;
  let rootEl;
  t = t ? t : 500;
  useEffect(() => {
    getEl = document.getElementById(el);
    rootEl = document.getElementById('layout');
    if(getEl) {
      setTimeout(() => {
        // getEl ?
        getEl.scrollIntoView({behavior: "smooth", block: "start", inline: "center"})
        // : rootEl.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }, t)
    }
  });
}
export default scrollToEl;