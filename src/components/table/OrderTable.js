import React, { useState } from "react";

// Dữ liệu mẫu
const mockData = [
    {
        id: 1,
        order: "#12512B",
        date: "May 5, 4:20 PM",
        customer: "Tom Anderson",
        paymentStatus: "Paid",
        orderStatus: "Ready",
        total: "$49.90",
    },
    {
        id: 2,
        order: "#12523C",
        date: "May 5, 4:15 PM",
        customer: "Jayden Walker",
        paymentStatus: "Paid",
        orderStatus: "Ready",
        total: "$34.36",
    },
    {
        id: 3,
        order: "#M51232A",
        date: "May 5, 4:15 PM",
        customer: "Inez Kim",
        paymentStatus: "Paid",
        orderStatus: "Ready",
        total: "$5.51",
    },
    {
        id: 4,
        order: "#23354D",
        date: "May 5, 4:12 PM",
        customer: "Francisco Henry",
        paymentStatus: "Paid",
        orderStatus: "Shipped",
        total: "$29.74",
    },
    {
        id: 5,
        order: "#51232C",
        date: "May 5, 4:12 PM",
        customer: "Violet Phillips",
        paymentStatus: "Paid",
        orderStatus: "Shipped",
        total: "$23.06",
    },
];

const OrderTable = () => {
    const [products, setProducts] = useState(mockData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [filter, setFilter] = useState("All");

    const filteredProducts = products.filter((product) =>
        filter === "All" ? true : product.paymentStatus === filter
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
                <div className="flex gap-4">
                    <select
                        className="border rounded-lg px-4 py-2"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
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

            {/* Table */}
            <table className="w-full text-left">
                <thead className="bg-gray-100">
                <tr>
                    <th className="p-4">
                        <input type="checkbox" />
                    </th>
                    <th className="p-4">Order</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Payment Status</th>
                    <th className="p-4">Order Status</th>
                    <th className="p-4">Total</th>
                </tr>
                </thead>
                <tbody>
                {currentProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                            <input type="checkbox" />
                        </td>
                        <td className="p-4 text-blue-600 font-medium">{product.order}</td>
                        <td className="p-4">{product.date}</td>
                        <td className="p-4">{product.customer}</td>
                        <td className="p-4">
                                <span
                                    className={`px-2 py-1 rounded-full text-white text-sm ${
                                        product.paymentStatus === "Paid"
                                            ? "bg-green-500"
                                            : "bg-yellow-500"
                                    }`}
                                >
                                    {product.paymentStatus}
                                </span>
                        </td>
                        <td className="p-4">
                                <span
                                    className={`px-2 py-1 rounded-full text-white text-sm ${
                                        product.orderStatus === "Ready"
                                            ? "bg-orange-500"
                                            : "bg-blue-500"
                                    }`}
                                >
                                    {product.orderStatus}
                                </span>
                        </td>
                        <td className="p-4">{product.total}</td>
                    </tr>
                ))}
                </tbody>
            </table>

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
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#5f6368"><path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
                        </span>
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

export default OrderTable;
