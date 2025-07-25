import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CurtainAnimation = ({ isVideoLoaded, onAnimationComplete }) => {
    const leftCurtainRef = useRef(null);
    const rightCurtainRef = useRef(null);

    useEffect(() => {
        if (isVideoLoaded) {
            const tl = gsap.timeline({
                onComplete: onAnimationComplete,
            });

            tl.to([leftCurtainRef.current, rightCurtainRef.current], {
                duration: 4,
                scaleX: 0,
                transformOrigin: "center center",
                ease: "power2.inOut",
                delay: 1,
            });
        }
    }, [isVideoLoaded, onAnimationComplete]);

    return (
        <div className="curtain-container">
            <div ref={leftCurtainRef} className="curtain curtain-left"></div>
            <div ref={rightCurtainRef} className="curtain curtain-right"></div>
        </div>
    );
};

export default CurtainAnimation;
