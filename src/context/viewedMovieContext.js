import { createContext, useContext, useEffect, useState } from "react";

const ViewedMoviesContext = createContext(undefined);

export const ViewedMoviesProvider = ({ children }) => {
    const [viewedMovies,setViewedMovies]=useState([]);

    useEffect(()=>{
        const storedViewed=localStorage.getItem("viewedMovies");
        if(storedViewed){
            const parsedViewed=JSON.parse(storedViewed);
            setViewedMovies(parsedViewed);
          
        }
    },[])

    function addViewed(movie){
        const newMovies=[...viewedMovies,movie];
        updateViewed(newMovies)
    }

    function updateViewed(newMovies){
        setViewedMovies(newMovies)
        localStorage.setItem('viewedMovies', JSON.stringify(newMovies));
    }



  return (
    <ViewedMoviesContext.Provider
      value={{
        addViewed,
        viewedMovies
      }}
    >
      {children}
    </ViewedMoviesContext.Provider>
  );
};

export const useViewedMovies = () => useContext(ViewedMoviesContext);