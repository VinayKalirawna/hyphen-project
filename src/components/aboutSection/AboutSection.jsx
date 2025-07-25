import { useState } from "react";
import "./AboutSection.css";

const AboutSection = () => {
    const handleSocialClick = (platform) => {
        const urls = {
            facebook: "https://www.facebook.com/letshyphen",
            instagram: "https://www.instagram.com/letshyphen/",
            twitter: "https://x.com/letshyphen",
        };

        // Open in new tab
        window.open(urls[platform], "_blank", "noopener,noreferrer");
    };

    const images = [
        "https://letshyphen.com/cdn/shop/files/3.webp?v=1699055090",
        "https://letshyphen.com/cdn/shop/files/Lighten_Dark_Lips.jpg?v=1698901366",
        "https://letshyphen.com/cdn/shop/files/Acne-Concern_430x420-px.jpg?v=1715056912",
        "https://letshyphen.com/cdn/shop/files/Moisturizing_Cleanser.jpg?v=1707969633",
        "https://letshyphen.com/cdn/shop/files/2.webp?v=1699054957",
        "https://letshyphen.com/cdn/shop/files/1.webp?v=1699055037",
        "https://letshyphen.com/cdn/shop/files/Hydrated_Moisturized_Lips.jpg?v=1698901323",
        "https://letshyphen.com/cdn/shop/files/4.webp?v=1699055276",
    ];
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(images.length / 4);

    const prev = () => setPage((p) => Math.max(p - 1, 0));
    const next = () => setPage((p) => Math.min(p + 1, totalPages - 1));

    return (
        <>
            <div className="footer-header">
                <h2>GLOW WITH THE FLOW</h2>
                <h4>WITH HYPHEN</h4>
            </div>
            <div className="carousel-container">
                <button
                    className="arrow left"
                    onClick={prev}
                    disabled={page === 0}
                >
                    ‹
                </button>

                <div className="viewport">
                    <div
                        className="track"
                        style={{ transform: `translateX(-${page * 100}%)` }}
                    >
                        {images.map((src, i) => (
                            <div className="slide" key={i}>
                                <img src={src} alt={`Slide ${i + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    className="arrow right"
                    onClick={next}
                    disabled={page === totalPages - 1}
                >
                    ›
                </button>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-top">
                        <div className="footer-feature">
                            <div className="feature-icon">
                                {" "}
                                <img
                                    src="https://letshyphen.com/cdn/shop/files/Clean.svg?v=1690348953"
                                    alt="clinically-tested"
                                />
                            </div>
                            <div className="feature-text">
                                Clinically Tested
                            </div>
                        </div>
                        <div className="footer-feature">
                            <div className="feature-icon">
                                <img
                                    src="https://letshyphen.com/cdn/shop/files/Peta.svg?v=1690349031"
                                    alt="peta-certified"
                                />
                            </div>
                            <div className="feature-text">Peta Certified</div>
                        </div>
                        <div className="footer-feature">
                            <div className="feature-icon">
                                <img
                                    src="https://letshyphen.com/cdn/shop/files/Vegan.svg?v=1690349080"
                                    alt="vegan"
                                />
                            </div>
                            <div className="feature-text">100% Vegan</div>
                        </div>
                    </div>

                    <div className="footer-main">
                        <div className="footer-column">
                            <h3>Company</h3>
                            <ul>
                                <li>
                                    <a href="#" target="_blank">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://api.whatsapp.com/send/?phone=919867556639&text&type=phone_number&app_absent=0"
                                        target="_blank"
                                    >
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://letshyphen.com/pages/privacy-policy"
                                        target="_blank"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://letshyphen.com/pages/terms-conditions"
                                        target="_blank"
                                    >
                                        Terms and Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3>Quick Links</h3>
                            <ul>
                                <li>
                                    <a href="#" target="_blank">
                                        Track Order
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://letshyphen.com/pages/feedback"
                                        target="_blank"
                                    >
                                        Feedback
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://letshyphen.com/pages/return-and-refund-policy"
                                        target="_blank"
                                    >
                                        Return/Refund policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://letshyphen.com/pages/faq"
                                        target="_blank"
                                    >
                                        FAQ
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="mailto:care@letshyphen.com"
                                        target="_blank"
                                    >
                                        Support: care@letshyphen.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://api.whatsapp.com/send/?phone=919867556639&text&type=phone_number&app_absent=0"
                                        target="_blank"
                                    >
                                        WhatsApp: 9867556639
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-column social-section">
                            <h3>Follow Us On</h3>
                            <div className="social-icons">
                                <div
                                    className="social-icon"
                                    onClick={() =>
                                        handleSocialClick("facebook")
                                    }
                                >
                                    <img
                                        src="https://ik.imagekit.io/vinaykalirawna/icons8-facebook-60.png?updatedAt=1753425429292"
                                        alt="facebook"
                                    />
                                </div>
                                <div
                                    className="social-icon"
                                    onClick={() =>
                                        handleSocialClick("instagram")
                                    }
                                >
                                    <img
                                        src="https://ik.imagekit.io/vinaykalirawna/icons8-instagram-60.png?updatedAt=1753425634316"
                                        alt="instagram"
                                    />
                                </div>
                                <div
                                    className="social-icon"
                                    onClick={() => handleSocialClick("twitter")}
                                >
                                    <img
                                        src="https://ik.imagekit.io/vinaykalirawna/icons8-twitter-60.png?updatedAt=1753425712813"
                                        alt="twitter"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© Copyright 2025 Kreative Beauty Private Limited.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default AboutSection;
