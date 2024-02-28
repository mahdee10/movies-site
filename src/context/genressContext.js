import { createContext, useContext, useEffect, useState } from "react";

const GenreContext = createContext(undefined);

export const GenreProvider = ({ children }) => {

  const [genres, setGenres] = useState(null);
  const apiKey = '75a499747ddeaacd5a5ca88536c09337';



  useEffect(() => {
    const fetchGenreIds = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`);
            const data = await response.json();
            const genreData = data.genres;
   
   
            setGenres(genreData)
  
        } catch (error) {
            console.error('Error fetching genre IDs:', error.message);
        }
    };

    fetchGenreIds();
}, []);

  return (
    <GenreContext.Provider
      value={{
        genres
      }}
    >
      {children}
    </GenreContext.Provider>
  );
};

export const useGenre = () => useContext(GenreContext);