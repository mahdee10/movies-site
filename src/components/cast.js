export default function Cast({movie}){
    return(
        <div className="sm:pt-32 pt-10 sm:px-20 px-2 flex flex-col">
            <h2 className="text-white title w-fit sm:text-4xl text-3xl font-bold sm:text-start text-center sm:self-auto self-center ">Cast</h2>
            <div className="flex pt-5 justify-between flex-wrap">
                {
                    movie.credits.cast.map((actor)=>(
                        actor.known_for_department==="Acting" && actor.profile_path ? 
                        <img key={actor.id} alt="actor" className="sm:w-[210px] sm:h-[250px] mt-3 w-[49%] h-[200px]" src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}></img> 
                        : null
                    ))
                }
            </div>
        </div>
    )
}