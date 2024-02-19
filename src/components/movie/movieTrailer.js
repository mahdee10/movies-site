import React, { useEffect, useRef, useState } from 'react';

export default function Trailer({ movie }) {
    const [inViewport, setInViewport] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const onScroll = () => {
            const rect = videoRef.current.getBoundingClientRect();
            const isInViewport = (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
            setInViewport(isInViewport);
        };

        window.addEventListener('scroll', onScroll);
        onScroll(); // Call to check immediately on mount

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);



    const getTrailerKey = () => {
        const trailer = movie.videos.find(video => video.type === 'Trailer');
        return trailer ? trailer.key : null;
    };

    return (
        <div className="flex justify-center sm:pt-32 pt-10 sm:px-20 px-2">
            {getTrailerKey() ? (
                <iframe
                ref={videoRef}
                    className="sm:w-3/4 w-full sm:h-[500px] h-[200px]"
                    src={`https://www.youtube.com/embed/${getTrailerKey()}${inViewport ? '?autoplay=1' : ''}`}
                    title="YouTube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            ) : null}
        </div>
    );
}
