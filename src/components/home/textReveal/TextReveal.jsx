import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const TextReveal = ({ texts, isActive, wordStyles = {} }) => {
    const textRefs = useRef([]);
    const containerRefs = useRef([]);

    useEffect(() => {
        if (isActive) {
            const tl = gsap.timeline();

            texts.forEach((text, index) => {
                // Animate each text container
                tl.fromTo(
                    textRefs.current[index],
                    {
                        y: "100%", // Start from completely below the container
                        opacity: 1,
                    },
                    {
                        y: "0%", // Move to original position
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        delay: index * 0.2,
                    }
                );
            });
        }
    }, [isActive, texts]);

    const renderStyledText = (text, textIndex) => {
        const words = text.split(" ");

        return words.map((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[^a-z]/gi, "");
            const styleClass = wordStyles[cleanWord];
            const uniqueKey = `${textIndex}-${index}`;

            if (styleClass) {
                return (
                    <span
                        key={uniqueKey}
                        className={styleClass}
                        style={{ display: "inline-block" }}
                    >
                        {word}
                        {index < words.length - 1 ? " " : ""}
                    </span>
                );
            } else {
                return (
                    <span key={uniqueKey} style={{ display: "inline-block" }}>
                        {word}
                        {index < words.length - 1 ? " " : ""}
                    </span>
                );
            }
        });
    };

    return (
        <div className="text-reveal-container">
            {texts.map((text, index) => (
                <div
                    key={index}
                    className="text-reveal-wrapper"
                    ref={(el) => (containerRefs.current[index] = el)}
                >
                    <h1
                        ref={(el) => (textRefs.current[index] = el)}
                        className="reveal-text"
                    >
                        {renderStyledText(text, index)}
                    </h1>
                </div>
            ))}
        </div>
    );
};

export default TextReveal;
