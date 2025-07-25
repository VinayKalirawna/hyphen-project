import React, { useState, useEffect } from "react";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/common/productCard/ProductCard";
import "./ProductCategory.css";
import "./Products.css";

const Products = () => {
    const {
        products,
        loading,
        selectedCategory,
        setSelectedCategory,
        searchTerm,
        setSearchTerm,
        getAllCategories,
        getFilteredProducts,
    } = useProducts();

    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const categories = getAllCategories();
    let filteredProducts = getFilteredProducts();

    // Apply sorting
    filteredProducts = [...filteredProducts].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];

        if (sortBy === "price") {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        }

        if (sortOrder === "asc") {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const handleCategoryChange = (category) => {
        setSelectedCategory(category === selectedCategory ? "" : category);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearFilters = () => {
        setSelectedCategory("");
        setSearchTerm("");
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
            <div className="banner-img">
                <img
                    src="https://letshyphen.com/cdn/shop/files/Collection_Page_Banner_b2efafe7-7acd-4e2b-9bbd-30f91ba2e3fa.jpg?v=1751520538"
                    alt=""
                />
            </div>
            <div className="container">
                <div className="products-header">
                    <h1>Our Products</h1>
                    <p>Discover the perfect skincare solution for your needs</p>
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

                        {/* Search Filter */}
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

                        {/* Category Filter */}
                        <div className="filter-section">
                            <h4>Categories</h4>
                            <div className="filter-options">
                                {categories.map((category) => (
                                    <label
                                        key={category}
                                        className="filter-checkbox"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedCategory === category
                                            }
                                            onChange={() =>
                                                handleCategoryChange(category)
                                            }
                                        />
                                        <span className="checkmark"></span>
                                        <span className="filter-label">
                                            {category}
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
                                🔍 Filters ({selectedCategory ? 1 : 0})
                            </button>
                            <span className="results-count">
                                {filteredProducts.length} Products
                            </span>
                        </div>

                        {/* Products Results */}
                        <div className="products-results">
                            <p className="results-count">
                                Showing {filteredProducts.length} of{" "}
                                {products.length} products
                            </p>
                        </div>

                        {/* Products Grid */}
                        <div className="products-grid">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        showAddToCart={true}
                                    />
                                ))
                            ) : (
                                <div className="no-products">
                                    <h3>No products found</h3>
                                    <p>Try adjusting your filters</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
