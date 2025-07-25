import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const aboutRef = useRef(null);
    const textRefs = useRef([]);
    const imageRefs = useRef([]);
    const founderCardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Smooth text curtain animations - refined
            textRefs.current.forEach((text, index) => {
                if (text) {
                    gsap.fromTo(
                        text,
                        {
                            y: 60,
                            opacity: 0,
                            clipPath: "inset(100% 0 0 0)",
                        },
                        {
                            y: 0,
                            opacity: 1,
                            clipPath: "inset(0% 0 0 0)",
                            duration: 1.5,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: text,
                                start: "top 85%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse",
                            },
                            delay: index * 0.1,
                        }
                    );
                }
            });

            // Smooth image animations with parallax floating
            imageRefs.current.forEach((image, index) => {
                if (image) {
                    // Initial appearance
                    gsap.fromTo(
                        image,
                        { y: 80, opacity: 0, scale: 0.95 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: image,
                                start: "top 80%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );

                    // Parallax effect during scroll
                    gsap.to(image, {
                        yPercent: -20 * (index + 1),
                        ease: "none",
                        scrollTrigger: {
                            trigger: image,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    });
                }
            });

            // Founder cards with parallax
            founderCardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        { y: 100, opacity: 0, rotationX: 15 },
                        {
                            y: 0,
                            opacity: 1,
                            rotationX: 0,
                            duration: 1.5,
                            ease: "back.out(1.2)",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                end: "bottom 20%",
                                toggleActions: "play none none reverse",
                            },
                            delay: index * 0.08,
                        }
                    );

                    // Parallax scrolling effect
                    const speed = index % 2 === 0 ? 2 : 3;
                    gsap.to(card, {
                        yPercent: -10 * speed,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.5,
                        },
                    });
                }
            });
        }, aboutRef);

        return () => ctx.revert();
    }, []);

    const addToTextRefs = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    const addToImageRefs = (el) => {
        if (el && !imageRefs.current.includes(el)) {
            imageRefs.current.push(el);
        }
    };

    const addToFounderRefs = (el) => {
        if (el && !founderCardsRef.current.includes(el)) {
            founderCardsRef.current.push(el);
        }
    };

    return (
        <div ref={aboutRef} className="about-container">
            <div className="about-sec-first">
                <div className="about-text-content">
                    <h1 ref={addToTextRefs} className="curtain-text">
                        OUR STORY
                    </h1>
                    <p ref={addToTextRefs} className="curtain-text">
                        The journey of Hyphen began when we discovered the
                        challenges individuals face with the ever-growing
                        options for addressing any skin concern, each helmed
                        with different ingredients. Here, we hyphenate multiple
                        ingredients to craft result-driven solutions catering to
                        every Indian's skin concern. Nature's power and the
                        potency of science come together in each bottle,
                        offering an array of benefits and a touch of magic that
                        elevates your skincare to a whole new level. Hyphen is
                        fueled by our passion for skincare and a vision to build
                        a brand that empowers you to HAVE IT ALL.
                    </p>
                </div>
                <div className="about-first-img">
                    <img
                        ref={addToImageRefs}
                        className="parallax-image"
                        src="https://letshyphen.com/cdn/shop/files/Main-Banner-Desktop-1_80935a47-07c2-406d-a4cd-9c62fcc864c2.jpg?v=1690433250"
                        alt=""
                    />
                </div>
            </div>

            <div className="about-sec-second">
                <div className="about-sec-img">
                    <img
                        ref={addToImageRefs}
                        className="parallax-image"
                        src="https://cuttingshots.com/wp-content/uploads/kriti-sanon-feels-films-with-female-protagists-seen-as-smaller-productions.jpg"
                        alt=""
                    />
                </div>
                <div className="about-sec-text">
                    <h3 ref={addToTextRefs} className="curtain-text">
                        Co-Founder's Note:
                    </h3>
                    <p ref={addToTextRefs} className="curtain-text">
                        "HYPHEN originated from a pure passion for skincare and
                        a curious, driven mind that always wanted more in life!
                        Each product blends a multitude of amazing ingredients
                        from both nature and science to create a power-packed
                        solution for every concern. I hope you enjoy the
                        products as much as we enjoyed creating them for you!" ~
                        Kriti Sanon
                    </p>
                </div>
            </div>

            <div className="about-sec-three">
                <div className="founder">
                    <h2 ref={addToTextRefs} className="curtain-text">
                        FOUNDERS
                    </h2>
                    <div className="founder-images">
                        <div
                            ref={addToFounderRefs}
                            className="founder-img parallax-card"
                        >
                            <img
                                src="https://letshyphen.com/cdn/shop/files/kriti-sanon.jpg?v=1690295864"
                                alt=""
                            />
                            <h4>KRITI SANON</h4>
                            <p>Co-Founder & Chief Customer Officer</p>
                        </div>
                        <div
                            ref={addToFounderRefs}
                            className="founder-img parallax-card"
                        >
                            <img
                                src="https://letshyphen.com/cdn/shop/files/tarun-sharma.jpg?v=1690295954"
                                alt=""
                            />
                            <h4>TARUN SHARMA</h4>
                            <p>Co-Founder & CEO</p>
                        </div>
                        <div
                            ref={addToFounderRefs}
                            className="founder-img parallax-card"
                        >
                            <img
                                src="https://letshyphen.com/cdn/shop/files/vaishali-gupta_4998026d-0abf-42dc-a08e-a3a3cd5761cc.jpg?v=1690377952"
                                alt=""
                            />
                            <h4>VAISHALI GUPTA</h4>
                            <p>Co-Founder & Chief Growth Officer</p>
                        </div>
                        <div
                            ref={addToFounderRefs}
                            className="founder-img parallax-card"
                        >
                            <img
                                src="https://letshyphen.com/cdn/shop/files/vikas-lachwani_1.jpg?v=1690379120"
                                alt=""
                            />
                            <h4>VIKAS LACHHWANI</h4>
                            <p>Co-Founder & Chief Innovation Officer</p>
                        </div>
                        <div
                            ref={addToFounderRefs}
                            className="founder-img parallax-card"
                        >
                            <img
                                src="https://letshyphen.com/cdn/shop/files/saurabh_1.jpg?v=1690379121"
                                alt=""
                            />
                            <h4>SAURABH SINGHAL</h4>
                            <p>Co-Founder & Chief Supply Officer</p>
                        </div>
                        <div
                            ref={addToFounderRefs}
                            className="founder-img parallax-card"
                        >
                            <img
                                src="https://letshyphen.com/cdn/shop/files/Mohit-jain_1.jpg?v=1690379120"
                                alt=""
                            />
                            <h4>MOHIT JAIN</h4>
                            <p>Co-Founder & Head of Finance</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-footer-sec">
                <div className="about-footer-sec-header">
                    <h2 ref={addToTextRefs} className="curtain-text">
                        THE HYPHENATED ESSENTIALS
                    </h2>
                </div>
                <div className="about-footer-bottom">
                    <div className="about-footer-image">
                        <img
                            ref={addToImageRefs}
                            className="parallax-image"
                            src="https://letshyphen.com/cdn/shop/files/hyphenated-essentials-desktop.jpg?v=1690378321"
                            alt=""
                        />
                    </div>
                    <div className="about-footer-text">
                        <p ref={addToTextRefs} className="curtain-text">
                            Streamline your daily skincare with our go-to
                            must-haves - Barrier Care Face Creams, Golden Hour
                            Glow Face Serum and All I Need Sunscreen SPF 50
                            PA++++. We have harnessed multiple ingredients and
                            created power-packed solutions for every kind of
                            skin concern. Combining the power of nature with the
                            potency of science, each product offers a multitude
                            of benefits and so much more, all bottled within.
                            Additionally, our commitment to Clean, Vegan, and
                            Sustainable values ensures a positive impact on both
                            your skin and the planet.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
