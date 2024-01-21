export default function ActorDescription({ actor }) {
    return (
        <div className="flex sm:flex-row flex-col  sm:pt-10 ">
            <div className=" sm:w-[48%] sm:pt-0 justify-center">
                <img className="sm:rounded-xl sm:w-[60%] sm:h-[400px] h-[500px] sm:mt-0 mt-3" src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt=""></img>
            </div>
            <div className="flex flex-col sm:items-start items-center sm:w-[48%]   sm:pt-0 pt-10 px-2 ">
                {/* <p className="text-white  sm:w-[50%] sm:mt-0 mt-1"><span className="text-voilet">Release Year:</span>{actor}</p> */}
                <h2 className="block text-center sm:text-3xl text-2xl text-white font-bolder    title w-fit">{actor.name}</h2>

            </div>
        </div>
    )
}