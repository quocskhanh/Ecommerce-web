import React, { useState } from 'react';
import "./listproduct.css";
import "./filter.css"
import ListProducts from "./ListProducts";
import FilterByPrice from "./FilterByPrice";

const ListProduct = () => {
    const [filterParams, setFilterParams] = useState({ minPrice: 0, maxPrice: 1000 });

    const handleFilterChange = (minPrice, maxPrice) => {
        setFilterParams({ minPrice, maxPrice });
    };

    return (
        <div className="list_product_container">
            <div className="list_product_left_content">
                <h2> Filter</h2>
                <FilterByPrice onFilterChange={handleFilterChange} />
            </div>
            <div className="list_product_right_content">
                <ListProducts filterParams={filterParams} />
            </div>
        </div>
    );
};

export default ListProduct;
