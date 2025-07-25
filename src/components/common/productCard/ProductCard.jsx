import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useProducts } from "../../../context/ProductContext";
import "./ProductCard.css";

const ProductCard = ({ product, showAddToCart = true }) => {
    const { addToCart } = useProducts();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Get all available images
    const images = product.images
        ? Object.values(product.images).filter((img) => img)
        : [product.image];

    // Auto-rotate images every 2 seconds when hovered
    useEffect(() => {
        let interval;
        if (isHovered && images.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) =>
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isHovered, images.length]);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        if (images.length > 1) {
            setCurrentImageIndex(1);
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setCurrentImageIndex(0);
    };

    return (
        <div className="product-card">
            <NavLink to={`/product/${product.id}`} className="product-link">
                <div
                    className="product-image-container"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Background Images */}
                    <div className="image-wrapper">
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${product.name} - View ${index + 1}`}
                                className={`product-img ${
                                    index === currentImageIndex ? "active" : ""
                                }`}
                            />
                        ))}
                    </div>

                    {/* Category - Top Left */}
                    <div className="category-overlay">
                        <span className="category-tag">{product.category}</span>
                    </div>

                    {/* Add to Cart - Top Right */}
                    {showAddToCart && (
                        <div className="cart-overlay">
                            <button
                                className="add-to-cart-icon"
                                onClick={handleAddToCart}
                                title="Add to Cart"
                            >
                                <img
                                    className="card-cart-btn"
                                    src="https://ik.imagekit.io/vinaykalirawna/add-button.png?updatedAt=1752857530618"
                                    alt=""
                                />
                            </button>
                        </div>
                    )}
                    {product.isNew && (
                        <span className="product-badge new">New</span>
                    )}
                    {product.discount && (
                        <span className="product-badge discount">
                            -{product.discount}%
                        </span>
                    )}
                </div>

                <div className="product-name-container">
                    <h3 className="product-name">{product.name}</h3>
                </div>
                <div className="product-pricing">
                    <span className="product-price">
                        ₹{product.price?.amount || product.price}
                    </span>
                    {product.originalPrice && (
                        <span className="product-original-price">
                            ₹
                            {product.originalPrice?.amount ||
                                product.originalPrice}
                        </span>
                    )}
                </div>
            </NavLink>
        </div>
    );
};

export default ProductCard;
