import React, { useContext } from "react";
import favoritesContext from '../contexts/favoritesContext';

const Navbar = () => {

    const {favoritePokemons} = useContext(favoritesContext)
    return (
        <>
            <nav>
            <img 
                src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
                alt="logo da Pokedex API"
                className="navbar-img"
                 />
        </nav>
        <div>{favoritePokemons.length}❤</div>
        </>
    )
}

export default Navbar