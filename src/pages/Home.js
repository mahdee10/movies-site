import React, { useState, useEffect } from 'react';
import HomeSwiper from '../components/homeSwiper';
import MovieList from '../components/movieList';

const Home = () => {
  console.log("hey")

  return (
    <div className="movie-page pb-3">
      <HomeSwiper></HomeSwiper>
      <MovieList urlM={"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key="} title={"Popular"}></MovieList>
      <MovieList urlM={"https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key="} title={"Tv Shows"}></MovieList>
    </div>
  );
};

export default Home;
