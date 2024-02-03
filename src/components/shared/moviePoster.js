import { useNavigate } from "react-router-dom";
import { useWatchlaterContext } from "../../context/watchLaterContext";
import watchList from "../../imgs/watch.png";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from "react";
import { useViewedMovies } from "../../context/viewedMovieContext";

gsap.registerPlugin(ScrollTrigger);

export default function Poster({ classContent, source, movie, closeModal, withAnimation }) {
  const { removeItemWatchLater, addItemToWatchLater, isInWatchList } = useWatchlaterContext();
  const { addViewed } = useViewedMovies();
  const navigate = useNavigate();
  const [isWatchListed, setIsWatchListed] = useState(isInWatchList(movie));
  const movieRef = useRef(null);

  useEffect(() => {
    if (withAnimation) {
      const animation = gsap.from(movieRef.current, {
        y: 100,
        duration: 3,
        ease: 'power2.out',
      });

      ScrollTrigger.create({
        trigger: movieRef.current,
        animation: animation,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      });
    }
  }, [withAnimation, movie]);

  const handleWatchListClick = () => {
    if (isWatchListed) {
      removeItemWatchLater(movie);
    } else {
      addItemToWatchLater(movie);
    }

    // Force a re-render by updating the state
    setIsWatchListed((prevState) => !prevState);
  };

  const navigation = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div ref={movieRef} className={`${classContent} relative`}>
      <img
        onClick={() => {
          navigation(movie);
          addViewed(movie);
          if (closeModal) {
            closeModal();
          }
        }}
        className="w-full h-full cursor-pointer"
        alt="movie"
        loading="lazy"
        src={source}
      ></img>
      <img
        onClick={handleWatchListClick}
        alt="watch"
        src={watchList}
        className={`absolute z-10 w-12 h-12 p-0 m-0 watchlist cursor-pointer ${isWatchListed ? "inWatchList" : "notInwatchlist"}`}
      ></img>
    </div>
  );
}
