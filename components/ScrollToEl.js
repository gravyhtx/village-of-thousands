const ScrollToEl = (el,t) => {
    const rootEl = document.getElementById('root');
    const getEl = document.getElementById(el);
    setTimeout(() => {getEl ? getEl.scrollIntoView({behavior: "smooth"}) : rootEl.scrollIntoView({behavior: "smooth"})},t?t:1);
}

export default ScrollToEl;