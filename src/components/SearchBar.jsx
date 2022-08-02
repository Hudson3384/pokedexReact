import React from 'react';

const SearchBar = () => {
    return (
        <div className='searchbar-container'>
           <div className='search-bar'>
                    <input placeholder='Pesquise o pokemon'/>
            </div>
            <div>
                <button>Buscar</button>
            </div> 
        </div>
    );
}

export default SearchBar;
