import { useNavigate } from "react-router-dom";
import { useWatchlaterContext } from "../context/watchLaterContext"
import watchList from "../imgs/watch.png"
export default function Poster({ classContent, source,movie }) {
    const { removeItemWatchLater,addItemToWatchLater,isInWatchList}=useWatchlaterContext();
    const navigate=useNavigate()
    function navigation(){
        navigate(`/movie/${movie.id}`)
    }
    return (
        <div onClick={()=>navigation(movie)} className={`${classContent} relative`}>
            <img className="w-full h-full" alt="movie" loading="lazy" src={source}></img>
            <img onClick={()=>{isInWatchList(movie) ? removeItemWatchLater(movie):addItemToWatchLater(movie)}} alt="watch " src={watchList} className={`absolute z-1 w-12 h-12 p-0 m-0 watchlist cursor-pointer ${isInWatchList(movie)? "inWatchList" : "notInwatchlist"}`}></img>
        </div>
    )
}