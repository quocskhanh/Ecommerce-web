import React, { useState } from "react";

// Dữ liệu mẫu
const mockData = [
    {
        id: 1,
        product: "Men Hoodie",
        category: "Hoodies",
        inventory: "96 in stock",
        color: "Black",
        price: "$49.90",
        rating: "5.0 (32 Votes)",
        image: "https://m.media-amazon.com/images/I/71mhs8nkGeL._AC_UY1000_.jpg", // Link ảnh mẫu
    },
    {
        id: 2,
        product: "Women Striped T-Shirt",
        category: "T-Shirt",
        inventory: "56 in stock",
        color: "White",
        price: "$34.90",
        rating: "4.8 (24 Votes)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVxkoxYBvJ7R1gpVLJLa1K_YwQ6y6MaL5YQA&s", // Link ảnh mẫu
    },
    {
        id: 3,
        product: "Women White T-Shirt",
        category: "T-Shirt",
        inventory: "78 in stock",
        color: "White",
        price: "$40.90",
        rating: "5.0 (54 Votes)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv9Se1-sPq7zSkXuIiiJc3pHIZxPWXPyIuw&s", // Link ảnh mẫu
    },
];

const ProductTable = () => {
    const [products, setProducts] = useState(mockData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const [selected, setSelected] = useState([]);
    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Xử lý chọn/bỏ chọn sản phẩm
    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-lg">
            {/* Bộ lọc và tìm kiếm */}
            <div className="flex justify-between items-center p-4 border-b">
                <div className="flex gap-4">
                    <select className="border rounded-lg px-4 py-2">
                        <option>Filter</option>
                        <option>Paid</option>
                        <option>Pending</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded-lg px-4 py-2 pl-10"
                        />


                        <svg xmlns="http://www.w3.org/2000/svg"
                             height="24px"
                             viewBox="0 -960 960 960"
                             width="24px"
                             fill="#5f6368"
                             className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                        ><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white rounded border border-[#d6daec]">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </button>
                    <button className="px-4 py-2 bg-white rounded border border-[#d6daec]">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>
            </div>
            {/* Bảng sản phẩm */}
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-4">
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                setSelected(
                                    e.target.checked ? mockData.map((item) => item.id) : []
                                )
                            }
                        />
                    </th>
                    <th className="p-4">Product</th>
                    <th className="p-4">Inventory</th>
                    <th className="p-4">Color</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Rating</th>
                </tr>
                </thead>
                <tbody>
                {mockData.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                            <input
                                type="checkbox"
                                checked={selected.includes(item.id)}
                                onChange={() => toggleSelect(item.id)}
                            />
                        </td>
                        <td className="p-4">
                            <div className="flex items-center gap-2">
                                {/* Hiển thị ảnh sản phẩm */}
                                <img
                                    src={item.image}
                                    alt={item.product}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <div className="font-semibold">{item.product}</div>
                                    <div className="text-gray-500 text-sm">{item.category}</div>
                                </div>
                            </div>
                        </td>
                        <td className="p-4">{item.inventory}</td>
                        <td className="p-4">{item.color}</td>
                        <td className="p-4">{item.price}</td>
                        <td className="p-4">{item.rating}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Phân trang */}
            {/* Pagination */}
            <div className="p-4 flex justify-between items-center">
                <p>
                    Showing {startIndex + 1}-{startIndex + currentProducts.length} of {products.length} results
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => changePage(index + 1)}
                            className={`px-3 py-1 rounded ${
                                currentPage === index + 1
                                    ? "bg-blue-200 text-blue-600"
                                    : "bg-gray-200"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#5f6368"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductTable;
