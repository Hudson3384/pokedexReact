import React from 'react';

const Pagination = ({page, totalPages, onLeftClick, onRightClick}) => {
    
    return (
        <div className='pagination-container'>
            <button onClick={onLeftClick}>◀</button>
            <span>{page} de {totalPages}</span>
            <button onClick={onRightClick}>▶</button>
        </div>
    );
}

export default Pagination;
