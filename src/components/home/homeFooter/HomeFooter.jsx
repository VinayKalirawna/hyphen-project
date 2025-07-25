import { useProducts } from "../../../context/ProductContext";
import ProductCard from "../../common/productCard/ProductCard";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import "./HomeFooter.css";

const HomeFooter = () => {
    const { products, loading } = useProducts();
    const ref = useRef(null);
    const carouselRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 3;

    // Get products for carousel
    const featuredProducts = Array.isArray(products)
        ? products.slice(0, 6)
        : [];

    const totalItems = featuredProducts.length;

    // Debug logging
    useEffect(() => {
        console.log("HomeFooter Debug:");
        console.log("- Loading:", loading);
        console.log("- Products:", products);
        console.log("- Featured Products:", featuredProducts);
        console.log("- Is In View:", isInView);
        console.log("- Total Items:", totalItems);
    }, [loading, products, featuredProducts, isInView]);

    const scrollCarousel = (direction) => {
        const container = carouselRef.current;
        if (!container) {
            console.log("Carousel container not found");
            return;
        }

        let newIndex = currentIndex + direction;

        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex > totalItems - itemsToShow) {
            newIndex = Math.max(0, totalItems - itemsToShow);
        }

        setCurrentIndex(newIndex);

        const itemWidth = container.children[0]?.offsetWidth + 10;
        const scrollAmount = newIndex * itemWidth;

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    if (loading) {
        return (
            <section className="home-footer">
                <div className="container">
                    <div className="loading">Loading products...</div>
                </div>
            </section>
        );
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
        return (
            <section className="home-footer">
                <div className="container">
                    <div className="no-products">
                        <p>No products available at the moment.</p>
                        <p>Products state: {JSON.stringify(products)}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="home-footer">
            <div className="container">
                <motion.div
                    className="home-foot-header"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="explore">EXPLORE</h1>
                    <h1 className="pure-exp">Pure Expotency</h1>
                </motion.div>

                <div className="img-prod-container" ref={ref}>
                    <motion.div
                        className="first-img"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }} // Simplified animation
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <img
                            src="https://www.kacyworld.com/content/images/size/w2000/2024/12/Card2_f63f6226-a9b9-40ee-8676-802ab03a4884-1.jpg"
                            alt="Featured Product"
                            onLoad={() =>
                                console.log("Image loaded successfully")
                            }
                            onError={() => console.log("Image failed to load")}
                        />
                    </motion.div>

                    <div className="products-section">
                        <div className="product-carousel">
                            <button
                                className={`carousel-arrow prev-arrow ${
                                    currentIndex === 0 ? "disabled" : ""
                                }`}
                                onClick={() => scrollCarousel(-1)}
                                disabled={currentIndex === 0}
                            >
                                ‹
                            </button>

                            <div
                                className="products-container"
                                ref={carouselRef}
                            >
                                {featuredProducts.length > 0 ? (
                                    featuredProducts.map((product, index) => (
                                        <motion.div
                                            key={product.id || index}
                                            className="product-wrapper"
                                            initial={{
                                                opacity: 0,
                                                y: 50,
                                                scale: 0.9,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }} // Simplified animation
                                            transition={{
                                                duration: 0.6,
                                                delay: index * 0.1,
                                                ease: "easeOut",
                                            }}
                                            whileHover={{
                                                scale: 1.05,
                                                transition: { duration: 0.2 },
                                            }}
                                        >
                                            <ProductCard
                                                product={product}
                                                showAddToCart={true}
                                            />
                                        </motion.div>
                                    ))
                                ) : (
                                    <div
                                        style={{
                                            color: "red",
                                            padding: "20px",
                                        }}
                                    >
                                        No featured products found
                                    </div>
                                )}
                            </div>

                            <button
                                className={`carousel-arrow next-arrow ${
                                    currentIndex >= totalItems - itemsToShow
                                        ? "disabled"
                                        : ""
                                }`}
                                onClick={() => scrollCarousel(1)}
                                disabled={
                                    currentIndex >= totalItems - itemsToShow
                                }
                            >
                                ›
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeFooter;
