
import { useNavigate } from "react-router-dom";
import { useGenre } from "../../context/genressContext";

export default function Genres() {

    const {genres}=useGenre()
    const navigate=useNavigate()

    function navigation(genre){
        navigate(`/genre/${genre.id}`)
    }

    return (
        <div className="bg-[#10100c] flex-col flex w-full justify-center items-center p-5 sm:my-10 my-5">
            <h1 className="sm:text-4xl text-2xl text-white font-bold pb-5">Genres</h1>
            <div className="flex md:w-1/2 flex-wrap justify-between">
                {genres && genres.length > 0 ? (
                     genres.map((genre) => (
                        genre.name !== "Western" && genre.name !== "Science Fiction" && genre.name !== "TV Movie" && genre.name !== "Documentary" && (
                        <div
                        onClick={()=>{navigation(genre)}}
                         key={genre.id} className="genre-item cursor-pointer bg-[#131519] flex justify-center items-center  text-white sm:text-sm text-xs mt-2 sm:w-28 sm:h-28 w-16 h-16 rounded-xl">
                          {genre.name}
                        </div>
                        )
                      ))
                ) : (
                    <div>loading...</div>
                )
                }
            </div>
        </div>
    )
}