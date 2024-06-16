export default function ActorDescription({ actor }) {
    console.log(actor)

    function convertDate(dateI){
        const date= new Date(dateI);
        return date.toLocaleDateString('en-GB')
    }
    return (
        <div className="flex sm:flex-row items-center flex-col justify-between  sm:pt-10 ">
            <div className=" sm:w-[35%] sm:pt-0 ">
                <img className="sm:rounded-xl sm:w-full sm:h-[400px] h-[500px] sm:mt-0 mt-3" src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt=""></img>
            </div>
            <div className="flex flex-col sm:items-start items-center sm:w-[63%]   sm:pt-0 pt-10 px-2 ">
                {/* <p className="text-white  sm:w-[50%] sm:mt-0 mt-1"><span className="text-voilet">Release Year:</span>{actor}</p> */}
                <h2 className="block text-center sm:text-3xl text-2xl text-white font-bolder    title w-fit">{actor.name}</h2>
               {actor.place_of_birth && <p className="sm:mt-5 mt-5 sm:text-xl text-base text-white">Born in: {actor.place_of_birth}</p>} 
               {actor.birthday && <p className="sm:mt-5 mt-3 sm:text-xl text-base text-white">BirthDay: {convertDate(actor.birthday)}</p>} 
            </div>
        </div>
    )
}