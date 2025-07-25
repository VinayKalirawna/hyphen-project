import React, { createContext, useContext, useState, useEffect } from "react";
import productsData from "../data/products.json";

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedConcern, setSelectedConcern] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    // User Authentication State
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    // Initialize products data
    useEffect(() => {
        try {
            setProducts(productsData.products || []);
        } catch (error) {
            console.error("Error loading products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Check for existing user session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setIsAuthenticated(true);
            loadUserCart(userData.email);
        }
        setAuthLoading(false);
    }, []);

    // Save cart to localStorage whenever it changes (user-specific)
    useEffect(() => {
        if (user && cart.length >= 0) {
            localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
        }
    }, [cart, user]);

    // User Management Functions
    const register = (userData) => {
        const { email, password, firstName, lastName } = userData;

        // Get existing users
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

        // Check if user already exists
        if (existingUsers.find((user) => user.email === email)) {
            throw new Error("User already exists with this email");
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            email,
            password,
            firstName,
            lastName,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
        };

        // Save to users array
        const updatedUsers = [...existingUsers, newUser];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Auto-login after registration
        const userForSession = { ...newUser };
        delete userForSession.password;

        setUser(userForSession);
        setIsAuthenticated(true);
        localStorage.setItem("currentUser", JSON.stringify(userForSession));

        setCart([]);

        return userForSession;
    };

    const login = (email, password) => {
        const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const foundUser = existingUsers.find(
            (user) => user.email === email && user.password === password
        );

        if (!foundUser) {
            throw new Error("Invalid email or password");
        }

        //last login
        foundUser.lastLogin = new Date().toISOString();
        const updatedUsers = existingUsers.map((user) =>
            user.email === email ? foundUser : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Create session
        const userForSession = { ...foundUser };
        delete userForSession.password;

        setUser(userForSession);
        setIsAuthenticated(true);
        localStorage.setItem("currentUser", JSON.stringify(userForSession));

        // Load user's cart
        loadUserCart(email);

        return userForSession;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setCart([]);
        localStorage.removeItem("currentUser");
    };

    const loadUserCart = (userEmail) => {
        const userCart = localStorage.getItem(`cart_${userEmail}`);
        if (userCart) {
            setCart(JSON.parse(userCart));
        } else {
            setCart([]);
        }
    };

    const getProductById = (id) => {
        return products.find((product) => product.id === parseInt(id));
    };

    const getProductsByCategory = (categoryName) => {
        if (!categoryName) return [];
        return products.filter(
            (product) =>
                product.category?.toLowerCase() === categoryName.toLowerCase()
        );
    };

    const getProductsByConcern = (concern) => {
        if (!concern) return products;
        return products.filter((p) => p.shopByConcern === concern);
    };

    const getAllCategories = () => {
        return [...new Set(products.map((p) => p.category))];
    };

    const getAllConcerns = () => {
        return [...new Set(products.map((p) => p.shopByConcern))];
    };

    const getFilteredProducts = () => {
        let filtered = products;
        if (selectedCategory) {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }
        if (selectedConcern) {
            filtered = filtered.filter(
                (p) => p.shopByConcern === selectedConcern
            );
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (p) =>
                    p.name.toLowerCase().includes(term) ||
                    (p.shortDescription &&
                        p.shortDescription.toLowerCase().includes(term))
            );
        }
        return filtered;
    };

    const getFeaturedProducts = (limit = 10) => {
        return products.slice(0, limit);
    };

    // Cart management (updated to require authentication)
    const addToCart = (product, quantity = 1) => {
        if (!isAuthenticated) {
            throw new Error("Please login to add items to cart");
        }

        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateCartQuantity = (productId, quantity) => {
        if (quantity <= 0) return removeFromCart(productId);
        setCart((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => setCart([]);

    const getCartTotal = () =>
        cart.reduce(
            (sum, item) =>
                sum + (item.price?.amount || item.price) * item.quantity,
            0
        );

    const getCartItemsCount = () =>
        cart.reduce((sum, item) => sum + item.quantity, 0);

    // Expose everything via context
    const value = {
        // Products
        products,
        loading,
        selectedCategory,
        selectedConcern,
        searchTerm,
        setSelectedCategory,
        setSelectedConcern,
        setSearchTerm,
        getProductById,
        getProductsByCategory,
        getProductsByConcern,
        getAllCategories,
        getAllConcerns,
        getFilteredProducts,
        getFeaturedProducts,

        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,

        // Authentication
        user,
        isAuthenticated,
        authLoading,
        register,
        login,
        logout,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
};
