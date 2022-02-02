import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollToEl from "./ScrollToEl";

export default function ScrollToTop() {

  const checkId = window.location.hash ? window.location.hash.substring(1) : "";
  const qId = Number(checkId-1);
  const { pathname } = useLocation();
  useEffect(() => {
    checkId ? ScrollToEl(('scrollToEl-'+qId),200) : ScrollToEl('root',200);
  }, [pathname]);

  return null;
  
}