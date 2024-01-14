import { useNavigate } from "react-router-dom";
import { useWatchlaterContext } from "../../context/watchLaterContext"
import watchList from "../../imgs/watch.png"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);
export default function Poster({ classContent, source,movie,closeModal,withAnimation }) {
    const { removeItemWatchLater,addItemToWatchLater,isInWatchList}=useWatchlaterContext();
    const navigate=useNavigate()
    function navigation(){
        navigate(`/movie/${movie.id}`)
    }

    const movieRef = useRef(null);

    useEffect(() => {
        if(withAnimation){
        
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
      }, [withAnimation,movie]);
    return (
        <div ref={movieRef} className={`${classContent} relative`}>
            <img  onClick={()=>{navigation(movie); if(closeModal){closeModal()}}} className="w-full h-full cursor-pointer" alt="movie" loading="lazy" src={source}></img>
            <img onClick={()=>{isInWatchList(movie) ? removeItemWatchLater(movie):addItemToWatchLater(movie)}} alt="watch " src={watchList} className={`absolute z-10 w-12 h-12 p-0 m-0 watchlist cursor-pointer ${isInWatchList(movie)? "inWatchList" : "notInwatchlist"}`}></img>
        </div>
    )
}