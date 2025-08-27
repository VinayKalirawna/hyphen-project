import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "./Navbar.css";
import { useProducts } from "../../../context/ProductContext";

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { setSelectedCategory, setSelectedConcern } = useProducts();
    const [isScrolledPastFirstPage, setIsScrolledPastFirstPage] =
        useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const lastScrollY = useRef(0);
    const controls = useAnimation();
    const dropdownRef = useRef(null);

    // New: Helper function to close the menu
    const closeMenu = () => {
        setIsMenuOpen(false);
        setActiveDropdown(null);
    };

    // New: Effect to prevent body scroll when the mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    const shopCategories = [
        {
            section: "YOUR ESSENTIALS",
            items: [
                "SUNSCREEN",
                "FACE SERUM",
                "LIP BALMS",
                "FACE MASK",
                "FACE CLEANSER",
                "FACE MOISTURISER",
                "DRY & CALMING RANGE",
            ],
        },
        {
            section: "ROUTINES",
            items: [
                "NO MORE OILY-SKIN BUNDLE",
                "NIGHT CARE ROUTINE FOR OILY SKIN",
                "NIGHT CARE ROUTINE FOR DRY SKIN",
                "JUICY LIPS OR NOTHING KIT",
                "JUICY LIPS TRIO",
            ],
        },
    ];

    const shopByConcernCategories = [
        "PIGMENTATION RANGE",
        "ACNE CONTROL",
        "MOISTURIZED NOURISHED SKIN",
        "GLOWY & BRIGHT SKIN",
        "SUN PROTECTION",
        "HYDRATED & MOISTURIZED LIPS",
        "LIGHTEN DARK LIPS",
        "MOISTURIZING CLEANSER",
    ];

    const navVariants = {
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 160,
                damping: 6,
                mass: 0.2,
            },
        },
        hidden: {
            y: "-100%",
            opacity: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 26,
                mass: 0.8,
            },
        },
    };

    useEffect(() => {
        let rafId;

        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            const firstPageHeight = window.innerHeight;

            setIsScrolledPastFirstPage(currentScrollY > firstPageHeight);

            if (currentScrollY > firstPageHeight) {
                if (
                    currentScrollY > lastScrollY.current &&
                    currentScrollY > firstPageHeight + 80
                ) {
                    controls.start("hidden");
                } else if (currentScrollY < lastScrollY.current) {
                    controls.start("visible");
                }
            } else {
                controls.start("visible");
            }

            lastScrollY.current = currentScrollY;
        };

        const handleScroll = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(controlNavbar);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [controls]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setActiveDropdown(null);
            }
        };

        if (activeDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [activeDropdown]);

    const handleDropdownClick = (dropdown, event) => {
        event.preventDefault();
        event.stopPropagation();
        setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    };

    // Updated to close menu on navigation
    const handleCategoryClick = (category) => {
        navigate(`/category/${encodeURIComponent(category)}`);
        closeMenu();
    };

    // Updated to close menu on navigation
    const handleConcernClick = (concern) => {
        navigate(`/concern/${encodeURIComponent(concern)}`);
        closeMenu();
    };

    return (
        <motion.div
            className={`nav-container ${
                isScrolledPastFirstPage ? "scrolled-past-first" : ""
            }`}
            variants={navVariants}
            initial="visible"
            animate={controls}
        >
            <div className="nav-logo">
                <NavLink to="/" onClick={closeMenu}>
                    <img
                        src="https://res.cloudinary.com/dphhbdytb/image/upload/v1752853728/Screenshot_2025-07-18_at_9.17.06_PM_j2vix7.png"
                        alt="Hyphen Logo"
                    />
                </NavLink>
            </div>

            <div
                className="mobile-menu-toggle"
                onClick={() => setIsMenuOpen((o) => !o)}
            >
                <span className={isMenuOpen ? "open" : ""}></span>
                <span className={isMenuOpen ? "open" : ""}></span>
                <span className={isMenuOpen ? "open" : ""}></span>
            </div>

            <div className={`desktop-nav ${isMenuOpen ? "open" : ""}`}>
                <div className="nav-shop-concern" ref={dropdownRef}>
                    <div className="nav-dropdown-wrapper">
                        <a
                            href="#"
                            onClick={(e) => handleDropdownClick("shop", e)}
                            className={
                                activeDropdown === "shop" ? "active" : ""
                            }
                        >
                            SHOP
                        </a>
                        {activeDropdown === "shop" && (
                            <div className="dropdown-menu shop-dropdown">
                                <div className="dropdown-content two-column">
                                    {shopCategories.map(
                                        (section, sectionIndex) => (
                                            <div
                                                key={sectionIndex}
                                                className="dropdown-column"
                                            >
                                                <div className="column-header">
                                                    {section.section}
                                                </div>
                                                {section.items.map(
                                                    (item, itemIndex) => (
                                                        <div
                                                            key={itemIndex}
                                                            className="dropdown-item"
                                                            onClick={() =>
                                                                handleCategoryClick(
                                                                    item
                                                                )
                                                            }
                                                        >
                                                            {item}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="dropdown-footer">
                                    <div
                                        className="view-all-link"
                                        onClick={() => {
                                            navigate("/products");
                                            closeMenu();
                                        }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="nav-dropdown-wrapper">
                        <a
                            href="#"
                            onClick={(e) => handleDropdownClick("concern", e)}
                            className={
                                activeDropdown === "concern" ? "active" : ""
                            }
                        >
                            SHOP BY CONCERN
                        </a>
                        {activeDropdown === "concern" && (
                            <div className="dropdown-menu concern-dropdown">
                                <div className="dropdown-content">
                                    {shopByConcernCategories.map(
                                        (category, index) => (
                                            <div
                                                key={index}
                                                className="dropdown-item"
                                                onClick={() =>
                                                    handleConcernClick(category)
                                                }
                                            >
                                                {category}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <NavLink
                        className="nav-about"
                        to="/about"
                        onClick={closeMenu}
                    >
                        ABOUT US
                    </NavLink>
                </div>

                <div className="nav-login-cart">
                    <div>
                        <NavLink to="/login" onClick={closeMenu}>
                            <img
                                src="https://ik.imagekit.io/vinaykalirawna/next.png?updatedAt=1752857560443"
                                alt="login-btn"
                            />
                        </NavLink>
                        <img
                            style={{ height: "50px" }}
                            className="vertical-bar"
                            src="https://ik.imagekit.io/vinaykalirawna/feature-removebg-preview.png?updatedAt=1753100181108"
                            alt="vertical-bar"
                        />
                        <NavLink to="/cart" onClick={closeMenu}>
                            <img
                                src="https://ik.imagekit.io/vinaykalirawna/add-button.png?updatedAt=1752857530618"
                                alt="cart-btn"
                            />
                        </NavLink>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Navbar;
