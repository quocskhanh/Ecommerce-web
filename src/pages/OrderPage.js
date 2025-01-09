import React, { useState } from "react";
import LayoutDashboard from "../layout/LayoutDashboard";
import { saveAs } from "file-saver";

const mockData = [
    // Thêm thể loại vào mockData để lọc theo category
    {
        id: 1,
        order: "#12512B",
        date: "May 5, 4:20 PM",
        customer: "Tom Anderson",
        paymentStatus: "Paid",
        orderStatus: "Ready",
        category: "Clothing",
        total: "$49.90",
    },
    {
        id: 2,
        order: "#12523C",
        date: "May 5, 4:15 PM",
        customer: "Jayden Walker",
        paymentStatus: "Paid",
        orderStatus: "Ready",
        category: "Electronics",
        total: "$34.36",
    },
    // Các đơn hàng khác...
];

const OrderPage = () => {
    const [orders, setOrders] = useState(mockData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [filter, setFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newOrder, setNewOrder] = useState({ product: "", quantity: 0, price: 0, category: "Clothing" });
    const [editingOrder, setEditingOrder] = useState(null);

    const filteredOrders = orders.filter(order => {
        const customerMatch = order.customer ? order.customer.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        const orderMatch = order.order ? order.order.toLowerCase().includes(searchTerm.toLowerCase()) : false;

        return (
            (filter === "All" || order.paymentStatus === filter) &&
            (categoryFilter === "All" || order.category === categoryFilter) &&
            (customerMatch || orderMatch)
        );
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleAddOrder = () => {
        // Kiểm tra tính hợp lệ của các giá trị
        if (!newOrder.product || newOrder.quantity <= 0 || newOrder.price <= 0) {
            alert("Please fill all fields with valid data.");
            return;
        }

        const id = orders.length ? orders[orders.length - 1].id + 1 : 1;
        const newOrderData = {
            ...newOrder,
            order: `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`, // Tạo ID đơn hàng ngẫu nhiên nếu cần
            date: new Date().toLocaleString(), // Tạo ngày giờ hiện tại
            paymentStatus: "Pending", // Mặc định trạng thái thanh toán là 'Pending'
            orderStatus: "Processing", // Mặc định trạng thái đơn hàng là 'Processing'
        };

        setOrders([...orders, { id, ...newOrderData }]);
        setIsModalOpen(false);
        setNewOrder({ product: "", quantity: 0, price: 0, category: "Clothing" });
    };


    const handleEditOrder = (order) => {
        setEditingOrder(order);
        setIsModalOpen(true);
        setNewOrder(order);
    };

    const handleUpdateOrder = () => {
        const updatedOrders = orders.map(order =>
            order.id === editingOrder.id ? { ...editingOrder, ...newOrder } : order
        );
        setOrders(updatedOrders);
        setIsModalOpen(false);
        setEditingOrder(null);
        setNewOrder({ product: "", quantity: 0, price: 0, category: "Clothing" });
    };

    const handleDeleteOrder = (orderId) => {
        setOrders(orders.filter(order => order.id !== orderId));
    };

    const handleExport = () => {
        const csvData = [
            ["Order", "Date", "Customer", "Payment Status", "Order Status", "Category", "Total"],
            ...orders.map(order => [
                order.order,
                order.date,
                order.customer,
                order.paymentStatus,
                order.orderStatus,
                order.category,
                order.total
            ])
        ];

        const csvContent = csvData.map(row => row.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "orders.csv");
    };

    return (
        <LayoutDashboard>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                    <div className="flex gap-4">
                        <button
                            className="px-4 py-2 bg-white rounded border border-[#d6daec]"
                            onClick={handleExport}
                        >
                            Export
                        </button>
                        <button
                            className="px-4 py-2 bg-[#1e5eff] rounded text-white"
                            onClick={() => setIsModalOpen(true)}
                        >
                            + Add Order
                        </button>
                    </div>
                </div>

                {/* Filter and Search */}
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

                        <select
                            className="border rounded-lg px-4 py-2"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Electronics">Electronics</option>
                            {/* Thêm các thể loại khác */}
                        </select>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border rounded-lg px-4 py-2 pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2">
                                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4">Order</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Payment Status</th>
                        <th className="p-4">Order Status</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="p-4 text-blue-600 font-medium">{order.order}</td>
                            <td className="p-4">{order.date}</td>
                            <td className="p-4">{order.customer}</td>
                            <td className="p-4">{order.paymentStatus}</td>
                            <td className="p-4">{order.orderStatus}</td>
                            <td className="p-4">{order.category}</td>
                            <td className="p-4">{order.total}</td>
                            <td className="p-4">
                                <button onClick={() => handleEditOrder(order)} className="px-4 py-1 bg-white border border-blue-400 text-white rounded">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                                    </span>
                                </button>
                                <button onClick={() => handleDeleteOrder(order.id)} className="px-4 py-1 bg-white border border-blue-400 text-white rounded ml-2">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                    </span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="p-4 flex justify-between items-center">
                    <p>Showing {startIndex + 1}-{startIndex + currentOrders.length} of {filteredOrders.length} results</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#5f6368">
                                <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                            </svg>
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => changePage(index + 1)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === index + 1 ? "bg-blue-200 text-blue-600" : "bg-gray-200"
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
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#5f6368">
                                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Modal */}
                {(isModalOpen || editingOrder) && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded shadow-lg">
                            <h2 className="text-xl font-bold mb-4">{editingOrder ? "Edit Order" : "Add Order"}</h2>
                            <input
                                type="text"
                                placeholder="Product"
                                value={newOrder.product}
                                onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={newOrder.quantity}
                                onChange={(e) => setNewOrder({ ...newOrder, quantity: Number(e.target.value) })}
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={newOrder.price}
                                onChange={(e) => setNewOrder({ ...newOrder, price: Number(e.target.value) })}
                                className="w-full mb-4 p-2 border rounded"
                            />
                            <select
                                value={newOrder.category}
                                onChange={(e) => setNewOrder({ ...newOrder, category: e.target.value })}
                                className="w-full mb-4 p-2 border rounded"
                            >
                                <option value="Clothing">Clothing</option>
                                <option value="Electronics">Electronics</option>
                                {/* Thêm các thể loại khác */}
                            </select>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                    onClick={editingOrder ? handleUpdateOrder : handleAddOrder}
                                >
                                    {editingOrder ? "Update" : "Add"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LayoutDashboard>
    );
};

export default OrderPage;
