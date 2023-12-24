import { useEffect, useState } from "react";

export default function MovieList({ urlM, title }) {
    const [movies, setMovies] = useState(null);
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${urlM}${apiKey}`;
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
    }, []);


    return (
        <div className="px-4 mt-3" >
            <div className="flex justify-between items-center">
                <h2 className="text-white text-3xl title">{title}</h2>
                <p className="text-white">View all</p>
            </div>
            <div id="movieListContainer" className="flex mt-5" style={{ position: 'relative', whiteSpace: 'nowrap', overflowX: 'hidden' }}>
                {movies && movies.length > 0 ? (
                    movies.map((movie) => (
                        <img loading="lazy" className="w-40 h-60 shrink-0 mr-3" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
                    ))
                ) : (
                    <p>loading...</p>

                )}
            </div>
        </div>
    )
}