import React, { useState } from 'react';
import LayoutDashboard from '../layout/LayoutDashboard';
import CategoryList from "../components/product/CategoryList";

const ProductPage = () => {
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const productsPerPage = 8;

    const productsByCategory = {
        "Women’s Bag": [
            { id: 1, name: "Túi đeo chéo nhỏ sành điệu dành cho nữ", price: 150000, image: "https://m.media-amazon.com/images/I/61UDx9jF0mL._AC_SL1315_.jpg" },
            { id: 2, name: "Womens Purses and Handbags Shoulder Bags Ladies Designer Top Handle Satchel Tote Bag", price: 200000, image: "https://m.media-amazon.com/images/I/61GpT8+nFXL._AC_SL1008_.jpg" },
            // ...
        ],
        "Men’s Accessories": [
            { id: 3, name: "Product 3", price: 300000, image: "image_url" },
            { id: 4, name: "Product 4", price: 350000, image: "image_url" },
            // ...
        ],
        // ... các danh mục khác
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setSearchTerm(""); // Đặt lại tìm kiếm khi chọn danh mục mới
        setCurrentPage(1); // Đặt lại trang hiện tại về trang đầu tiên
    };

    const handleAddToCart = (product) => {
        setCart((prevCart) => {
            const isProductInCart = prevCart.find((item) => item.id === product.id);

            if (isProductInCart) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const handleRemoveFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filteredProducts = selectedCategory
        ? productsByCategory[selectedCategory].filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : Object.values(productsByCategory).flat().filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <LayoutDashboard>
            <div className="container mx-auto p-4 flex">
                <div className="w-1/4 p-4 bg-gray-100 border-r border-gray-300">
                    <CategoryList categories={Object.keys(productsByCategory)} onCategoryClick={handleCategoryClick} />
                </div>

                <div className="w-3/4 p-4 relative">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="mb-4 p-2 border rounded w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentProducts.map((product) => (
                            <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
                                <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-lg hover:scale-105 transition-transform duration-300" />
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <p className="text-red-500 font-bold">{product.price.toLocaleString()} VND</p>

                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 flex items-center space-x-2"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                                            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                                        </svg>
                                        <span>Add to Cart</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                        <ul className="flex space-x-2">
                            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
                                <li key={index} className={`cursor-pointer ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded px-3 py-1`} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="fixed top-1/4 right-4 flex items-center bg-white border p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 3.75l7.5 7.5-7.5 7.5" />
                    </svg>
                    <span className="font-bold text-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
                    </span>
                </div>
                <ul className="mt-4 w-72">
                    {cart.map((item) => (
                        <li key={item.id} className="flex justify-between items-center mb-2">
                            <span>{item.name} ({item.quantity})</span>
                            <span>{(item.price * item.quantity).toLocaleString()} VND</span>
                            <button
                                className="text-red-500"
                                onClick={() => handleRemoveFromCart(item.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="">
                    <strong>Total: {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toLocaleString()} VND</strong>
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default ProductPage;
