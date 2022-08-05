import { useEffect, useState } from "react";
import { getPokemons, getPokemonsData } from "./Api.js";
import Navbar from "./components/Navbar.jsx";
import Pokedex from "./components/Pokedex.jsx";
import SearchBar from "./components/SearchBar";
import "./styles/app.css";
import "./styles/global.css";

function App() {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setloading] = useState(false);
  const [pokemons, setpokemons] = useState([]);
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
  };
  useEffect(() => {
    fetchPokemons();
  }, [page]);

  return (
    <>
      <Navbar />
      <SearchBar />
      <Pokedex
        pokemons={pokemons}
        loading={loading}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  );
}

export default App;
