import { useEffect, useState } from "react";

export default function Genres() {

    const [genres, setGenre] = useState(null);
    const apiKey = '75a499747ddeaacd5a5ca88536c09337';

    useEffect(() => {
        const fetchGenreIds = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
                const data = await response.json();
                const genreData = data.genres;
                console.log(genreData)
                setGenre(genreData)
            } catch (error) {
                console.error('Error fetching genre IDs:', error.message);
            }
        };

        fetchGenreIds();
    }, []);

    return (
        <div className="bg-[#10100c] flex-col flex w-full justify-center items-center p-5 sm:my-10 my-5">
            <h1 className="sm:text-4xl text-2xl text-white font-bold pb-5">Genres</h1>
            <div className="flex md:w-1/2 flex-wrap justify-between">
                {genres && genres.length > 0 ? (
                     genres.map((genre) => (
                        genre.name !== "Western" && genre.name !== "Science Fiction" && genre.name !== "TV Movie" && genre.name !== "Documentary" && (
                        <div
                         key={genre.id} className="genre-item cursor-pointer bg-[#131519] flex justify-center items-center  text-white sm:text-sm text-xs mt-2 sm:w-28 sm:h-28 w-16 h-16 rounded-xl">
                          {genre.name}
                        </div>
                        )
                      ))
                ) : (
                    <div>loading...</div>
                )
                }
            </div>
        </div>
    )
}