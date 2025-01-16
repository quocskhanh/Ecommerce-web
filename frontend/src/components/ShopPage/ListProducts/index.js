import React, { useState, useEffect } from 'react';
import ProductList from './ProductLists';
import FilterByCategory from './FilterByCategory';
import axios from "axios";

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Lọc theo category_id
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [sortOrder, setSortOrder] = useState('price-asc');
  

  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://testbe-1.onrender.com/products");




        setProducts(response.data); // Lưu toàn bộ sản phẩm
        setFilteredProducts(response.data); // Lưu sản phẩm đã lọc
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo danh mục, giá và sắp xếp
  useEffect(() => {
    let updatedProducts = products;

    // Lọc theo danh mục
    if (selectedCategoryId) {
      updatedProducts = updatedProducts.filter((product) => product.category_id === selectedCategoryId);
    }

    // Lọc theo khoảng giá
    if (selectedPriceRange) {
      updatedProducts = updatedProducts.filter(
        (product) => product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
      );
    }

    // Sắp xếp sản phẩm
    if (sortOrder === 'price-asc') {
      updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategoryId, selectedPriceRange, sortOrder, products]);

  // Xử lý thay đổi bộ lọc danh mục
  const handleFilterChange = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  // Xử lý thay đổi khoảng giá
  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
  };

  // Xử lý thay đổi sắp xếp
  const handleSortChange = (sortOrder) => {
    setSortOrder(sortOrder);
  };

  const categories = [
    { id: 1, name: 'Áo' },
    { id: 2, name: 'Quần' },
    { id: 3, name: 'Giày dép' },
    { id: 4, name: 'Phụ kiện' }
  ];

  return (
    <div className="list_product_container">
      {/* Phần bộ lọc */}
      <div className="list_product_left_content">
        <h2>Filter</h2>
        <FilterByCategory
          categories={categories} 
          selectedCategoryId={selectedCategoryId}
          onFilterChange={handleFilterChange}
          selectedPriceRange={selectedPriceRange}
          onPriceRangeChange={handlePriceRangeChange}
        />
      </div>

      <div className="list_product_right_content">
        <ProductList
          products={filteredProducts}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>
    </div>
  );
};

export default ListProduct;
