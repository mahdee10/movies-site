import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MovieBP from "../../components/movie/movieBP";
import MovieDetails from "../../components/movie/movieDetails";
import Trailer from "../../components/movie/movieTrailer";
import Cast from "../../components/movie/cast";
import SimilarMovies from "../../components/movie/similarMovies";

export default function Movie() {
    const [movie, setMovie] = useState()
    const { id } = useParams()
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';
   

    useEffect(() => {
        setMovie(null)
        const fetchData = async () => {
            try {
                const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=75a499747ddeaacd5a5ca88536c09337&append_to_response=credits`;
                const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;

                const [detailsResponse, videosResponse] = await Promise.all([
                    fetch(detailsUrl),
                    fetch(videosUrl),
                ]);

                const [detailsData, videosData] = await Promise.all([
                    detailsResponse.json(),
                    videosResponse.json(),
                ]);

        

                setMovie({ ...detailsData, videos: videosData.results });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id, apiKey]);

    return (
        <div className="pb-10">
            {
                movie ? (
                    <>
                        <MovieBP poster={movie.poster_path} background={movie.backdrop_path}></MovieBP>
                        <MovieDetails movie={movie}></MovieDetails>
                        <Trailer movie={movie}></Trailer>
                        <Cast movie={movie}></Cast>
                        <SimilarMovies id={movie.id}></SimilarMovies>
                    </>
                ) : (
                    null
                )
            }
        </div>
    )
}