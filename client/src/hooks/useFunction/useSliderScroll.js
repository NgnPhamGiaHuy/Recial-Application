"use client"

import { useState, useRef, useEffect } from "react";

const useSliderScroll = ({ storyProps } = {}) => {
    const itemRefs = useRef([]);
    const containerRef = useRef(null);

    const [isInitialized, setIsInitialized] = useState(false);
    const [scrollLeftVisible, setScrollLeftVisible] = useState(false);
    const [scrollRightVisible, setScrollRightVisible] = useState(true);

    useEffect(() => {
        const container = containerRef.current;

        if (container && isInitialized) {
            const isLeftVisible = container.scrollLeft > 0;
            const isRightVisible = container.scrollLeft < (container.scrollWidth - container.clientWidth);

            setScrollLeftVisible(isLeftVisible);
            setScrollRightVisible(isRightVisible);
        }
    }, [containerRef, isInitialized]);

    useEffect(() => {
        if (storyProps && !isInitialized) {
            setIsInitialized(true);
        }
    }, [storyProps, isInitialized]);

    const handleScroll = (direction) => {
        const container = containerRef.current;

        if (container) {
            const itemWidth = itemRefs.current[0].offsetWidth;
            const scrollAmount = direction === "left" ? - itemWidth * 2 : itemWidth * 2;

            container.scrollBy({
                left: scrollAmount,
                behavior: "smooth"
            });

            const isLeftVisible = container.scrollLeft > 0;
            const isRightVisible = container.scrollLeft < (container.scrollWidth - container.clientWidth);

            setScrollLeftVisible(isLeftVisible);
            setScrollRightVisible(isRightVisible);
        }
    };

    return { itemRefs, containerRef, scrollLeftVisible, scrollRightVisible, handleScroll };
}

export default useSliderScroll;