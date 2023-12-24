import s from "../imgs/ser.png"
import close from "../imgs/close.png"
import { useEffect, useState } from "react"
import "../styles/search.css"
export default function SearchModal({ closeModal }) {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("a");
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key=${apiKey}&query=${search}`;
                const options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                };

                const response = await fetch(url, options);
                const data = await response.json();
                // console.log(data)
                setMovies(data.results);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [search]);
    return (
        <div className="modal-overlay z-10 fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div className="modal-content bg-black sm:max-w-3/5 sm:w-3/5 sm:max-h-3/5 sm:h-3/5 w-full h-full rounded-xl p-5 overflow-y-auto scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                <div className="flex justify-between items-center">
                    <div className='flex pl-2 sm:w-1/2 w-5/6 cursor-pointer bg-transparent border-2 rounded-2xl border-white sm:rounded-lgg rounded-md sm:text-base text-xxxs items-center'>
                        <img className='mr-1  sm:w-fit sm:h-fit w-5 h-5' src={s} alt="Search Icon"></img>
                        <input onChange={(e)=>{setSearch(e.target.value)}} className="bg-transparent cursor-pointer text-white w-full sm:pl-1  sm:py-2 py-2 rounded-md sm:text-base text-sm  " type="text" placeholder="Search for movies or tv series"></input>
                    </div>
                    <img src={close} alt="close" className='mr-1 cursor-pointer sm:w-fit sm:h-fit w-5 h-5' onClick={closeModal}></img>
                </div>

                <div className="flex justify-between flex-wrap ">
                    {
                        movies.map((movie)=>{
                            return(
                                <img className="sm:w-[22%] sm:h-52 w-[46%] h-52 mt-5" alt="daf" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
                            )
                        })
                    }
                </div>


            </div>
        </div>
    )
}