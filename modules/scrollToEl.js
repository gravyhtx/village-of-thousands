import { useEffect } from "react";

const scrollToEl = (el,t) => {
  let rootEl;
  let getEl;
  useEffect(() => {
    getEl = document.getElementById(el);
    rootEl = document.getElementById('layout');
    if(getEl) {
      setTimeout(() => {
        // getEl ?
        getEl.scrollIntoView({behavior: "smooth", block: "start", inline: "center"})
        // : rootEl.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      }, 500)
    }
  });
}
export default scrollToEl;