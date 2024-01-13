import React from 'react';
import HomeSwiper from '../components/home/homeSwiper';
import MovieList from '../components/home/movieList';
import Genres from '../components/home/genres';
import Random from '../components/home/randomChoice';

const Home = () => {

  return (
    <div className="movie-page pb-3">
      <HomeSwiper></HomeSwiper>
      <MovieList urlM={"https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key="} title={"Popular"}></MovieList>
      <Genres></Genres>
      <MovieList urlM={"https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key="} title={"Tv Shows"}></MovieList>
      <Random></Random>
    </div>
  );
};

export default Home;
