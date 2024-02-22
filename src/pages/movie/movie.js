import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieBP from "../../components/movie/movieBP";
import MovieDetails from "../../components/movie/movieDetails";
import Trailer from "../../components/movie/movieTrailer";
import Cast from "../../components/movie/cast";
import SimilarMovies from "../../components/movie/similarMovies";
import { Helmet } from "react-helmet";

export default function Movie() {
    const [movie, setMovie] = useState();
    const { id } = useParams();
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    useEffect(() => {
        setMovie(null);
        const fetchData = async () => {
            try {
                const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits`;
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

    // useEffect(() => {
    //     // Update meta tags for sharing when movie data changes
    //     if (movie) {
    //         // updateMetaTags(movie);
    //     }
    // }, [movie]);



    // const updateMetaTags = (movie) => {
    //     const ogImageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    //     const ogTitle = movie.title;
    //     const ogDescription = movie.overview;
    //     const ogUrl = window.location.href;

    //     document.title = ogTitle;

    //     // Remove existing Open Graph meta tags
    //     const existingOGMetaTags = document.head.querySelectorAll('meta[property^="og:"]');
    //     existingOGMetaTags.forEach((tag) => tag.remove());

    //     // Function to add meta tag
    //     const metaTag = (property, content) => {
    //         const meta = document.createElement('meta');
    //         meta.setAttribute('property', property);
    //         meta.content = content;
    //         document.head.appendChild(meta);
    //     };

    //     // Add new Open Graph meta tags
    //     metaTag('og:title', ogTitle);
    //     metaTag('og:description', ogDescription);
    //     metaTag('og:image', ogImageUrl);
    //     metaTag('og:url', ogUrl);
    // };



    return (
        <div className="pb-10">
            {movie ? (
                <>
                <Helmet>
                <title>{movie.title}</title>
                <meta property="og:image" content={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}/>
                <meta name="description" content={movie.overview} />
                </Helmet>
                    <MovieBP poster={movie.poster_path} background={movie.backdrop_path}></MovieBP>
                    <MovieDetails movie={movie}></MovieDetails>
                    <Trailer movie={movie}></Trailer>
                    <Cast movie={movie}></Cast>
                    <SimilarMovies id={movie.id}></SimilarMovies>
                   
                </>
            ) : (
                null
            )}
        </div>
    );
}
