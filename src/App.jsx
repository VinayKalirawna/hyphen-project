import { useEffect } from "react";
import Lenis from "lenis";
import MainRoutes from "./routes/MainRoutes";
import Navbar from "./components/common/navbar/Navbar";
import AboutSection from "./components/aboutSection/AboutSection";

const App = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return (
        <div>
            <Navbar />
            <MainRoutes />
            <AboutSection />
        </div>
    );
};

export default App;
