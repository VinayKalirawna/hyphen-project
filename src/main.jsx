import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Add this import

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <ProductProvider>
                <App />
                {/* Add ToastContainer here */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                    style={{ zIndex: 9999 }}
                />
            </ProductProvider>
        </BrowserRouter>
    </StrictMode>
);
