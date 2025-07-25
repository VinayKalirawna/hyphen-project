import React, { useState, useEffect, useRef } from "react";
import VideoBackground from "../videoBackground/VideoBackground";
import CurtainAnimation from "../curtainAnimation/CurtainAnimation";
import TextReveal from "../textReveal/TextReveal";
import "./HeroSection.css";
import { NavLink } from "react-router-dom";
import gsap from "gsap";

const HeroSection = () => {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isAnimationDone, setIsAnimationDone] = useState(false);
    const exploreProductRef = useRef(null);

    useEffect(() => {
        const safetyTimer = setTimeout(() => {
            console.log("Safety timer - forcing animation completion");
            setIsAnimationDone(true);
        }, 8000);

        return () => clearTimeout(safetyTimer);
    }, []);

    useEffect(() => {
        if (!isAnimationDone) {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100vh";
        } else {
            document.body.style.overflow = "";
            document.body.style.height = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.height = "";
        };
    }, [isAnimationDone]);

    // Animate explore product when animation is done
    useEffect(() => {
        if (isAnimationDone && exploreProductRef.current) {
            gsap.fromTo(
                exploreProductRef.current,
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.8,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.1,
                }
            );
        }
    }, [isAnimationDone]);

    const handleAnimationComplete = () => {
        setIsAnimationDone(true);
    };

    const revealTexts = [
        "Skincare Hyphenated",
        "Unleash your skin Potential",
        "Why Not have it All Hypen it",
    ];
    const textStyles = {
        skincare: "skincare-font",
        skin: "skin-font",
    };

    return (
        <>
            {/* Full-screen animation overlay - covers everything */}
            {!isAnimationDone && (
                <div className="animation-overlay">
                    <VideoBackground
                        onVideoLoad={() => setIsVideoLoaded(true)}
                    />
                    <CurtainAnimation
                        isVideoLoaded={isVideoLoaded}
                        onAnimationComplete={handleAnimationComplete}
                    />
                </div>
            )}

            {/* Main hero content - only shows after animation */}
            <section className="hero-container">
                <VideoBackground onVideoLoad={() => setIsVideoLoaded(true)} />

                {isAnimationDone && (
                    <TextReveal
                        texts={revealTexts}
                        isActive={isAnimationDone}
                        wordStyles={textStyles}
                    />
                )}

                {isAnimationDone && (
                    <div
                        ref={exploreProductRef}
                        className="explore-all-product"
                        style={{ opacity: 0 }}
                    >
                        <NavLink to="/products">
                            EXPLORE All PRODUCT
                            <span className="arrow">
                                <img
                                    className="arrow-first"
                                    src="https://ik.imagekit.io/vinaykalirawna/icons8-right-arrow-60.png?updatedAt=1752908003140"
                                    alt=""
                                />
                                <img
                                    className="arrow-second"
                                    src="https://ik.imagekit.io/vinaykalirawna/icons8-right-arrow-60.png?updatedAt=1752908003140"
                                    alt=""
                                />
                            </span>
                        </NavLink>
                    </div>
                )}
            </section>
        </>
    );
};

export default HeroSection;
