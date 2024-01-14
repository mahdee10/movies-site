import Poster from "./moviePoster";
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { useEffect, useRef } from "react";
// gsap.registerPlugin(ScrollTrigger);
export default function MoviesCollection({movies,title}){
    // const movieRef = useRef(null);

    // useEffect(() => {
    //     const animation = gsap.from(movieRef.current, {
    //       y: 100,
    //       duration: 3, 
    //       ease: 'power2.out', 
    //     });
    
    //     ScrollTrigger.create({
    //       trigger: movieRef.current,
    //       animation: animation,
    //       start: 'top 80%', 
    //       end: 'bottom 20%', 
    //       toggleActions: 'play none none none',
    //     });
    //   }, []);

    return(
        movies && movies.length>0? (
            
            <div className="flex flex-col items-center w-full mt-10  w-full sm:p-0 p-3">
            {/* <h2 className="text-white text-3xl w-fit title text-center sm:pt-10 sm:mt-20">{title}</h2> */}

                <div  className="flex flex-wrap sm:justify-center  justify-between w-full">
                    {
                        movies.map((movie,index)=>(
                            <Poster withAnimation={true} movie={movie} key={index} classContent={"sm:w-40 mt-2 sm:h-60 h-42 w-[48%] shrink-0 sm:mr-3"} source={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></Poster>
                        ))
                    }
                </div>
            </div>
            
        ):(
            <div className="text-white sm:text-4xl text-2xl mt-32 text-center">No Movies in the {title}</div>
        )
    )
}