import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GenreHeader from "../../components/genre/genreHeader";
import MoviesCollection from "../../components/shared/collectionMovies";

export default function Genre() {
    const [movies, setMovies] = useState()
    const { id } = useParams()
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    useEffect(() => {
        setMovies(null)
        const fetchData = async () => {
            try {
                const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${id}`;
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
    return (
        <div className="sm:pt-32 pt-10 sm:px-20 px-2 pb-20">
            <GenreHeader ></GenreHeader>
            {
                movies && movies.length > 0 ?
                    <MoviesCollection title={id} movies={movies}></MoviesCollection>
                    :
                    null
            }
        </div>
    )
}