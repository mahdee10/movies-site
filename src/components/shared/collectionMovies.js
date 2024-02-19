import Poster from "./moviePoster";

export default function MoviesCollection({movies,title}){
    console.log(title)

    return(
        movies && movies.length>0? (
            
            <div className="flex flex-col items-center w-full mt-10  w-full sm:p-0 p-3">
                {title.length? <h2 className="text-white sm-5xl text-4xl">{title}</h2>:"null"}
                <div  className="flex flex-wrap sm:justify-center  justify-between w-full">
                    {
                        movies.map((movie,index)=>(
                            <Poster withAnimation={true} movie={movie} key={index} classContent={"sm:w-40 mt-2 sm:h-60 h-42 w-[48%] shrink-0 sm:mr-3"} source={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></Poster>
                        ))
                    }
                </div>
            </div>
            
        ):(
            <div className="text-white sm:text-4xl text-2xl mt-32 text-center">No Movies in the {title}</div>
        )
    )
}