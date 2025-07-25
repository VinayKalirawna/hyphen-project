import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Banner.css";

const Banner = () => {
    const marqueeRef = useRef(null);
    const imageContainerRef = useRef(null);

    useEffect(() => {
        const marqueeElement = marqueeRef.current;
        const imageContainer = imageContainerRef.current;

        if (marqueeElement && imageContainer) {
            // Create the animation timeline
            const tl = gsap.timeline({ repeat: -1 });

            // Get the width of one set of logos
            const singleSetWidth = imageContainer.scrollWidth / 2;

            tl.fromTo(
                imageContainer,
                { x: 0 },
                {
                    x: -singleSetWidth,
                    duration: 30,
                    ease: "none",
                }
            );
        }
    }, []);

    const logoImages = [
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_5.02.21_PM-removebg-preview.png?updatedAt=1752752309975",
            alt: "ET Now",
            name: "ET Now",
        },
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_5.02.47_PM-removebg-preview.png?updatedAt=1752752310062",
            alt: "Harper's Bazaar",
            name: "Harper's Bazaar",
        },
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_5.03.21_PM-removebg-preview.png?updatedAt=1752752310024",
            alt: "Grazia",
            name: "Grazia",
        },
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_5.04.16_PM-removebg-preview.png?updatedAt=1752752309668",
            alt: "Femina",
            name: "Femina",
        },
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_5.05.07_PM-removebg-preview.png?updatedAt=1752752310060",
            alt: "India Today",
            name: "India Today",
        },
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_4.59.45_PM-removebg-preview.png?updatedAt=1752751820380",
            alt: "CNBC",
            name: "CNBC",
        },
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_5.05.56_PM-removebg-preview.png?updatedAt=1752752309989",
            alt: "Forbes",
            name: "Forbes",
        },
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_5.06.55_PM-removebg-preview.png?updatedAt=1752752309965",
            alt: "Mint Lounge",
            name: "Mint Lounge",
        },
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_5.06.27_PM-removebg-preview.png?updatedAt=1752752309994",
            alt: "Vogue",
            name: "Vogue",
        },
        {
            src: "https://ik.imagekit.io/vinaykalirawna/Screenshot_2025-07-17_at_5.07.39_PM-removebg-preview.png?updatedAt=1752752309664",
            alt: "Lifestyle Asia",
            name: "Lifestyle Asia",
        },
    ];

    return (
        <div className="marquee-banner">
            <div ref={marqueeRef} className="marquee-container">
                <div ref={imageContainerRef} className="marquee-images">
                    {/* Duplicate content for seamless loop */}
                    {[...logoImages, ...logoImages].map((logo, index) => (
                        <div key={index} className="marquee-logo-item">
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="marquee-logo"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Banner;
