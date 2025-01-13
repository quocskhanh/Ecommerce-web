import React, { useState, useEffect } from 'react';
import "./listproduct.css";
import "../../HomePage/NewArrival/product.css";

function ListProducts({ filterParams }) {
    const limit = 9;  // Giới hạn mỗi trang 9 sản phẩm
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [error, setError] = useState(null);
    const [pageActive, setPageActive] = useState(0);
    const [quantityPage, setQuantityPage] = useState(0);
    const [sortOrder, setSortOrder] = useState('price-asc');

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=100").then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                setAllProducts(data.products);
                filterAndSortProducts(data.products, filterParams, 'price-asc'); // Load initial products sorted by price ascending
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
                setError(error);
            });
    }, [filterParams]);

    const filterAndSortProducts = (products, { minPrice, maxPrice }, sortOrder) => {
        let filtered = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        filtered = sortProducts(filtered, sortOrder);
        setFilteredProducts(filtered);
        paginateProducts(filtered, 0);
    };

    const sortProducts = (products, sortOrder) => {
        return [...products].sort((a, b) => {
            const [key, order] = sortOrder.split('-');
            if (key === 'price') {
                return order === 'asc' ? a.price - b.price : b.price - a.price;
            } else if (key === 'stock') {
                return order === 'asc' ? a.stock - b.stock : b.stock - a.stock;
            } else if (key === 'rating') {
                return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            }
            return 0;
        });
    };

    const paginateProducts = (products, page) => {
        setCurrentProducts(products.slice(page * limit, (page + 1) * limit));
        setQuantityPage(Math.ceil(products.length / limit));
        setPageActive(page);
    };

    const handleSortChange = (event) => {
        const sortOrder = event.target.value;
        setSortOrder(sortOrder);
        filterAndSortProducts(allProducts, filterParams, sortOrder);
    };

    const handleClickPagination = (page) => {
        if (page >= 0 && page < quantityPage) {
            paginateProducts(filteredProducts, page);
        }
    };

    const renderPageNumbers = () => {
        const start = Math.max(0, pageActive - Math.floor(5 / 2));
        const end = Math.min(quantityPage, start + 5);
        return [...Array(end - start).keys()].map((_, index) => (
            <li key={start + index} className={pageActive === start + index ? 'active' : ''} onClick={() => handleClickPagination(start + index)}>
                {start + index + 1}
            </li>
        ));
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!allProducts.length) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="sort-options">
                <label>Sort by: </label>
                <select value={sortOrder} onChange={handleSortChange}>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="stock-asc">Stock: Low to High</option>
                    <option value="stock-desc">Stock: High to Low</option>
                    <option value="rating-asc">Rating: Low to High</option>
                    <option value="rating-desc">Rating: High to Low</option>
                </select>
            </div>
            <div className="newar_product_list">
                {currentProducts.map(item => (
                    <div className="newar_product_item" key={item.id}>
                        <div className="newar_product_img">
                            <img src={item.thumbnail} alt={item.title} />
                            <div className="ShowWhenHover">
                                <div className="box-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                        <path d="M14 5C14 2.24297 11.757 0 9 0C6.24297 0 4 2.24297 4 5H0.25V16.875C0.25 18.6009 1.6491 20 3.375 20H14.625C16.3509 20 17.75 18.6009 17.75 16.875V5H14ZM9 1.875C10.7231 1.875 12.125 3.27688 12.125 5H5.875C5.875 3.27688 7.27688 1.875 9 1.875ZM15.875 16.875C15.875 17.5643 15.3143 18.125 14.625 18.125H3.375C2.68574 18.125 2.125 17.5643 2.125 16.875V6.875H4V8.4375C4 8.95527 4.41973 9.375 4.9375 9.375C5.45527 9.375 5.875 8.95527 5.875 8.4375V6.875H12.125V8.4375C12.125 8.95527 12.5447 9.375 13.0625 9.375C13.5803 9.375 14 8.95527 14 8.4375V6.875H15.875V16.875Z" fill="#484848" stroke="#484848" stroke-width="0.0390625"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="text_title_price">
                            <h3>{item.title}</h3>
                            <p>{item.price}$</p>
                        </div>
                    </div>
                ))}
            </div>
            <ul className="pagination2">
                <li onClick={() => handleClickPagination(pageActive - 1)} disabled={pageActive === 0}>Pre</li>
                {renderPageNumbers()}
                <li onClick={() => handleClickPagination(pageActive + 1)} disabled={pageActive === quantityPage - 1}>Next</li>
            </ul>
        </div>
    );
}

export default ListProducts;
