import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useProducts();
    const location = useLocation();
    const navigate = useNavigate();
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (isAuthenticated && !hasShownToast.current) {
            toast.info("You are already logged in!");
            hasShownToast.current = true;

            if (window.history.length > 1) {
                navigate(-1); 
            } else {
                navigate("/"); 
            }
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (!isAuthenticated) {
            hasShownToast.current = false;
        }
    }, [location.pathname, isAuthenticated]);

    if (!isAuthenticated) {
        return children;
    }

    return null;
};

export default ProtectedRoute;
