import React, {useState } from 'react';
import { searchPokemon } from '../Api';



   
const SearchBar = () => {

    const [search, setSearch] = useState("dito");
    const [pokemon, setPokemon] = useState()

    const onSearchHandler = async (pokemon) => {
        const result = await searchPokemon(pokemon)
        setPokemon(result)
      }
    const onChangeHandler = (e) => {
        setSearch(e.target.value)
    }

    const onButtonClickHandler = () => {
        onSearchHandler(search)
    }

    
    return (
        <div className='searchbar-content'>
           <div className='search-bar'>
                <input placeholder='Pesquise o pokemon' onChange={onChangeHandler}/>
            </div>
            <div className='search-btn'>
                <button onClick={onButtonClickHandler}>Buscar</button>
            </div>
            {pokemon ? 
            <div>
                <div>{pokemon.name}</div>
                <div>{pokemon.weight}</div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            </div>
             : null}
        </div>
    );
}

export default SearchBar;
