import React, { useState, useEffect } from 'react';
import HomeSwiper from './homeSwiper';
import MovieList from './movieList';

const MoviePage = () => {
  console.log("hey")

  const [navbarOpaque, setNavbarOpaque] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const triggerElementPosition = 0.2 * window.innerHeight;
      const scrollPosition = window.scrollY;
      setNavbarOpaque(scrollPosition > triggerElementPosition);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="movie-page">
      {/* <div
        id="filmBackground"
        className="film-background"
        style={{
          backgroundImage: movie && movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
            : 'none',
          backgroundSize: 'cover',
        }}
      >

        
      </div> */}
      <HomeSwiper></HomeSwiper>
      <MovieList urlM={"https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key="} title={"Popular"}></MovieList>
      {/* Navbar */}
      <nav className={`navbar ${navbarOpaque ? 'opaque' : ''}`}>
        hello
      </nav>

    </div>
  );
};

export default MoviePage;
