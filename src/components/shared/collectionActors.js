import ActorPoster from "./actorPoster";

export default function ActorsCollection({actors}){
    return(
        actors && actors.length>0 ?(
            <div className="flex flex-col items-center w-full mt-10  w-full sm:p-0 ">
                <div  className="flex flex-wrap sm:justify-center  justify-between w-full">
                    {
                        actors.map((actor,index)=>(
                            <ActorPoster withAnimation={false} actor={actor} key={index} classContent={"sm:w-40 mt-2 sm:h-60 h-42 w-[48%] shrink-0 sm:mr-3"} source={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}></ActorPoster>
                        ))
                    }
                </div>
            </div>
        ):(
            <div className="text-white sm:text-4xl text-2xl mt-32 text-center">You did not select any favourite actor</div>
        )
    )
}