import React, { useState } from "react";
import LayoutDashboard from "../layout/LayoutDashboard";

const ordersData = [
    { id: 1, customer: "mohamedsalah", total: 500000, status: "Pending", date: "2025-01-01", image: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Mohamed_Salah_2018.jpg" },
    { id: 2, customer: "diogojota", total: 750000, status: "Completed", date: "2025-01-02", image: "https://ichef.bbci.co.uk/ace/standard/940/cpsprodpb/3403/live/bd66b1b0-95e8-11ef-9607-9df2d810c28b.jpg" },
    { id: 3, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 4, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 5, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 6, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 7, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 8, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 9, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 10, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 11, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 12, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 13, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 14, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    { id: 15, customer: "nunez", total: 300000, status: "Canceled", date: "2025-01-03", image: "https://cdn.bongdaplus.vn/Assets/Media/2024/10/24/66/nunez11.jpg" },
    // Add more sample orders as needed
];

const OrderPage = () => {
    const [orders, setOrders] = useState(ordersData);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10); // Items per page
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleStatusChange = (id, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Pending":
                return "text-yellow-500 bg-yellow-100";
            case "Completed":
                return "text-green-500 bg-green-100";
            case "Canceled":
                return "text-red-500 bg-red-100";
            default:
                return "";
        }
    };

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
        const sortedOrders = [...orders].sort((a, b) => {
            if (a[field] < b[field]) return order === "asc" ? -1 : 1;
            if (a[field] > b[field]) return order === "asc" ? 1 : -1;
            return 0;
        });
        setSortField(field);
        setSortOrder(order);
        setOrders(sortedOrders);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Pagination calculations
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    return (
        <LayoutDashboard>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Quản Lý Đơn Hàng</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full bg-white shadow rounded-lg">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                <button onClick={() => handleSort("id")}>ID</button>
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Khách Hàng</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                <button onClick={() => handleSort("total")}>Tổng Tiền (VNĐ)</button>
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Trạng Thái</th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                <button onClick={() => handleSort("date")}>Ngày Đặt</button>
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Hành Động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentOrders.map(order => (
                            <tr key={order.id} className="border-t">
                                <td className="px-4 py-2 text-sm">{order.id}</td>
                                <td className="px-4 py-2 text-sm flex items-center space-x-2">
                                    <img src={order.image} alt={order.customer} className="w-10 h-10 rounded-full" />
                                    <span>{order.customer}</span>
                                </td>
                                <td className="px-4 py-2 text-sm">{order.total.toLocaleString()}</td>
                                <td className={`px-4 py-2 text-sm font-semibold rounded ${getStatusClass(order.status)}`}>
                                    {order.status}
                                </td>
                                <td className="px-4 py-2 text-sm">{order.date}</td>
                                <td className="px-4 py-2 text-sm space-x-2">
                                    <button
                                        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                                        onClick={() => handleStatusChange(order.id, "Completed")}
                                    >
                                        Hoàn Thành
                                    </button>
                                    <button
                                        className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                                        onClick={() => handleStatusChange(order.id, "Canceled")}
                                    >
                                        Hủy
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center space-x-2 mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default OrderPage;
