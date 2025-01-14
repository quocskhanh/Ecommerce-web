import React from 'react';
import './Filter.css';

const FilterByCategory = ({ categories, selectedCategory, onFilterChange, selectedPriceRange, onPriceRangeChange, sizes, selectedSize, onSizeChange }) => {
    const priceRanges = [
        { label: 'All', min: 0, max: Infinity },
        { label: '0-1,000,000 VND', min: 0, max: 1000000 },
        { label: '1,000,000-2,000,000 VND', min: 1000000, max: 2000000 },
        { label: '2,000,000-3,000,000 VND', min: 2000000, max: 3000000 },
        { label: '3,000,000-4,000,000 VND', min: 3000000, max: 4000000 }
    ];

    return (
        <div className="filter_by_category">
            <h3>Filter by Category</h3>
            <ul className="category_list">
                <li
                    className={!selectedCategory ? 'active' : ''}
                    onClick={() => onFilterChange(null)}
                >
                    All
                </li>
                {categories.map((category) => (
                    <li
                        key={category}
                        className={selectedCategory === category ? 'active' : ''}
                        onClick={() => onFilterChange(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>

            <h3>Filter by Price</h3>
            <ul className="price_list">
                {priceRanges.map((range) => (
                    <li
                        key={range.label}
                        className={selectedPriceRange && selectedPriceRange.label === range.label ? 'active' : ''}
                        onClick={() => onPriceRangeChange(range)}
                    >
                        {range.label}
                    </li>
                ))}
            </ul>

            <h3>Filter by Size</h3>
            <ul className="size_list">
                {sizes.map((size) => (
                    <li
                        key={size}
                        className={selectedSize === size ? 'active' : ''}
                        onClick={() => onSizeChange(size)}
                    >
                        {size}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilterByCategory;
