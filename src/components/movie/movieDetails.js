import { WhatsappShareButton } from "react-share";
import { useWatchlaterContext } from "../../context/watchLaterContext"
import watchIcon from "../../imgs/fav.png"
export default function MovieDetails({ movie }) {

    const { removeItemWatchLater, addItemToWatchLater, isInWatchList } = useWatchlaterContext();
    const runtimeInMinutes = movie.runtime;
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;

    const movieUrl = `https://cinemaxxxx.netlify.app/movie/${movie.id}`;
    const message = `Check out this movie: ${movie.title}`;
    // const imageUrl = movie.previewPhotoUrl;
  
    return (
        <div className="sm:pt-32 pt-10 sm:px-20 px-2">
            <div className="flex sm:flex-row flex-col  justify-between ">
                <h1 className="sm:text-5xl text-4xl text-white font-black sm:text-start sm:order-1 order-2 sm:pt-0 pt-10">{movie.original_title}</h1>
                {/* <a className="text-white" href="whatsapp://send?text=">Start a WhatsApp Chat</a>  */}
                <WhatsappShareButton url={movieUrl} title={message} separator=" - " className="share-button text-white">
                <img src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} alt="WhatsApp" />
                </WhatsappShareButton>
                <div onClick={() => { isInWatchList(movie) ? removeItemWatchLater(movie) : addItemToWatchLater(movie) }} className={`${isInWatchList(movie) ? "bg-[red]" : "bg-voilet"} cursor-pointer text-white rounded-xl p-2  w-fit watchList flex justify-between items-center sm:order-2 order-1 sm:self-auto self-end `}>
                    <img src={watchIcon} className="w-5 h-5" alt="watch"></img>
                    <p className="sm:text-base text-xs">{isInWatchList(movie) ? "Remove from WatchLater" : "Add to WatchLater"}</p>
                </div>
            </div>
            <div className="flex sm:flex-row flex-col justify-between sm:pt-20">
                <div className=" flex flex-col sm:w-[48%] sm:pt-0 pt-10 sm:order-1 order-2">
                    <h2 className="sm:hidden block text-center sm:text-3xl text-2xl text-white font-bolder  sm:self-auto self-center  title w-fit">Description</h2>
                    <p className="sm:text-2xl text-xl text-[#9f9fa7] sm:text-start text-center sm:mt-0 mt-3">{movie.overview}</p>
                </div>
                <div className="flex flex-col sm:w-[48%] text-xl sm:items-end sm:pt-0 pt-10 sm:order-2 order-1">
                    <p className="text-white  sm:w-[50%] sm:mt-0 mt-1"><span className="text-voilet">Release Year:</span>{` ${movie.release_date.slice(0,4)}`}</p>
                    <p className="text-white sm:w-[50%] sm:mt-0 mt-1"><span className="text-voilet">Run Time:</span>{` ${hours}h ${minutes}min`}</p>
                    <p className="text-white sm:w-[50%] sm:mt-0 mt-1"><span className="text-voilet">Vote Average:</span>{` ${Math.floor(movie.vote_average)}`}</p>
                    <p className="text-white  sm:w-[50%] sm:mt-0 mt-1"><span className="text-voilet">Genres:</span> {`${
                        movie.genres.map((genre)=>(
                            genre.name
                        ))
                    } `}</p>

                </div>
            </div>
        </div>
    )
}