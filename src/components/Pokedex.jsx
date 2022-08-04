import React from 'react';
import Pokemon from './Pokemon';

const Pokedex = ({pokemons, loading}) => {
    return (
        <>
            <div className='pokedex-header'>
                <h1>Pokedex</h1>
                <div>Páginação </div>
            </div>
            <main>
                {loading 
                ? (<h3>Carregando Pokedex ...</h3> )
                : (<div className="pokedex-grid">
                   {pokemons.map((pokemon)=>{
                    console.log(pokemon)
                   })}
                </div>)
                }
            </main>    
        </>
        
    );
}

export default Pokedex;
