import React, { useContext } from 'react';
import favoritesContext from '../contexts/favoritesContext';

const Pokemon = ({pokemon}) => {
    const {favoritePokemons,updateFavoritePokemons} = useContext(favoritesContext)

    const onHeartClick = () => {
        updateFavoritePokemons(pokemon.name)
    }
    const heart =  favoritePokemons.includes(pokemon.name) ? "❤️" : "🖤"
    return (
        <article className='pokemon-card'>      
            <div className="pokemon-img-container">
                <img alt={pokemon.name} src={pokemon.sprites.front_default} className="pokemon-image"/>
            </div>
            <div className='card-body'>
                <div className="card-top">
                    <h3>{pokemon.name}</h3>
                    <p>#{pokemon.id}</p>
                </div>
                <div className="card-bottom">
                    <div className="pokemon-type">
                        {pokemon.types.map((type, index) =>{
                            return (
                                <div key={index}  className='pokemon-type-text'>{type.type.name}</div>)
                        })}
                    </div>
                    <button onClick={onHeartClick} className="button">{heart}</button>
                </div>
            </div>
           
        </article>
    );
}

export default Pokemon;
