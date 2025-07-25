import React, { useEffect, useRef } from "react";
import "./Home.css";
import HomeFooter from "../../components/home/homeFooter/HomeFooter";
import Banner from "../../components/home/banner/Banner";
import HeroSection from "../../components/home/heroSection/HeroSection";

export const Home = () => {
    const featuresRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!featuresRef.current) return;

            const scrolled = window.pageYOffset;
            const parallaxElements = featuresRef.current.querySelectorAll(
                "[data-parallax-speed]"
            );

            parallaxElements.forEach((element) => {
                const speed = element.getAttribute("data-parallax-speed");
                const yPos = -(scrolled * speed * 0.1);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main data-scroll-container>
            <HeroSection />
            <Banner />

            <div className="home-mid-section">
                <div className="mid-sec-header">
                    <div className="mid-sec-header-main">
                        <h1>
                            Nature + Science = <br /> Hyphen
                        </h1>
                    </div>
                    <div className="mid-mid-sec-header-bottom">
                        <div className="mid-sec-header-text">
                            <p>
                                Unreservedly honest products that truly work, be
                                kind to skin and the planet no exceptions!
                            </p>
                        </div>
                        <div className="mid-sec-bottom-skincare">
                            <h1>skincare</h1>
                        </div>
                    </div>
                </div>
                <div className="features-section" ref={featuresRef}>
                    <svg width="0" height="0" style={{ position: "absolute" }}>
                        <defs>
                            <clipPath
                                id="ellipse-clip"
                                clipPathUnits="objectBoundingBox"
                            >
                                <ellipse
                                    cx="0.5"
                                    cy="0.5"
                                    rx="0.45"
                                    ry="0.35"
                                    transform="rotate(15 0.5 0.5)"
                                />
                            </clipPath>
                        </defs>
                    </svg>

                    <div className="features-container">
                        {/* Floating Cards with Different Speeds */}
                        <div
                            className="feature-card top-left parallax-scroll"
                            data-parallax-speed="3"
                        >
                            <div className="feature-icon">
                                <img
                                    src="https://truekindskincare.com/icon-radical-transparency.svg"
                                    alt=""
                                />
                            </div>
                            <h3>
                                <span className="title-line-1">Radical</span>
                                <span className="title-line-2">
                                    Transparency
                                </span>
                            </h3>
                            <p>
                                No black boxes, nothing to hide, we disclose our
                                full formulas, so you will never have to guess
                                what's in it and how much.
                            </p>
                        </div>

                        <div
                            className="feature-card left parallax-scroll"
                            data-parallax-speed="2"
                        >
                            <div className="feature-icon">
                                <img
                                    src="https://truekindskincare.com/icon-clean-beyond-reproach.svg"
                                    alt=""
                                />
                            </div>
                            <h3>
                                <span className="title-line-1">
                                    Clean, Beyond
                                </span>
                                <span className="title-line-2">Reproach</span>
                            </h3>
                            <p>
                                Truly clean with only verified ingredients; and
                                free from over 1500 questionable ingredients.
                                Because what you put on your skin matters.
                            </p>
                        </div>

                        {/* Central Image - Keep as is */}
                        <div
                            className="central-image-wrapper parallax-scroll"
                            data-parallax-speed="-1"
                        >
                            <div className="tilted-background"></div>
                            <div className="central-image">
                                <img
                                    src="https://media.fashionnetwork.com/cdn-cgi/image/fit=contain,width=1000,height=1000,format=auto/m/bc99/c6f0/a052/fcb8/2458/31e9/a97e/e57a/b076/be3f/be3f.jpg"
                                    alt="Skincare model"
                                />
                            </div>
                            <div className="image-decoration">
                                <div
                                    className="leaf-decoration parallax-scroll"
                                    data-parallax-speed="5"
                                >
                                    <img
                                        src="https://truekindskincare.com/leaf.png"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="abstract-shape orange parallax-scroll"
                                    data-parallax-speed="4"
                                >
                                    <img
                                        src="https://truekindskincare.com/empress.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className="feature-card right parallax-scroll"
                            data-parallax-speed="4"
                        >
                            <div className="feature-icon">
                                <img
                                    src="https://truekindskincare.com/icon-conscious-responsible.svg"
                                    alt="conscious"
                                />
                            </div>
                            <h3>
                                <span className="title-line-1">
                                    Conscious &
                                </span>
                                <span className="title-line-2">
                                    Responsible
                                </span>
                            </h3>
                            <p>
                                Peta Certified Vegan and Cruelty Free. Our
                                products are always housed in responsible
                                packaging and made sustainably.
                            </p>
                        </div>

                        <div
                            className="feature-card bottom-right parallax-scroll"
                            data-parallax-speed="3"
                        >
                            <div className="feature-icon">
                                <img
                                    src="https://truekindskincare.com/icon-potent-multi-tasking.svg"
                                    alt=""
                                />
                            </div>
                            <h3>
                                <span className="title-line-1">Potent &</span>
                                <span className="title-line-2">
                                    Multi Tasking
                                </span>
                            </h3>
                            <p>
                                Our formulas are chock-a-block with actives,
                                anti oxidants, skin restoring agents backed by
                                dermal science that aim to deliver real results.
                            </p>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>

            <HomeFooter />
        </main>
    );
};

export default Home;
