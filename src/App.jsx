import { useEffect, useState } from "react";
import { getPokemons, getPokemonsData } from "./Api.js";
import Navbar from "./components/Navbar.jsx";
import Pokedex from "./components/Pokedex.jsx";
import SearchBar from "./components/SearchBar";
import { FavoriteProvider } from "./contexts/favoritesContext.jsx";
import "./styles/app.css";
import "./styles/global.css";

function App() {
  const favoritesKey = 'f'
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setloading] = useState(false);
  const [pokemons, setpokemons] = useState([]);
  const [favorites, setFavorites] = useState([])
  const itensPerPage = 46;
  
  const fetchPokemons = async () => {
    try {
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
  
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);


  const updateFavoritePokemons = (name) => {
      const updatedFavorites = [...favorites]
      const favoriteIndex = favorites.indexOf(name)
      if (favoriteIndex >= 0)  {
        updatedFavorites.splice(favoriteIndex, 1)}
      else {updatedFavorites.push(name) }
      window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites))
      setFavorites(updatedFavorites)}
  return (
      <FavoriteProvider
      value={{favoritePokemons: favorites,
         updateFavoritePokemons: updateFavoritePokemons
        }}>
        <Navbar />
        <SearchBar />
        <Pokedex
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </FavoriteProvider>

  );
}

export default App;
