import React, { useState, useEffect} from 'react';
const HomeSwiper = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [movieData, setMovieData] = useState(null);
    const [preloadedImages, setPreloadedImages] = useState([]);
    const [size, setSize] = useState(null);
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;
                const options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                };
                const response = await fetch(url, options);
                const data = await response.json();
                setMovieData(data.results);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);
    

    useEffect(()=>{
        if (movieData && movieData.length > 0) {
        preloadImages();
        }
    })

    useEffect(() => {
        if (movieData && movieData.length > 0) {

            const interval = setInterval(() => {
                
                setBackgroundIndex((prevIndex) =>
                    prevIndex === movieData.length - 1 ? 0 : prevIndex + 1
                );
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [backgroundIndex, movieData]);

    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function preloadImages() {
        const imgs = movieData.map((movie) => {
            const imgP = new Image();
            imgP.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
            imgP.onload = () => console.log(`Poster image preloaded: ${imgP.src}`);
    
            const imgB = new Image();
            imgB.src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
            imgB.onload = () => console.log(`Backdrop image preloaded: ${imgB.src}`);
    
            return { imgP, imgB };
        });
    
        setPreloadedImages(imgs);
    }
    

    return (
        <div
        className={`w-[${size}px] flex justify-end sm:items-end z-0 mb-10 transition-animation`}
        style={{
            height: '87vh',
            backgroundSize: size <= 768 ? '100% 100%' : 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundImage:
                size <= 768
                    ? movieData && movieData.length > 0 && preloadedImages.length > 0
                        ? `url(${preloadedImages[backgroundIndex].imgP.src})`
                        : 'none'
                    : movieData && movieData.length > 0 && preloadedImages.length > 0
                    ? `url(${preloadedImages[backgroundIndex].imgB.src})`
                    : 'none',
        }}
    />
    );
};

export default HomeSwiper;
