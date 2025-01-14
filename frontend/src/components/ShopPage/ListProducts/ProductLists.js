import React, { useState, useEffect } from 'react';
import './product.css';
import { useNavigate } from 'react-router-dom';

function ProductList({ products, sortOrder, onSortChange }) {
  const limit = 9; // Giới hạn mỗi trang 9 sản phẩm
  const [currentProducts, setCurrentProducts] = useState([]);
  const [pageActive, setPageActive] = useState(0);
  const [quantityPage, setQuantityPage] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    sortAndPaginateProducts(products, sortOrder);
  }, [products, sortOrder]);

  const sortAndPaginateProducts = (products, sortOrder) => {
    const sorted = sortProducts(products, sortOrder);
    paginateProducts(sorted, 0);
  };

  const sortProducts = (products, sortOrder) => {
    return [...products].sort((a, b) => {
      const [key, order] = sortOrder.split('-');
      if (key === 'price') {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
  };

  const paginateProducts = (products, page) => {
    setCurrentProducts(products.slice(page * limit, (page + 1) * limit));
    setQuantityPage(Math.ceil(products.length / limit));
    setPageActive(page);
  };

  const handleClickPagination = (page) => {
    if (page >= 0 && page < quantityPage) {
      paginateProducts(products, page);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); 
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

  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="sort-options">
        <label>Sắp xếp:</label>
        <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
          <option value="price-asc">Giá: Thấp đến cao</option>
          <option value="price-desc">Giá: Cao đến thấp</option>
        </select>
      </div>
      <div className="newar_product_list">
        {currentProducts.map(item => (
          <div className="newar_product_item" key={item.id}>
            <div className="newar_product_img">
              <img src={item.image} alt={item.name} />
              <div className="ShowWhenHover">
                <div className="box-icon" onClick={() => handleProductClick(item.id)}>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path d="M14 5C14 2.24297 11.757 0 9 0C6.24297 0 4 2.24297 4 5H0.25V16.875C0.25 18.6009 1.6491 20 3.375 20H14.625C16.3509 20 17.75 18.6009 17.75 16.875V5H14ZM9 1.875C10.7231 1.875 12.125 3.27688 12.125 5H5.875C5.875 3.27688 7.27688 1.875 9 1.875ZM15.875 16.875C15.875 17.5643 15.3143 18.125 14.625 18.125H3.375C2.68574 18.125 2.125 17.5643 2.125 16.875V6.875H4V8.4375C4 8.95527 4.41973 9.375 4.9375 9.375C5.45527 9.375 5.875 8.95527 5.875 8.4375V6.875H12.125V8.4375C12.125 8.95527 12.5447 9.375 13.0625 9.375C13.5803 9.375 14 8.95527 14 8.4375V6.875H15.875V16.875Z" fill="#484848" stroke="#484848" stroke-width="0.0390625" />
                  </svg>
                  
                </div>
              </div>
            </div>
            <div className="text_title_price">
              <h3>{item.name}</h3>
              <p>{item.price} VND</p>
            </div>
          </div>
        ))}
      </div>
      <ul className="pagination2">
        <li onClick={() => handleClickPagination(pageActive - 1)} disabled={pageActive === 0}>Trước</li>
        {renderPageNumbers()}
        <li onClick={() => handleClickPagination(pageActive + 1)} disabled={pageActive === quantityPage - 1}>Sau</li>
      </ul>
    </div>
  );
}

export default ProductList;
