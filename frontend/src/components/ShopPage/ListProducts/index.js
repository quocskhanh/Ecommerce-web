import React, { useState, useEffect } from 'react';
import ProductList from './ProductLists';
import FilterByCategory from './FilterByCategory';

const ListProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [sortOrder, setSortOrder] = useState('price-asc');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8000/products");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let updatedProducts = products;

        if (selectedCategory) {
            updatedProducts = updatedProducts.filter((product) => product.category === selectedCategory);
        }

        if (selectedPriceRange) {
            updatedProducts = updatedProducts.filter(
                (product) => product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max
            );
        }

        if (selectedSize) {
            if (selectedCategory === 'Thời trang nam' || selectedCategory === 'Thời trang nữ') {
                updatedProducts = updatedProducts.filter((product) => product.sizes && product.sizes.includes(selectedSize));
            } else if (selectedCategory === 'Giày dép') {
                if (selectedSize === '<30') {
                    updatedProducts = updatedProducts.filter((product) => product.size && parseInt(product.size) < 30);
                } else if (selectedSize === '30-40') {
                    updatedProducts = updatedProducts.filter((product) => product.size && parseInt(product.size) >= 30 && parseInt(product.size) < 40);
                } else if (selectedSize === '>40') {
                    updatedProducts = updatedProducts.filter((product) => product.size && parseInt(product.size) >= 40);
                }
            }
        }

        setFilteredProducts(updatedProducts);
    }, [selectedCategory, selectedPriceRange, selectedSize, products]);

    const handleFilterChange = (category) => {
        setSelectedCategory(category);
        setSelectedSize(null); // Reset size filter when category changes
    };

    const handlePriceRangeChange = (range) => {
        setSelectedPriceRange(range);
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    const handleSortChange = (sortOrder) => {
        setSortOrder(sortOrder);
    };

    const categories = [...new Set(products.map((product) => product.category))];
    const sizes = selectedCategory === 'Thời trang nam' || selectedCategory === 'Thời trang nữ'
        ? ['S', 'M', 'L', 'XL']
        : selectedCategory === 'Giày dép'
            ? ['<30', '30-40', '>40']
            : [];

    return (
        <div className="list_product_container">
            <div className="list_product_left_content">
                <h2>Filter</h2>
                <FilterByCategory
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onFilterChange={handleFilterChange}
                    selectedPriceRange={selectedPriceRange}
                    onPriceRangeChange={handlePriceRangeChange}
                    sizes={sizes}
                    selectedSize={selectedSize}
                    onSizeChange={handleSizeChange}
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
