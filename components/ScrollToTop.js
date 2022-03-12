import { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToTop = () => {
  const router = useRouter();
  const { pathname } = router.pathname;

  useEffect(() => {
    const checkId = window.location.hash ? window.location.hash.substring(1) : "";
    const qId = Number(checkId-1);
    const rootEl = document.getElementById('layout');
    const scrollEl = document.getElementById('scrollToEl-'+qId);
    const scrollPosition = () => {
    scrollEl
    ? scrollEl.scrollIntoView({behavior: "smooth", block: "start"})
    : rootEl.scrollIntoView({behavior: "smooth", block: "start"});
  }
  setTimeout(() => {
    scrollPosition()},350);
  }, [pathname]);
  return null;
};

export default ScrollToTop;