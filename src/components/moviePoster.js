import { useNavigate } from "react-router-dom";
import { useWatchlaterContext } from "../context/watchLaterContext"
import watchList from "../imgs/watch.png"
export default function Poster({ classContent, source,movie,closeModal }) {
    const { removeItemWatchLater,addItemToWatchLater,isInWatchList}=useWatchlaterContext();
    const navigate=useNavigate()
    function navigation(){
        navigate(`/movie/${movie.id}`)
    }
    return (
        <div  className={`${classContent} relative`}>
            <img onClick={()=>{navigation(movie); closeModal()}} className="w-full h-full cursor-pointer" alt="movie" loading="lazy" src={source}></img>
            <img onClick={()=>{isInWatchList(movie) ? removeItemWatchLater(movie):addItemToWatchLater(movie)}} alt="watch " src={watchList} className={`absolute z-10 w-12 h-12 p-0 m-0 watchlist cursor-pointer ${isInWatchList(movie)? "inWatchList" : "notInwatchlist"}`}></img>
        </div>
    )
}