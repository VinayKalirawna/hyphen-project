import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../../components/common/productCard/ProductCard";
import "./Products.css";

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const { loading, getProductsByCategory, getAllCategories } = useProducts();
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(categoryName);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const categories = getAllCategories();

    useEffect(() => {
        const products = getProductsByCategory(categoryName);
        setCategoryProducts(products);
        setSelectedCategory(categoryName);
    }, [categoryName, getProductsByCategory]);

    // Apply filtering and sorting
    let filteredProducts = categoryProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
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

    const handleCategoryChange = (category) => {
        // Navigate to all products or specific category
        if (category === "All Products") {
            window.location.href = "/products";
        } else if (category !== categoryName) {
            window.location.href = `/category/${encodeURIComponent(category)}`;
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const clearFilters = () => {
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
                    src="https://letshyphen.com/cdn/shop/files/range_1285570c-f390-4696-8b3a-c7e7684092a7.jpg?v=1739787662"
                    alt=""
                />
            </div>
            <div className="container">
                <div className="products-header">
                    <h1>{categoryName}</h1>
                    <p>Products in {categoryName.toLowerCase()}</p>
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
                                <label className="filter-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={
                                            selectedCategory === "All Products"
                                        }
                                        onChange={() =>
                                            handleCategoryChange("All Products")
                                        }
                                    />
                                    <span className="checkmark"></span>
                                    <span className="filter-label">
                                        All Products
                                    </span>
                                </label>
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
                                🔍 Filters ({searchTerm ? 1 : 0})
                            </button>
                            <span className="results-count">
                                {sortedProducts.length} Products
                            </span>
                        </div>

                        {/* Products Results */}
                        <div className="products-results">
                            <p className="results-count">
                                Showing {sortedProducts.length} products for{" "}
                                {categoryName}
                            </p>
                        </div>

                        {/* Products Grid */}
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

export default CategoryProducts;
