import React, { useEffect, useRef } from "react";

const VideoBackground = ({ onVideoLoad }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const handleCanPlay = () => {
            onVideoLoad();
        };

        video.addEventListener("canplaythrough", handleCanPlay);

        return () => {
            video.removeEventListener("canplaythrough", handleCanPlay);
        };
    }, [onVideoLoad]);

    return (
        <div className="video-background">
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="hero-video"
            >
                <source
                    src="https://ik.imagekit.io/vinaykalirawna/hero.mp4?updatedAt=1752732004992"
                    type="video/mp4"
                />
            </video>
        </div>
    );
};

export default VideoBackground;
