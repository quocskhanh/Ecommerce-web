import React, { useState } from 'react';
import LayoutDashboard from "../layout/LayoutDashboard";

const HistoryPage = () => {
    // Dữ liệu giả lập cho các đơn hàng
    const [orders] = useState([
        {
            id: 1,
            product: 'Laptop HP',
            quantity: 1,
            price: 1200,
            status: 'Shipped',
            date: '2024-12-01',
        },
        {
            id: 2,
            product: 'Smartphone Galaxy S21',
            quantity: 2,
            price: 800,
            status: 'Delivered',
            date: '2024-12-10',
        },
        {
            id: 3,
            product: 'Wireless Mouse',
            quantity: 3,
            price: 30,
            status: 'Processing',
            date: '2024-12-15',
        },
        // Add more orders as needed
    ]);

    // Tìm kiếm đơn hàng theo tên sản phẩm
    const [search, setSearch] = useState('');

    // Bộ lọc các đơn hàng theo tên sản phẩm
    const filteredOrders = orders.filter(order =>
        order.product.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <LayoutDashboard>
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Lịch Sử Mua Hàng</h1>

            {/* Tìm kiếm */}
            <input
                type="text"
                placeholder="Tìm kiếm sản phẩm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-2 mb-4 border rounded-md"
            />

            {/* Bảng lịch sử mua hàng */}
            <table className="min-w-full table-auto border-collapse">
                <thead>
                <tr>
                    <th className="py-2 px-4 border">ID</th>
                    <th className="py-2 px-4 border">Sản Phẩm</th>
                    <th className="py-2 px-4 border">Số Lượng</th>
                    <th className="py-2 px-4 border">Giá</th>
                    <th className="py-2 px-4 border">Trạng Thái</th>
                    <th className="py-2 px-4 border">Ngày Mua</th>
                </tr>
                </thead>
                <tbody>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map(order => (
                        <tr key={order.id}>
                            <td className="py-2 px-4 border">{order.id}</td>
                            <td className="py-2 px-4 border">{order.product}</td>
                            <td className="py-2 px-4 border">{order.quantity}</td>
                            <td className="py-2 px-4 border">${order.price}</td>
                            <td className="py-2 px-4 border">{order.status}</td>
                            <td className="py-2 px-4 border">{order.date}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="py-2 px-4 text-center">Không có đơn hàng nào</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
        </LayoutDashboard>
    );
};

export default HistoryPage;
