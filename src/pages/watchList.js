import Poster from "../components/moviePoster"
import { useWatchlaterContext } from "../context/watchLaterContext"

export default function WatchList(){
    const {watchLater}=useWatchlaterContext()
    return(
        
            watchLater && watchLater.length>0? (
                <div className="flex sm:justify-center sm:w-3/4 sm:mt-32 mt-20 w-full sm:p-0 p-2">
                    <div className="flex flex-wrap sm:justify-center justify-between w-full">
                        {
                            watchLater.map((movie,index)=>(
                                <Poster movie={movie} key={index} classContent={"sm:w-40 sm:h-60 h-42 w-1/2 shrink-0 sm:mr-3"} source={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></Poster>
                            ))
                        }
                    </div>
                </div>
            ):(
                <div className="text-white sm:text-4xl text-2xl mt-32 text-center">No Movies in the WatchList</div>
            )
        
    )
}