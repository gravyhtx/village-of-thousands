import { useState, useEffect } from 'react';

const BackToTop = () => {

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }
      
    function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    
    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return windowDimensions;
    }

    console.log(useWindowDimensions());

    const rootElement = document.documentElement;
    var scrollToTopBtn = document.getElementById("back-to-top");
    const scrollToTop = () => {
        rootElement.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    const handleScroll = () => {
        var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
        // if ((rootElement.scrollTop / scrollTotal ) > 0.80 ) {
        //     // Show button
        //     scrollToTopBtn.classList.add("back-to-top top-show");
        // } else {
        //     // Hide button
        //     scrollToTopBtn.classList.remove("back-to-top top-hide");
        // }
        const el = document.getElementById("back-to-top");
        var y = window.scrollY;
        // if (y >= 500) {
        //     el.className = "back-to-top top-show"
        // } else {
        //     el.className = "back-to-top top-hide"
        // }
        console.log(scrollTotal)
    };
    window.addEventListener('scroll', handleScroll());
    
    return (
    <div onClick={scrollToTop} readonly className="back-to-top top-hide" id="back-to-top" data-position="bottom">
    {/* <div readonly className="back-to-top top-show" data-position="bottom"> */}
        BACK TO TOP
    </div>
    )
}

export default BackToTop;