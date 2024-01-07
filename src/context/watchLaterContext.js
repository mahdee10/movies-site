import { createContext, useContext, useEffect, useState } from "react";

const WatchLaterContext = createContext(undefined);

export const WatchLaterProvider = ({ children }) => {
  const [watchLater, setWatchLater] = useState([]);

  useEffect(() => {
    console.log(localStorage.getItem('watchLater'))
    const storedWatch = localStorage.getItem('watchLater');
    if (storedWatch) {
      const parsedWatch = JSON.parse(storedWatch);
      setWatchLater(parsedWatch);
    }
  }, []);


  const updateAndSaveWatchLater = (newWatchLater) => {
    setWatchLater((prevWatchLater) => {
      localStorage.setItem('watchLater', JSON.stringify(newWatchLater));
      console.log(localStorage.getItem('watchLater'));
      console.log(newWatchLater); 
      return newWatchLater;
    });
  };

  const addItemToWatchLater = (movie) => {
    const newWatchLater = [...watchLater, movie];
    updateAndSaveWatchLater(newWatchLater);
  };

  const removeItemWatchLater = (movieRemove) => {
    const newWatchLater = watchLater.filter(movie => movie.id !== movieRemove.id);
    updateAndSaveWatchLater(newWatchLater);
  };

  const isInWatchList = (movie) => {
    return Array.isArray(watchLater) && watchLater.some((watchedMovie) => watchedMovie.id === movie.id);
  };

  return (
    <WatchLaterContext.Provider
      value={{
        watchLater,
        removeItemWatchLater,
        addItemToWatchLater,
        isInWatchList
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

export const useWatchlaterContext = () => useContext(WatchLaterContext);