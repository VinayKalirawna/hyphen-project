// src/pages/products/ConcernProducts.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/common/productCard/ProductCard";
import "./Products.css";

const ConcernProducts = () => {
    const { concernName } = useParams();
    const navigate = useNavigate();
    const { loading, getProductsByConcern, getAllConcerns } = useProducts();
    const [concernProducts, setConcernProducts] = useState([]);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedConcern, setSelectedConcern] = useState(concernName);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const concerns = getAllConcerns(); // Assuming this method exists in your context

    useEffect(() => {
        const products = getProductsByConcern(concernName);
        setConcernProducts(products);
        setSelectedConcern(concernName);
    }, [concernName, getProductsByConcern]);

    // Apply sorting
    const sortedProducts = [...concernProducts].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === "price") {
            aValue = parseFloat(aValue?.amount || aValue);
            bValue = parseFloat(bValue?.amount || bValue);
        }

        if (sortOrder === "asc") {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const handleConcernChange = (concern) => {
        if (concern === "All Products") {
            navigate("/products");
        } else {
            setSelectedConcern(concern);
            navigate(`/concerns/${concern}`);
        }
    };

    const clearFilters = () => {
        setSortBy("name");
        setSortOrder("asc");
    };

    if (loading) {
        return (
            <div className="products-page">
                <div className="container">
                    <div className="loading">Loading products...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="products-page">
            <div className="banner-image">
                <img
                    src="https://letshyphen.com/cdn/shop/files/range_1285570c-f390-4696-8b3a-c7e7684092a7.jpg?v=1739787662"
                    alt=""
                />
            </div>
            <div className="container">
                <div className="products-header">
                    <h1>{concernName}</h1>
                    <p>Products for {concernName.toLowerCase()}</p>
                </div>

                <div className="category-content">
                    {/* Sidebar Filter */}
                    <div
                        className={`filter-sidebar ${
                            isMobileFilterOpen ? "mobile-open" : ""
                        }`}
                    >
                        <div className="filter-header">
                            <h3>Filters</h3>
                            <button
                                className="clear-filters-btn"
                                onClick={clearFilters}
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Shop Category Filter */}
                        <div className="filter-section">
                            <h4>Shop by Concern</h4>
                            <div className="filter-options">
                                <label className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedConcern === "All Products"
                                        }
                                        onChange={() =>
                                            handleConcernChange("All Products")
                                        }
                                    />
                                    <span className="checkmark"></span>
                                    <span className="filter-label">
                                        All Products
                                    </span>
                                </label>
                                {concerns.map((concern) => (
                                    <label
                                        key={concern}
                                        className="filter-checkbox"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedConcern === concern
                                            }
                                            onChange={() =>
                                                handleConcernChange(concern)
                                            }
                                        />
                                        <span className="checkmark"></span>
                                        <span className="filter-label">
                                            {concern}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Sort Filter */}
                        <div className="filter-section">
                            <h4>Sort By</h4>
                            <select
                                value={`${sortBy}-${sortOrder}`}
                                onChange={(e) => {
                                    const [field, order] =
                                        e.target.value.split("-");
                                    setSortBy(field);
                                    setSortOrder(order);
                                }}
                                className="sort-select"
                            >
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                                <option value="price-asc">
                                    Price (Low to High)
                                </option>
                                <option value="price-desc">
                                    Price (High to Low)
                                </option>
                            </select>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="products-main">
                        {/* Mobile Filter Toggle */}
                        <div className="mobile-filter-header">
                            <button
                                className="mobile-filter-toggle"
                                onClick={() =>
                                    setIsMobileFilterOpen(!isMobileFilterOpen)
                                }
                            >
                                🔍 Filters ({selectedConcern ? 1 : 0})
                            </button>
                            <span className="results-count">
                                {sortedProducts.length} Products
                            </span>
                        </div>

                        <div className="products-results">
                            <p className="results-count">
                                Showing {sortedProducts.length} products for{" "}
                                {concernName}
                            </p>
                        </div>

                        <div className="products-grid">
                            {sortedProducts.length > 0 ? (
                                sortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        showAddToCart={true}
                                    />
                                ))
                            ) : (
                                <div className="no-products">
                                    <h3>No products found</h3>
                                    <p>No products found for this concern.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConcernProducts;
