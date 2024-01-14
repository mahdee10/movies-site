import MoviesCollection from "../components/shared/collectionMovies"
import { useWatchlaterContext } from "../context/watchLaterContext"

export default function WatchList() {
    const { watchLater } = useWatchlaterContext()
    return (

        <MoviesCollection title={"Watch List"} movies={watchLater}></MoviesCollection>

    )
}