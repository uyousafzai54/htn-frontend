import React, { useState } from "react";

const HeroContext = React.createContext({});

const HeroProvider = props => {

  const [heroes, setHeroes] = useState([]);

  const heroContext = {
    heroesContext: heroes,
    feedHeroes: arrayFromAPI => {
      setHeroes([...arrayFromAPI]);
    }
  };


  return (
    <HeroContext.Provider value={heroContext}>
      {props.children}
    </HeroContext.Provider>
  );
};

export { HeroContext, HeroProvider };