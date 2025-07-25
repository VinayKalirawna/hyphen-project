import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import CategoryProducts from "../pages/products/CategoryProducts";
import ConcernProducts from "../pages/products/ConcernProducts";
import ProductDetails from "../pages/products/ProductDetails";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Cart from "../pages/cart/Cart";
import ProtectedRoute from "./ProtectedRoute";
import About from "../pages/about/About";

const MainRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route
                    path="/category/:categoryName"
                    element={<CategoryProducts />}
                />
                <Route
                    path="/concern/:concernName"
                    element={<ConcernProducts />}
                />
                <Route path="/product/:id" element={<ProductDetails />} />

                <Route
                    path="/login"
                    element={
                        <ProtectedRoute redirectTo="/">
                            <Login />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <ProtectedRoute redirectTo="/">
                            <Register />
                        </ProtectedRoute>
                    }
                />

                <Route path="/cart" element={<Cart />} />

                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
};

export default MainRoutes;
