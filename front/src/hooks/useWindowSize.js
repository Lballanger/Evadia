import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 769 && window.innerWidth < 1024
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      setWidth(windowWidth);
      setHeight(windowHeight);
      setIsMobile(windowWidth < 768);
      setIsTablet(windowWidth >= 769 && windowWidth < 1024);
      setIsDesktop(windowWidth >= 1024);
      setIsLandscape(windowWidth > windowHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { width, height, isMobile, isTablet, isDesktop, isLandscape };
}
