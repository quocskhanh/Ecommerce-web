import { useState, useEffect } from "react";
import "./product.css";

function UseEffect2() {
    const limit = 6;
    const maxPagesToShow = 5;  // Số lượng trang muốn hiển thị
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [error, setError] = useState(null);
    const [pageActive, setPageActive] = useState(0);
    const [quantityPage, setQuantityPage] = useState(0);
    const [activeTab, setActiveTab] = useState('all');
    const [activeButton, setActiveButton] = useState(0);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=100").then(res => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                setAllProducts(data.products);
                filterByTab('all', data.products, 0); // Set default to first page
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error);
                setError(error);
            });
    }, []);

    const filterByTab = (tab, products, page) => {
        setActiveTab(tab);
        setPageActive(page);
        let filtered = products || allProducts;
        if (tab !== 'all') {
            filtered = allProducts.filter(product => product.tags.includes(tab));
        }
        setFilteredProducts(filtered.slice(page * limit, (page + 1) * limit));
        setQuantityPage(Math.ceil(filtered.length / limit));
    }

    const handleClickPagination = (page) => {
        if (page >= 0 && page < quantityPage) {
            filterByTab(activeTab, null, page);
        }
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!allProducts.length) {
        return <div>Loading...</div>;
    }

    const buttons = ['All', 'Fruits', 'Meat', 'Pet Supplies'];

    const renderPageNumbers = () => {
        const start = Math.max(0, pageActive - Math.floor(maxPagesToShow / 2));
        const end = Math.min(quantityPage, start + maxPagesToShow);
        return [...Array(end - start).keys()].map((_, index) => (
            <li key={start + index} className={start + index === pageActive ? 'active' : ''} onClick={() => handleClickPagination(start + index)}>
                {start + index + 1}
            </li>
        ));
    }

    return (
        <>
        <div className="tabs-container">
          <div className="tabs-wrap">
          {buttons.map((text, index) => (
            <div key={index}>
                <button
                    className={`tab ${activeButton === index ? 'activeTab' : ''}`}
                    onClick={() => {
                        setActiveButton(index);
                        filterByTab(text.toLowerCase(), allProducts, 0);
                    }}
                >
                    {text}
                </button>
            </div>
          ))}
          </div>
        </div>
        <div className="newar_product_list">
            {filteredProducts.map(item => (
                <div className="newar_product_item" key={item.id}>
                    <div className="newar_product_img">
                        <img src={item.thumbnail} alt={item.title} />
                    </div>
                    <div className="text_titleprice">
                        <h3>{item.title}</h3>
                        <p>{item.price}$</p>
                    </div>
                </div>
            ))}
        </div>

        <ul className="pagination">
            <li onClick={() => handleClickPagination(pageActive - 1)} disabled={pageActive === 0}>Previous</li>
            {renderPageNumbers()}
            <li onClick={() => handleClickPagination(pageActive + 1)} disabled={pageActive === quantityPage - 1}>Next</li>
        </ul>
        </>
    );
}

export default UseEffect2;
