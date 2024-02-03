import { createContext, useContext, useEffect, useState } from "react";

const MyActorsContext = createContext(undefined);

export const MyActorsProvider = ({ children }) => {
  const [myActors, setMyActors] = useState([]);

  useEffect(() => {
    // localStorage.clear()
    const storedMyActors=localStorage.getItem("myActors");
    if(storedMyActors){
        const parseMyActors=JSON.parse(storedMyActors);
        setMyActors(parseMyActors)
    }
  }, []);


  const updateAndSaveMyActors = (newActors) => {
    setMyActors((prevWatchLater) => {
        localStorage.setItem('myActors', JSON.stringify(newActors));
  
        return newActors;
      });
  };

  const addItemToMyActors = (actor) => {
    const newMyActors = [...myActors, actor];
    updateAndSaveMyActors(newMyActors);
  };

  const removeItemMyActors = (actorRemove) => {
    const newMyActors= myActors.filter(actor => actor.id !== actorRemove.id);
    updateAndSaveMyActors(newMyActors);
  };

  const isInMyActors = (actor) => {
    return Array.isArray(myActors) && myActors.some((myactor) => myactor.id === actor.id);
  };

  return (
    <MyActorsContext.Provider
      value={{
        myActors,
        removeItemMyActors,
        addItemToMyActors,
        isInMyActors
      }}
    >
      {children}
    </MyActorsContext.Provider>
  );
};

export const useMyActorsContext = () => useContext(MyActorsContext);