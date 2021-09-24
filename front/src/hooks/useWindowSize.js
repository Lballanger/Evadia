import { useEffect, useState } from "react";

export default function useWindowSize() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            setWidth(windowWidth);
            setHeight(windowHeight);
            setIsMobile(windowWidth < 768);
            setIsTablet(windowWidth >= 768 && windowWidth < 1024);
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