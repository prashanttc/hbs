import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Gets the current route path

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, [pathname]); // When the pathname changes, trigger scroll

  return null; // This component doesn't render anything
};

export default ScrollToTop;
