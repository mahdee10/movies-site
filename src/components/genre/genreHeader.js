import { useNavigate, useParams } from "react-router-dom"
import { useGenre } from "../../context/genressContext"

export default function GenreHeader(){
    const navigate=useNavigate()
    function navigation(genre){
        navigate(`/genre/${genre.id}`)
    }
    const { genres } = useGenre()
    const { id } = useParams()
   
    return (
        <div className="flex justify-between flex-wrap">
            {
                genres && genres.length>0?(
                genres.map((genre) => (
                    genre.name !== "Western" && genre.name !== "Science Fiction" && genre.name !== "TV Movie" && genre.name !== "Documentary" && (
                    <div
                    onClick={()=>{navigation(genre)}}
                     key={genre.id} className={` cursor-pointer bg-[#131519] flex justify-center items-center  text-white sm:text-xs text-xs mt-2 sm:w-16 sm:h-16 w-16 h-16 rounded-xl ${parseInt(id, 10) === genre.id  ?"bg-voilet":"genre-item"}`}>
                      {genre.name}
                    </div>
                    )
                  ))
                ):
                    null
            }
        </div>
    )
}