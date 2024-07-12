import { useNavigate } from "react-router-dom";
import watchList from "../../imgs/watch.png"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from "react";
import { useMyActorsContext } from "../../context/myActorsContext";
gsap.registerPlugin(ScrollTrigger);
export default function ActorPoster({ classContent, source,actor,closeModal,withAnimation }) {
    const { removeItemMyActors,addItemToMyActors,isInMyActors}=useMyActorsContext();
    const navigate=useNavigate()
    function navigation(){
        navigate(`/actor/${actor.id}`)
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
      }, [withAnimation,actor]);
    return (
        <div ref={movieRef} className={`${classContent} relative`}>
            <img  onClick={()=>{navigation(actor); if(closeModal){closeModal()}}} className="w-full h-full cursor-pointer" alt="movie" loading="lazy" src={source}></img>
            <img onClick={()=>{isInMyActors(actor) ? removeItemMyActors(actor):addItemToMyActors(actor)}} alt="watch " src={watchList} className={`absolute  w-12 h-12 p-0 m-0 watchlist cursor-pointer ${isInMyActors(actor)? "inWatchList" : "notInwatchlist"}`}></img>
        </div>
    )
}