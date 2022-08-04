
import { useEffect, useState } from 'react'
import { getPokemon } from './Api.js'
import Navbar from './components/Navbar.jsx'
import Pokedex from './components/Pokedex.jsx'
import SearchBar from './components/SearchBar'
import './styles/app.css'
import './styles/global.css'



function App() {

  const [loading, setloading] = useState(false);
  const [pokemons, setpokemons] = useState([]);

  const fetchPokemons =  async () =>  {
    try {
      setloading(true)
      const result  = await getPokemon()
      setpokemons(result)
      setloading(false)
    } catch (error) {
      console.log('fetchError :', error)
    }
  }
  useEffect(() => {
    fetchPokemons();
  },[]);

  return (
    <>
      <Navbar/>
      <SearchBar/>
      <Pokedex pokemons={pokemons} loading={loading}/>
    </>
    
  )
}

export default App
