import { useWatchlaterContext } from "../context/watchLaterContext"
import watchIcon from "../../src/imgs/fav.png"
export default function MovieDetails({ movie }) {

    const { removeItemWatchLater, addItemToWatchLater, isInWatchList } = useWatchlaterContext()
    return (
        <div className="sm:pt-32 pt-10 sm:px-20 px-2">
            <div className="flex sm:flex-row flex-col  justify-between ">
                <h1 className="sm:text-5xl text-3xl text-white font-black sm:text-start sm:order-1 order-2 sm:pt-0 pt-10">{movie.original_title}</h1>
                <div onClick={() => { isInWatchList(movie) ? removeItemWatchLater(movie) : addItemToWatchLater(movie) }} className={`${isInWatchList(movie) ? "bg-[red]" : "bg-voilet"} cursor-pointer text-white rounded-xl p-2  w-fit watchList flex justify-between items-center sm:order-2 order-1 sm:self-auto self-end `}>
                    <img src={watchIcon} className="w-5 h-5" alt="watch"></img>
                    <p className="sm:text-base text-xs">{isInWatchList(movie) ? "Remove from WatchLater" : "Add to WatchLater"}</p>
                </div>
            </div>

        </div>
    )
}