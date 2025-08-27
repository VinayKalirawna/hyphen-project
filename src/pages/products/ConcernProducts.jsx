// src/pages/products/ConcernProducts.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/common/productCard/ProductCard";
import "./Products.css";

const ConcernProducts = () => {
    const { concernName } = useParams(); // e.g., "SUN PROTECTION"
    const navigate = useNavigate();

    const { loading, products, getAllConcerns } = useProducts();

    // --- CHANGE 1: No longer need to replace hyphens with spaces ---
    // useParams automatically decodes URL parameters (like %20 to a space).
    const originalConcernName = concernName;

    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedConcern, setSelectedConcern] = useState(originalConcernName);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const concerns = getAllConcerns();

    useEffect(() => {
        setSelectedConcern(originalConcernName);
        setSearchTerm("");
    }, [originalConcernName]);

    const filteredAndSortedProducts = products
        .filter((product) => {
            const concernMatch = selectedConcern
                ? product.shopByConcern === selectedConcern
                : true;

            const searchMatch = product.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            return concernMatch && searchMatch;
        })
        .sort((a, b) => {
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
            // --- CHANGE 2: Navigate to the desired route format ---
            // Using /concern/ and passing the name directly.
            navigate(`/concern/${concern}`);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSortBy("name");
        setSortOrder("asc");
        setSelectedConcern(null);
        navigate("/products");
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
                    <h1>{selectedConcern || "All Products"}</h1>
                    <p>
                        Products for{" "}
                        {selectedConcern
                            ? selectedConcern.toLowerCase()
                            : "all concerns"}
                    </p>
                </div>

                <div className="category-content">
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
                        <div className="filter-section">
                            <h4>Search</h4>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="search-input"
                            />
                        </div>
                        <div className="filter-section">
                            <h4>Shop by Concern</h4>
                            <div className="filter-options">
                                <label className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={!selectedConcern}
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
                    <div className="products-main">
                        <div className="mobile-filter-header">
                            <button
                                className="mobile-filter-toggle"
                                onClick={() =>
                                    setIsMobileFilterOpen(!isMobileFilterOpen)
                                }
                            >
                                🔍 Filters
                            </button>
                            <span className="results-count">
                                {filteredAndSortedProducts.length} Products
                            </span>
                        </div>
                        <div className="products-grid">
                            {filteredAndSortedProducts.length > 0 ? (
                                filteredAndSortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        showAddToCart={true}
                                    />
                                ))
                            ) : (
                                <div className="no-products">
                                    <h3>No products found</h3>
                                    <p>Try adjusting your filters.</p>
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
