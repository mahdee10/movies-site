import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieBP from "../../components/movie/movieBP";
import Trailer from "../../components/movie/movieTrailer";
import Cast from "../../components/movie/cast";
import SimilarMovies from "../../components/movie/similarMovies";
import { Helmet } from "react-helmet";
import TvShowDetails from "../../components/tvShow/tvshowDetails";

export default function TvShow() {
    const [tvShow, setTvShow] = useState();
    const { id } = useParams();
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';
  
    useEffect(() => {
        setTvShow(null);
        const fetchData = async () => {
            try {
                const detailsUrl = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=credits`;
                const videosUrl = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}`;

                const [detailsResponse, videosResponse] = await Promise.all([
                    fetch(detailsUrl),
                    fetch(videosUrl),
                ]);

                const [detailsData, videosData] = await Promise.all([
                    detailsResponse.json(),
                    videosResponse.json(),
                ]);
            
                setTvShow({ ...detailsData, videos: videosData.results });
               
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [id, apiKey]);

  

    return (
        <div className="pb-10">
            {tvShow ? (
                <>
                <Helmet>
                <title>{tvShow.title}</title>
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w92${tvShow.poster_path}`}/>
                <meta name="description" content={tvShow.overview} />
                </Helmet>
                    <MovieBP poster={tvShow.poster_path} background={tvShow.backdrop_path}></MovieBP>
                    <TvShowDetails movie={tvShow}></TvShowDetails>
                    <Trailer movie={tvShow}></Trailer>
                    <Cast movie={tvShow}></Cast>
                    <SimilarMovies id={tvShow.id}></SimilarMovies>
                   
                </>
            ) : (
                null
            )}
        </div>
    );
}
