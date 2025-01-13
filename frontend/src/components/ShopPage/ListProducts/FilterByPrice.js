import React, { useState } from 'react';

function FilterByPrice({ onFilterChange }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(999);

    const handleFilterChange = () => {
        onFilterChange(minPrice, maxPrice);
    };

    return (
        <div className="price-filter">
        <p>Price:</p>
            <div className='price-filter-wrap'>
            <label>
                Min:
                <input
                    type="number"
                    value={minPrice} 
                    onChange={e => setMinPrice(Number(e.target.value))}
                />
                $
            </label>
            <label>
                Max:
                <input
                    type="number"
                    value={maxPrice} 
                    onChange={e => setMaxPrice(Number(e.target.value))}
                />
                $
            </label>
            <button onClick={handleFilterChange}>Apply</button>
        </div>
        </div>
            
    );
}

export default FilterByPrice;