import { useProducts } from "../../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Cart.css";

const Cart = () => {
    const {
        cart,
        isAuthenticated,
        user,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        logout,
    } = useProducts();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!isAuthenticated) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="auth-required">
                        <h2>Login Required</h2>
                        <p>Please login to view your cart</p>
                        <Link to="/login" className="login-btn">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="cart-header">
                        <div className="user-welcome">
                            <h2>
                                Welcome back, {user?.name || user?.firstName}!
                            </h2>
                        </div>

                        <button onClick={handleLogout} className="logout-btn">
                            Logout
                        </button>
                    </div>

                    <div className="empty-cart">
                        <h2>Your Cart is Empty</h2>
                        <p>
                            Looks like you haven't added anything to your cart
                            yet.
                        </p>
                        <Link to="/products" className="continue-shopping-btn">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        updateCartQuantity(productId, newQuantity);
    };

    const handleCheckout = () => {
        // Navigate to checkout page (you'll need to create this)
        navigate("/checkout");
    };

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <div className="header-left">
                        <h1>Shopping Cart</h1>
                        <p>Welcome back, {user?.name || user?.firstName}!</p>
                    </div>
                    {/* Logout button */}
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                </div>

                <div className="cart-content">
                    <div className="cart-items">
                        <div className="cart-items-header">
                            <h3>Items ({getCartItemsCount()})</h3>
                            <button
                                className="clear-cart-btn"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>
                        </div>

                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                className="cart-item"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="item-image">
                                    <img
                                        src={item.images?.image1 || item.image}
                                        alt={item.name}
                                        onError={(e) => {
                                            e.target.src =
                                                "https://via.placeholder.com/100x100?text=No+Image";
                                        }}
                                    />
                                </div>

                                <div className="item-details">
                                    <h4>{item.name}</h4>
                                    <p className="item-description">
                                        {item.shortDescription ||
                                            item.description}
                                    </p>
                                    <p className="item-category">
                                        {item.category}
                                    </p>
                                </div>

                                <div className="item-quantity">
                                    <button
                                        className="quantity-btn"
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity - 1
                                            )
                                        }
                                    >
                                        −
                                    </button>
                                    <span className="quantity">
                                        {item.quantity}
                                    </span>
                                    <button
                                        className="quantity-btn"
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity + 1
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>

                                <div className="item-price">
                                    <p className="price">
                                        ₹
                                        {(item.price?.amount || item.price) *
                                            item.quantity}
                                    </p>
                                    <p className="unit-price">
                                        ₹{item.price?.amount || item.price} each
                                    </p>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-card">
                            <h3>Order Summary</h3>

                            <div className="summary-row">
                                <span>
                                    Subtotal ({getCartItemsCount()} items)
                                </span>
                                <span>₹{getCartTotal()}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>

                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{getCartTotal()}</span>
                            </div>

                            <button
                                className="checkout-btn"
                                onClick={handleCheckout}
                            >
                                Proceed to Checkout
                            </button>

                            <Link to="/products" className="continue-shopping">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
