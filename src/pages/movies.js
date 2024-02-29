import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCollection from "../components/shared/collectionMovies";

export default function Movies(){
    const [movies, setMovies] = useState(null);
    const {state} = useLocation();
    const { urlM,title,isTv } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `${urlM}`;
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
    }, [urlM]);
    return(
        <div className="sm:pt-32 pt-10 sm:px-20 px-2 pb-20 mb-10">
            {
                movies && movies.length > 0 ?
                    <MoviesCollection isTv={isTv} title={title} movies={movies}></MoviesCollection>
                    :
                    null
            }
        </div>
    )
}