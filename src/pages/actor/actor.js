import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActorDescription from "../../components/actor/actorDescription";
import MoviesCollection from "../../components/shared/collectionMovies";

export default function Actor() {
    const [movies, setMovies] = useState();
    const [actor, setActor] = useState();
    const { id } = useParams()
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    useEffect(() => {
        // setMovies(null)
        const fetchData = async () => {
            try {
                const url = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`;
                const url2 = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`;
                const options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                };

                const response = await fetch(url, options);
                const response2 = await fetch(url2, options);
                const data = await response.json();
                const data2 = await response2.json();
                setActor(data);
                setMovies(data2)
                console.log(data2)

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id]);
    return (
        <div className="sm:pt-32  sm:px-20  pb-20">

            {actor && movies? (
                <>
                    <ActorDescription actor={actor}></ActorDescription>
                    <MoviesCollection  movies={movies.cast}></MoviesCollection>
                </>
            ) : (
                <p>loading...</p>
            )}
        </div>
    )
}