import { useEffect, useState } from "react";
import Poster from "../moviePoster";

export default function SimilarMovies({ id }) {
  const [movies, setMovies] = useState(null);
  const apiKey = '75a499747ddeaacd5a5ca88536c09337';
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`;
        const options = {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        };

        const response = await fetch(url, options);
        const data = await response.json();

        setMovies(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleMouseEnter = (e) => {
    const container = document.getElementById('movieListContainer');
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const mousePositionX = e.clientX - containerRect.left;
  
      const triggerThreshold = 0.2; 
  
      let direction = '';
  
      if (mousePositionX > containerRect.width * (1 - triggerThreshold)) {
        direction = 'right';
      } else if (mousePositionX < containerRect.width * triggerThreshold) {
        direction = 'left';
      }
  
      if (direction) {
        setIntervalId(setInterval(() => scrollMovies(direction), 50));
      }
    }
  };

  const handleMouseLeave = () => {
    clearInterval(intervalId);
  };

  const scrollMovies = (direction) => {
    const container = document.getElementById('movieListContainer');
    if (container) {
      const scrollAmount = direction === 'right' ? 10 : -10;
      container.scrollLeft += scrollAmount;
    }
  };


  return (
    <div className="sm:pt-32 pt-10 sm:px-20 px-2">
      <div className="flex sm:justify-between justify-center items-center">
        <h2 className="text-white text-3xl title w-fit">Similar Movies</h2>
      </div>
      <div
        id="movieListContainer"
        className="flex mt-5"
        style={{ position: 'relative', whiteSpace: 'nowrap', overflowX: 'auto' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {movies && movies.length > 0 ? (
          movies.map((movie, index) => (
            <div>
            <Poster
              movie={movie}
              key={index}
              classContent={"w-40 h-60 shrink-0 mr-3"}
              source={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            ></Poster>
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
}
