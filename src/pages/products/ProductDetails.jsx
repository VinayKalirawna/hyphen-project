import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useProducts } from "../../context/ProductContext";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { products, loading, addToCart } = useProducts();
    const [activeTab, setActiveTab] = useState("About");
    const [product, setProduct] = useState(null);
    const [activeSection, setActiveSection] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Modal state
    const [modalImage, setModalImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleDetailSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    const getAllImages = () => {
        const images = [];
        if (product.images?.image1) images.push(product.images.image1);
        if (product.images?.image2) images.push(product.images.image2);

        if (product.images?.image3) {
            Object.values(product.images.image3).forEach((img) => {
                if (typeof img === "string") images.push(img);
            });
        }

        return images;
    };

    // Modal functions
    const openModal = (imageSrc) => {
        setModalImage(imageSrc);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden"; // Prevent background scroll
    };

    const closeModal = () => {
        setModalImage(null);
        setIsModalOpen(false);
        document.body.style.overflow = "auto"; // Restore scroll
    };

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isModalOpen]);

    // Separate state for each Read More section
    const [expandedSections, setExpandedSections] = useState({
        whatItIs: false,
        whatItDoes: false,
        howItDoes: false,
    });

    // Find product when products are loaded or ID changes
    useEffect(() => {
        if (!loading && products.length > 0 && id) {
            const foundProduct = products.find((p) => p.id === parseInt(id));
            console.log("Found product:", foundProduct);
            setProduct(foundProduct);
        }
    }, [id, products, loading]);

    // Show loading while products are being fetched
    if (loading) {
        return (
            <div className="pd-loading">
                <div className="container">
                    <p>Loading product details...</p>
                </div>
            </div>
        );
    }

    // Show error if product not found after loading is complete
    if (!loading && !product) {
        return (
            <div className="pd-error">
                <div className="container">
                    <h2>Product Not Found</h2>
                    <p>Product ID: {id}</p>
                    <p>Available products: {products.length}</p>
                    <button onClick={() => navigate("/")} className="back-btn">
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // Don't render main content until we have a product
    if (!product) {
        return null;
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        console.log("Added to cart:", product.name);
    };

    // Function to get truncated description
    const getTruncatedDescription = (text, maxLength = 120) => {
        if (!text) return "";
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };

    // Function to toggle individual sections
    const toggleSection = (section) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div className="pd-page">
            <div className="container">
                {/* Hero Section */}
                <motion.div
                    className="pd-hero"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="images-col">
                        <img
                            src={product.images?.image1 || product.image}
                            alt={product.name}
                            className="pd-main-img"
                            onError={(e) => {
                                e.target.src =
                                    "https://via.placeholder.com/400x400?text=No+Image";
                            }}
                        />
                        {product.images?.image2 && (
                            <img
                                src={product.images.image2}
                                alt={product.name}
                                className="pd-thumb-img"
                            />
                        )}
                    </div>

                    <div className="info-col">
                        <h1 className="pd-name">{product.name}</h1>
                        <p className="pd-price">
                            ₹{product.price?.amount || product.price}
                        </p>
                        <p className="pd-short">
                            {product.shortDescription || product.description}
                        </p>
                        <div></div>
                        {/* Quantity Selector */}
                        <div className="pd-quantity">
                            <span className="quantity-label">Quantity:</span>
                            <div className="quantity-controls">
                                <button
                                    className="quantity-btn"
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    disabled={quantity <= 1}
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    className="quantity-display"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(
                                            Math.max(
                                                1,
                                                parseInt(e.target.value) || 1
                                            )
                                        )
                                    }
                                    min="1"
                                    max="10"
                                />
                                <button
                                    className="quantity-btn"
                                    onClick={() =>
                                        setQuantity(Math.min(10, quantity + 1))
                                    }
                                    disabled={quantity >= 10}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            className="pd-add-btn"
                            onClick={handleAddToCart}
                        >
                            Add to Cart <span className="pd-cart-icon">🛒</span>
                        </button>

                        <ul className="pd-highlights">
                            <li>
                                <img
                                    src="https://ik.imagekit.io/vinaykalirawna/icons8-30-degrees-50.png?updatedAt=1753348947817"
                                    alt="30-day"
                                />
                                30-Day Return
                            </li>
                            <li>
                                <img
                                    src="https://ik.imagekit.io/vinaykalirawna/icons8-truck-50.png?updatedAt=1753349021731"
                                    alt="free-shipping"
                                />
                                Free Shipping
                            </li>
                            <li>
                                <img
                                    src="https://ik.imagekit.io/vinaykalirawna/icons8-vegan-50.png?updatedAt=1753349265990"
                                    alt="vegan"
                                />
                                100% Vegan
                            </li>
                            <li>
                                <img
                                    src="https://ik.imagekit.io/vinaykalirawna/icons8-vegan-48.png?updatedAt=1753349164539"
                                    alt="planet"
                                />
                                Kind to Planet
                            </li>
                        </ul>

                        {/* Long Description Section with 3 separate Read More */}
                        <motion.div
                            className="pd-long-description"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            {product.fullDescription && (
                                <>
                                    {/* What it is Section */}
                                    <div className="description-section">
                                        <h3>What it is</h3>
                                        <p>
                                            {expandedSections.whatItIs
                                                ? product.fullDescription
                                                      .whatItIs
                                                : getTruncatedDescription(
                                                      product.fullDescription
                                                          .whatItIs
                                                  )}
                                        </p>
                                        {product.fullDescription.whatItIs
                                            .length > 120 && (
                                            <button
                                                className="read-more-btn"
                                                onClick={() =>
                                                    toggleSection("whatItIs")
                                                }
                                            >
                                                {expandedSections.whatItIs
                                                    ? "Read Less"
                                                    : "Read More"}
                                                <span
                                                    className={`arrow ${
                                                        expandedSections.whatItIs
                                                            ? "up"
                                                            : "down"
                                                    }`}
                                                >
                                                    {expandedSections.whatItIs
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            </button>
                                        )}
                                    </div>

                                    {/* What it does Section */}
                                    <div className="description-section">
                                        <h3>What it does</h3>
                                        <p>
                                            {expandedSections.whatItDoes
                                                ? product.fullDescription
                                                      .whatItDoes
                                                : getTruncatedDescription(
                                                      product.fullDescription
                                                          .whatItDoes
                                                  )}
                                        </p>
                                        {product.fullDescription.whatItDoes
                                            .length > 120 && (
                                            <button
                                                className="read-more-btn"
                                                onClick={() =>
                                                    toggleSection("whatItDoes")
                                                }
                                            >
                                                {expandedSections.whatItDoes
                                                    ? "Read Less"
                                                    : "Read More"}
                                                <span
                                                    className={`arrow ${
                                                        expandedSections.whatItDoes
                                                            ? "up"
                                                            : "down"
                                                    }`}
                                                >
                                                    {expandedSections.whatItDoes
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            </button>
                                        )}
                                    </div>

                                    {/* How it works Section */}
                                    <div className="description-section">
                                        <h3>How it works</h3>
                                        <p>
                                            {expandedSections.howItDoes
                                                ? product.fullDescription
                                                      .howItDoes
                                                : getTruncatedDescription(
                                                      product.fullDescription
                                                          .howItDoes
                                                  )}
                                        </p>
                                        {product.fullDescription.howItDoes
                                            .length > 120 && (
                                            <button
                                                className="read-more-btn"
                                                onClick={() =>
                                                    toggleSection("howItDoes")
                                                }
                                            >
                                                {expandedSections.howItDoes
                                                    ? "Read Less"
                                                    : "Read More"}
                                                <span
                                                    className={`arrow ${
                                                        expandedSections.howItDoes
                                                            ? "up"
                                                            : "down"
                                                    }`}
                                                >
                                                    {expandedSections.howItDoes
                                                        ? "↑"
                                                        : "↓"}
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>
                </motion.div>

                {/* Rest of your existing code remains the same */}
                <motion.p
                    className="pd-tagline"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    GLOWY & BRIGHT <br />
                    SKIN WITH SINGLE PRODUCT
                </motion.p>

                <motion.div
                    className="product-details-accordion"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <div className="accordion-container">
                        {/* All your existing accordion sections remain the same */}
                        {/* Key Ingredients Section */}
                        {product.keyIngredients && (
                            <div className="accordion-item">
                                <button
                                    className={`accordion-header ${
                                        activeSection === "keyIngredients"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        toggleDetailSection("keyIngredients")
                                    }
                                >
                                    <span className="accordion-icon">🧪</span>
                                    <span className="accordion-title">
                                        {product.keyIngredients.title}
                                    </span>
                                    <span
                                        className={`accordion-arrow ${
                                            activeSection === "keyIngredients"
                                                ? "rotate"
                                                : ""
                                        }`}
                                    >
                                        ▼
                                    </span>
                                </button>

                                <div
                                    className={`accordion-content ${
                                        activeSection === "keyIngredients"
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <div className="accordion-body">
                                        <div className="ingredients-content">
                                            {product.keyIngredients.sections.map(
                                                (section, index) => (
                                                    <div
                                                        key={index}
                                                        className="ingredient-section"
                                                    >
                                                        <h4 className="ingredient-header">
                                                            {section.header}
                                                        </h4>
                                                        <ul className="ingredient-list">
                                                            {section.ingredients.map(
                                                                (
                                                                    ingredient,
                                                                    idx
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="ingredient-item"
                                                                    >
                                                                        {
                                                                            ingredient
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Good for Planet Section */}
                        {product.goodForPlanet && (
                            <div className="accordion-item">
                                <button
                                    className={`accordion-header ${
                                        activeSection === "goodForPlanet"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        toggleDetailSection("goodForPlanet")
                                    }
                                >
                                    <span className="accordion-icon">🌱</span>
                                    <span className="accordion-title">
                                        {product.goodForPlanet.title}
                                    </span>
                                    <span
                                        className={`accordion-arrow ${
                                            activeSection === "goodForPlanet"
                                                ? "rotate"
                                                : ""
                                        }`}
                                    >
                                        ▼
                                    </span>
                                </button>

                                <div
                                    className={`accordion-content ${
                                        activeSection === "goodForPlanet"
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <div className="accordion-body">
                                        <div className="planet-content">
                                            <p>
                                                {product.goodForPlanet.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Direction of Use Section */}
                        {product.directionOfUse && (
                            <div className="accordion-item">
                                <button
                                    className={`accordion-header ${
                                        activeSection === "directionOfUse"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        toggleDetailSection("directionOfUse")
                                    }
                                >
                                    <span className="accordion-icon">📋</span>
                                    <span className="accordion-title">
                                        {product.directionOfUse.title}
                                    </span>
                                    <span
                                        className={`accordion-arrow ${
                                            activeSection === "directionOfUse"
                                                ? "rotate"
                                                : ""
                                        }`}
                                    >
                                        ▼
                                    </span>
                                </button>

                                <div
                                    className={`accordion-content ${
                                        activeSection === "directionOfUse"
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <div className="accordion-body">
                                        <div className="usage-content">
                                            {product.directionOfUse.sections.map(
                                                (section, index) => (
                                                    <div
                                                        key={index}
                                                        className="usage-section"
                                                    >
                                                        <h4 className="usage-header">
                                                            {section.header}
                                                        </h4>
                                                        <ul className="usage-list">
                                                            {section.instructions.map(
                                                                (
                                                                    instruction,
                                                                    idx
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="usage-item"
                                                                    >
                                                                        {
                                                                            instruction
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Full Ingredients List Section */}
                        {product.fullIngredientsList && (
                            <div className="accordion-item">
                                <button
                                    className={`accordion-header ${
                                        activeSection === "fullIngredientsList"
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        toggleDetailSection(
                                            "fullIngredientsList"
                                        )
                                    }
                                >
                                    <span className="accordion-icon">📝</span>
                                    <span className="accordion-title">
                                        {product.fullIngredientsList.title}
                                    </span>
                                    <span
                                        className={`accordion-arrow ${
                                            activeSection ===
                                            "fullIngredientsList"
                                                ? "rotate"
                                                : ""
                                        }`}
                                    >
                                        ▼
                                    </span>
                                </button>

                                <div
                                    className={`accordion-content ${
                                        activeSection === "fullIngredientsList"
                                            ? "active"
                                            : ""
                                    }`}
                                >
                                    <div className="accordion-body">
                                        <div className="full-ingredients-content">
                                            <p className="ingredients-text">
                                                {
                                                    product.fullIngredientsList
                                                        .content
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FAQs Section */}
                        {product.faqs && (
                            <div className="accordion-item">
                                <button
                                    className={`accordion-header ${
                                        activeSection === "faqs" ? "active" : ""
                                    }`}
                                    onClick={() => toggleDetailSection("faqs")}
                                >
                                    <span className="accordion-icon">❓</span>
                                    <span className="accordion-title">
                                        {product.faqs.title}
                                    </span>
                                    <span
                                        className={`accordion-arrow ${
                                            activeSection === "faqs"
                                                ? "rotate"
                                                : ""
                                        }`}
                                    >
                                        ▼
                                    </span>
                                </button>

                                <div
                                    className={`accordion-content ${
                                        activeSection === "faqs" ? "active" : ""
                                    }`}
                                >
                                    <div className="accordion-body">
                                        <div className="faqs-content">
                                            {product.faqs.questions.map(
                                                (faq, index) => (
                                                    <div
                                                        key={index}
                                                        className="faq-item"
                                                    >
                                                        <h4 className="faq-question">
                                                            {faq.question}
                                                        </h4>
                                                        <p className="faq-answer">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Product Images Gallery - Updated with modal functionality */}
                    <div className="product-gallery">
                        <h3 className="gallery-title">HOW TO USE</h3>
                        <div className="gallery-grid">
                            {getAllImages().map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="gallery-item"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.4,
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 },
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} - Image ${
                                            index + 1
                                        }`}
                                        className="gallery-image"
                                        loading="lazy"
                                        onClick={() => openModal(image)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Image Modal */}
            {isModalOpen && (
                <div className="image-modal" onClick={closeModal}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close" onClick={closeModal}>
                            ×
                        </button>
                        <img
                            src={modalImage}
                            alt="Full size view"
                            className="modal-image"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
