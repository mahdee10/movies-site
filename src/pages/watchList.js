import MoviesCollection from "../components/shared/collectionMovies"
import { useWatchlaterContext } from "../context/watchLaterContext"

export default function WatchList() {
    const { watchLater } = useWatchlaterContext()
    return (
        <div className="sm:pt-[100px]">
            <MoviesCollection title={"Watch List"} movies={watchLater}></MoviesCollection>
        </div>


    )
}