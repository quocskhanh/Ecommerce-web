import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DashboardTopbar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
    const [products, setProducts] = useState([]); // Danh sách sản phẩm
    const [filteredResults, setFilteredResults] = useState([]); // Kết quả lọc
    const [showResults, setShowResults] = useState(false); // Hiển thị kết quả tìm kiếm

    const toggleMenu = () => setMenuVisible((prev) => !prev);

    const toggleFullscreen = () => {
        if (!fullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setFullscreen((prev) => !prev);
    };

    useEffect(() => {
        // Tải danh sách sản phẩm từ backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://testbe-1.onrender.com/products", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        if (term.length > 0) {
            const results = products.filter((product) =>
                product.name.toLowerCase().includes(term)
            );
            setFilteredResults(results);
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    };

    const handleResultClick = () => {
        setShowResults(false); // Đóng danh sách kết quả
        setSearchTerm(""); // Reset ô tìm kiếm
    };

    return (
        <div className="fixed top-0 left-0 w-full h-16 bg-[#070b1d] flex items-center justify-between px-6 shadow-lg z-50">
            {/* Logo and Search */}
            <div className="flex items-center gap-4">
                <Link to="/admin" className="flex items-center">
                    <img src="/Group%201000004658.png" alt="FASCO Logo" className="w-11 h-12" />
                    <span className="text-white text-2xl font-normal font-['Rubik Glitch'] ml-2">FASCO</span>
                </Link>
                <div className="relative w-80 hidden lg:block">
                    <input
                        type="text"
                        placeholder="Tìm kiếm...."
                        className="w-full py-2 pl-12 pr-4 bg-white text rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill=""
                        className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                    >
                        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                    </svg>
                    {showResults && (
                        <ul className="absolute top-12 left-0 w-full bg-[#1e2753] rounded-lg shadow-lg text-white">
                            {filteredResults.length > 0 ? (
                                filteredResults.map((product) => (
                                    <li
                                        key={product.id}
                                        className="px-4 py-2 hover:bg-indigo-500 cursor-pointer"
                                        onClick={handleResultClick}
                                    >
                                        <Link to={`/admin/product/${product.id}`}>
                                            {product.name}
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li className="px-4 py-2 text-gray-400">Không tìm thấy kết quả</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6 text-white">
                {/* Fullscreen */}
                <span
                    onClick={toggleFullscreen}
                    className="cursor-pointer transition-colors duration-300 hover:text-indigo-500"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                        <path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z" />
                    </svg>
                </span>

                {/* User Menu */}
                <div className="relative">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={toggleMenu}>
                        <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full uppercase">
                            A
                        </div>
                        <span className="text-sm hidden lg:block">ADMIN</span>
                    </div>
                    {menuVisible && (
                        <ul className="absolute right-0 mt-2 w-40 bg-black shadow-lg rounded-md z-50">
                            <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
                                <Link to="/admin/setting">Cài đặt</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
                                <Link to="/admin/order">Đơn hàng</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
                                <Link to="/admin/logout">Đăng xuất</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardTopbar;
