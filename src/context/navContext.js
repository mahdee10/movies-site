import {createContext, useContext, useState} from "react"; 

const CityContext = createContext(undefined); 

export const CityProvider = ({ children }) => { 
  const [navbarOpaque, setNavbarOpaque] = useState(false);


  return ( 
    <CityContext.Provider 
      value={{ 
        city,
        onChangeCity: (newCity) => setState(newCity), 
      }} 
    > 
      {children} 
    </CityContext.Provider> 
  ); 
}; 

export const useCityContext = () => useContext(CityContext);