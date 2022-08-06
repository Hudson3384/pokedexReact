import { useEffect, useState } from "react";
import { getPokemons, getPokemonsData, searchPokemon } from "./Api.js";
import Navbar from "./components/Navbar.jsx";
import Pokedex from "./components/Pokedex.jsx";
import SearchBar from "./components/SearchBar";
import { FavoriteProvider } from "./contexts/favoritesContext.jsx";
import "./styles/app.css";
import "./styles/global.css";

function App() {

  const favoritesKey = 'FavoritesPokemons'
  const itensPerPage = 46;

 
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setloading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [pokemons, setpokemons] = useState([]);
  const [favorites, setFavorites] = useState([])
  

  const fetchPokemons = async () => {
    try {
      setNotFound(false)
      setloading(true);
      const data = await getPokemons(itensPerPage, itensPerPage*page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonsData(pokemon.url);
      });
      const results = await Promise.all(promises);
      setpokemons(results);
      setTotalPages(Math.ceil(data.count / itensPerPage));
      setloading(false);
    } catch (error) {
      console.log("fetchError :", error);
    }
  }

  const updateFavoritePokemons = (name) => {
      const updatedFavorites = [...favorites]
      const favoriteIndex = favorites.indexOf(name)
      if (favoriteIndex >= 0)  {
        updatedFavorites.splice(favoriteIndex, 1)}
      else {updatedFavorites.push(name) }
      window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
      setFavorites(updatedFavorites)
  }
  
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  const onSearchHandler = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons()
    } 
    
      setloading(true)
      setNotFound(false)
      const result = await searchPokemon(pokemon)
      if(!result) {
        setNotFound(true)
      } else {
        setpokemons([result])
        setPage(0)
        setTotalPages(1)
      }
      setloading(false)
  }

  useEffect(() => {
    loadFavoritePokemons();
  }, []);
  useEffect(() => {
    fetchPokemons();
  }, [page]);

  return (
      <FavoriteProvider
        value={{favoritePokemons: favorites,
          updateFavoritePokemons: updateFavoritePokemons
          }}>
          <Navbar />
          <SearchBar onSearch={onSearchHandler}/>
          {notFound ? <h3>Pokemon não existente!</h3>:
          <Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />
          }
        
      </FavoriteProvider>

  );
}

export default App;
