import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieBP from "../../components/movie/movieBP";
import MovieDetails from "../../components/movie/movieDetails";
import Trailer from "../../components/movie/movieTrailer";
import Cast from "../../components/movie/cast";
import SimilarMovies from "../../components/movie/similarMovies";
import s from "../../imgs/ser.png"
export default function Movie() {
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const apiKey = '75a499747ddeaacd5a5ca88536c09337';

  useEffect(() => {
    setMovie(null);
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

  useEffect(() => {
    // Add Open Graph meta tags dynamically
    const setMetaTags = () => {
      if (movie && movie.title && movie.overview && movie.poster_path) {
        const ogImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        // Create or select meta elements
        let titleMeta = document.head.querySelector('meta[property="og:title"]');
        let descriptionMeta = document.head.querySelector('meta[property="og:description"]');
        let imageMeta = document.head.querySelector('meta[property="og:image"]');

        // Create meta elements if not present
        if (!titleMeta) {
          titleMeta = document.createElement('meta');
          titleMeta.setAttribute('property', 'og:title');
          document.head.appendChild(titleMeta);
        }

        if (!descriptionMeta) {
          descriptionMeta = document.createElement('meta');
          descriptionMeta.setAttribute('property', 'og:description');
          document.head.appendChild(descriptionMeta);
        }

        if (!imageMeta) {
          imageMeta = document.createElement('meta');
          imageMeta.setAttribute('property', 'og:image');
          document.head.appendChild(imageMeta);
        }

        // Set content
        titleMeta.content = movie.title;
        descriptionMeta.content = movie.overview;
        imageMeta.content = ogImage;
      }
    };

    setMetaTags();
  }, [movie]);


  return (
    <div className="pb-10">
      {movie ? (
        <>
          <MovieBP
            poster={movie.poster_path}
            background={movie.backdrop_path}
          ></MovieBP>
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
