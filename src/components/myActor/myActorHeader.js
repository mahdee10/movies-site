import { useEffect, useState } from "react"
import s from "../../imgs/ser.png"
import ActorPoster from "../shared/actorPoster";
import { useMyActorsContext } from "../../context/myActorsContext";
import ActorsCollection from "../shared/collectionActors";

export default function MyActorsHeader() {
    const [search, setSearch] = useState("");
    const [actors, setActors] = useState([]);
    const {myActors}=useMyActorsContext()

    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${search}`;
                const options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                };

                const response = await fetch(url, options);
                const data = await response.json();
                console.log(data.results)
                setActors(data.results);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [search]);
    return (
        <>
            <div className="sm:px-20 flex justify-between sm:flex-row flex-col pt-3 items-center">
                <h1 className="sm:text-5xl text-4xl text-white font-black text-center sm:pt-0 sm:py-0 py-10 align-self-center">My Actors</h1>

                <div className='flex pl-2 sm:w-1/2 w-full cursor-pointer bg-transparent border-2 rounded-2xl border-white sm:rounded-lgg rounded-md sm:text-base text-xxxs items-center'>
                    <img className='mr-1  sm:w-fit sm:h-fit w-5 h-5' src={s} alt="Search Icon"></img>
                    <input onFocus={(e) => e.preventDefault()} onChange={(e) => { setSearch(e.target.value) }} className="bg-transparent cursor-pointer text-white w-full sm:pl-1  sm:py-2 py-2 rounded-md sm:text-base text-sm  " type="text" placeholder="You can search here for actors"></input>
                </div>
            </div>
            {
                search ? (
                    <div className="flex flex-col items-center w-full mt-10  w-full sm:p-0 ">
                        <div className="flex flex-wrap sm:justify-center  justify-between w-full">
                            {
                                actors.map((actor, index) => (
                                    actor.known_for_department === "Acting" && actor.profile_path ?(
                                    <ActorPoster withAnimation={false} actor={actor} key={index} classContent={"sm:w-40 mt-2 sm:h-60 h-42 w-[48%] shrink-0 sm:mr-3"} source={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}></ActorPoster>
                                    ):(null)
                                ))
                            }
                        </div>
                    </div>
                ) :
                    (
                        <ActorsCollection actors={myActors}></ActorsCollection>

                    )
            }
        </>
    )
}