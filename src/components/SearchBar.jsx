import React, {useState } from 'react';

const SearchBar = ({onSearch}) => {

    const [search, setSearch] = useState("dito");
    


    const onChangeHandler = (e) => {
        setSearch(e.target.value)
        if(e.target.value.length === 0){
            onSearch(undefined)
        }
    }

    const onButtonClickHandler = () => {
        onSearch(search)
    }

    
    return (
        <div className='searchbar-content'>
           <div className='search-bar'>
                <input placeholder='Pesquise o pokemon' onChange={onChangeHandler}/>
            </div>
            <div className='search-btn'>
                <button onClick={onButtonClickHandler}>Buscar</button>
            </div>
        </div>
    );
}

export default SearchBar;
