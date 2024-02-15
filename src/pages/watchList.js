import MoviesCollection from "../components/shared/collectionMovies"
import { useWatchlaterContext } from "../context/watchLaterContext"

export default function WatchList() {
    const { watchLater } = useWatchlaterContext()
    return (
        <div className="sm:pt-10">
            <MoviesCollection title={"Watch List"} movies={watchLater}></MoviesCollection>
        </div>


    )
}