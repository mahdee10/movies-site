import React, { useState, useEffect} from 'react';
const HomeSwiper = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [movieData, setMovieData] = useState(null);
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

    useEffect(() => {
        if (movieData && movieData.length > 0) {
            const interval = setInterval(() => {
                setBackgroundIndex((prevIndex) => (prevIndex + 1) % movieData.length);
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [movieData]);

    

    useEffect(() => {
        const handleResize = () => {
            setSize(window.innerWidth );
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`w-[${size}px] transition-background flex justify-end sm:items-end z-0 mb-10`} style={{
            height: "87vh",
            backgroundImage: size<= 768 ? (movieData && movieData.length > 0
                ? `url(https://image.tmdb.org/t/p/original/${movieData[backgroundIndex].poster_path})`
                : 'none') : (movieData && movieData.length > 0
                ? `url(https://image.tmdb.org/t/p/original/${movieData[backgroundIndex].backdrop_path})`
                : 'none'),
            backgroundSize: 'cover',

        }}>
        </div>
    );
};


export default HomeSwiper;


