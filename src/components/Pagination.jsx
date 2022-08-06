import React from 'react';

const Pagination = ({page, totalPages, onLeftClick, onRightClick}) => {
    
    return (
        <div className='pagination-container'>
            <button onClick={onLeftClick} className="pagination-btn">◀</button>
            <span>    {page} de {totalPages}    </span>
            <button onClick={onRightClick} className="pagination-btn">▶</button>
        </div>
    );
}

export default Pagination;
