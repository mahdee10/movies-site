import { useEffect, useState } from "react";
import Poster from "./moviePoster";

export default function SimilarMovies({id}){

    const [movies, setMovies] = useState(null);
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`;
                const options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                };

                const response = await fetch(url, options);
                const data = await response.json();

                setMovies(data.results);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id]);
    return(
        <div className="sm:pt-32 pt-10 sm:px-20 px-2" >
            <div className="flex justify-between items-center">
                <h2 className="text-white text-3xl title">Similar Movies</h2>
            </div>
            <div id="movieListContainer" className="flex mt-5" style={{ position: 'relative', whiteSpace: 'nowrap', overflowX: 'auto' }}>
                {movies && movies.length > 0 ? (
                    movies.map((movie,index) => (
                        <Poster movie={movie} key={index} classContent={"w-40 h-60 shrink-0 mr-3"} source={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></Poster>
                    ))
                ) : (
                    <p>loading...</p>
                )}
            </div>
        </div>
    )
}