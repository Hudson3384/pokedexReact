import React from 'react';
import Pagination from './Pagination';
import Pokemon from './Pokemon';

const Pokedex = ({pokemons, loading, page, setPage, totalPages } ) => {

    const onLeftClickHandler = () => {
        setPage(page > 0 && (page-1))
    }
    const onRightClickHandler = () => {
        setPage(page+1 <= totalPages && (page+1))
    }
    

    return (
        <>
            <div className='pokedex-header'>
                {/* <h1>Pokedex</h1> */}
                <Pagination
                page={page+1}
                totalPages={totalPages}               
                onRightClick={onRightClickHandler}
                onLeftClick={onLeftClickHandler}
                
                />
            </div>
            <main>
                {loading 
                ? (<h3>Carregando Pokedex ...</h3> )
                : (<div className="pokedex-grid">
                   {pokemons.map((pokemon)=>(<Pokemon key={pokemon.id} pokemon={pokemon}/>))}
                </div>)
                }
            </main>    
        </>
        
    );
}

export default Pokedex;
