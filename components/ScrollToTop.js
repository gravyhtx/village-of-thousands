import { useEffect } from "react";
import { useRouter } from "next/router";

const ScrollToTop = () => {
  const router = useRouter();
  const { pathname } = router.pathname;
  useEffect(() => {
    const checkId = window.location.hash ? window.location.hash.substring(1) : "";
    const qId = Number(checkId-1);
    const rootEl = document.getElementById('layout');
    const scrollPosition = () => {
      checkId
      ? ('scrollToEl-'+qId).scrollIntoView({behavior: "smooth", block: "start"})
      : rootEl.scrollIntoView({behavior: "smooth", block: "start"});
    }
    setTimeout(() => {
      scrollPosition()},200);
  }, [pathname]);

  return null;
};

export default ScrollToTop;