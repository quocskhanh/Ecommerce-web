import React, { useState } from 'react';
import LayoutDashboard from "../layout/LayoutDashboard";

const ShippingPage = () => {
    const [orders, setOrders] = useState([
        { id: 1, customer: "Nguyễn Văn A", total: 500000, status: "Processing", date: "2025-01-01" },
        { id: 2, customer: "Trần Thị B", total: 750000, status: "In Transit", date: "2025-01-02" },
        { id: 3, customer: "Lê Minh C", total: 300000, status: "Delivered", date: "2025-01-03" },
    ]);

    const handleStatusChange = (id, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "Processing":
                return "text-yellow-500 bg-yellow-100";
            case "In Transit":
                return "text-blue-500 bg-blue-100";
            case "Delivered":
                return "text-green-500 bg-green-100";
            default:
                return "";
        }
    };

    return (
        <div>
            <LayoutDashboard>
                <div className="p-6 bg-gray-50 min-h-screen">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Quản Lý Giao Vận</h1>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full bg-white shadow-md rounded-lg">
                            <thead>
                            <tr className="bg-gray-200">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Khách Hàng</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tổng Tiền (VNĐ)</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Trạng Thái</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ngày Đặt</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Hành Động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="border-t">
                                    <td className="px-6 py-4 text-sm">{order.id}</td>
                                    <td className="px-6 py-4 text-sm">{order.customer}</td>
                                    <td className="px-6 py-4 text-sm">{order.total.toLocaleString()}</td>
                                    <td className={`px-6 py-4 text-sm font-semibold rounded ${getStatusClass(order.status)}`}>
                                        {order.status}
                                    </td>
                                    <td className="px-6 py-4 text-sm">{order.date}</td>
                                    <td className="px-6 py-4 text-sm space-x-2">
                                        <button
                                            className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                                            onClick={() => handleStatusChange(order.id, "Delivered")}
                                        >
                                            Đã Giao
                                        </button>
                                        <button
                                            className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                                            onClick={() => handleStatusChange(order.id, "In Transit")}
                                        >
                                            Đang Vận Chuyển
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </LayoutDashboard>
        </div>
    );
};

export default ShippingPage;
