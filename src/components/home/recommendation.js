import { useEffect, useState } from "react";
import { useViewedMovies } from "../../context/viewedMovieContext";
import Poster from "../shared/moviePoster";
import { useNavigate } from "react-router-dom";

export default function Recommendation() {
    const { viewedMovies } = useViewedMovies();
    const [recommendedMovies,setRecommended]=useState(null);
    const [topGenres,setTopGenres]=useState(null);
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';
    const navigate = useNavigate();

    useEffect(() => {
        if(viewedMovies.length>0){
        function commonGenres() {
            console.log(viewedMovies)
            const allGenres = viewedMovies.flatMap((movie) => {
                return movie.genre_ids;
            })

            const genreCount = allGenres.reduce((countGenres, genre) => {
                countGenres[genre] = (countGenres[genre] || 0) + 1;
                return countGenres;
            }, {});

            const topGenres = Object.entries(genreCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 2)
                .map(([genre]) => genre);

            return topGenres;
        }
        const topGenres = commonGenres()
        console.log(topGenres)
        setTopGenres(topGenres);
    }
    }, [viewedMovies])



    useEffect(() => {
        if(topGenres){
        const fetchData = async () => {
            try {
                const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${topGenres[0]},${topGenres[1]}`;
                const options = {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                };

                const response = await fetch(url, options);
                const data = await response.json();

                setRecommended(data.results);
                
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }
    }, [topGenres]);

    return (
        <div className="px-4 mt-3" >
            <div className="flex justify-between items-center">
                <h2 className="text-white text-3xl title pb-10">Recommendation</h2>
                <p className="text-white cursor-pointer"  onClick={()=>{navigate('/movies', { state: { urlM: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&with_genres=${topGenres[0]},${topGenres[1]}`,title: "Recommendation" } });}}>View all</p>
            </div>
            <div id="movieListContainer" className="flex mt-5" style={{ position: 'relative', whiteSpace: 'nowrap', overflowX: 'auto' }}>
                {recommendedMovies && recommendedMovies.length > 0 ? (
                    recommendedMovies.map((movie,index) => (
                        <Poster movie={movie} key={index} classContent={"w-40 h-60 shrink-0 mr-3"} source={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></Poster>
                    ))
                ) : (
                    <p>loading...</p>

                )}
            </div>
        </div>
    )
}