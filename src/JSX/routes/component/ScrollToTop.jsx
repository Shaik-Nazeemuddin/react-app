// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function ScrollToTop() {
//     const { pathname } = useLocation();

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [pathname]);

//     return null;
// }
//⬆️
// export default ScrollToTop;


import { useState, useEffect } from 'react';
import { ArrowUpToLine } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down past 300px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {isVisible && (
        <button 
          onClick={scrollToTop} 
          className='scroll-to-top-button'
        >
        <ArrowUpToLine size={32} />
        </button>
      )}
    </div>
  );
}
