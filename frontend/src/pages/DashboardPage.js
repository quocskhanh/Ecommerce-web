import React, { useState, useEffect } from "react";
import AdminLayout from "../layout/AdminLayout";
import {Bar, Line} from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";

const DashboardPage = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [newUsersCount, setNewUsersCount] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    const [revenueLast7Days, setRevenueLast7Days] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [revenuePerDay, setRevenuePerDay] = useState({ dates: [], revenues: [] });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResponse = await axios.get("http://localhost:5000/orders");
                const productsResponse = await axios.get("http://localhost:5000/products");
                const accountsResponse = await axios.get("http://localhost:5000/accounts");

                const orders = ordersResponse.data;
                const accounts = accountsResponse.data;

                setOrders(orders);
                setProducts(productsResponse.data);

                const currentDate = new Date();
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(currentDate.getDate() - 7);

                // Tổng số đơn hàng
                setTotalOrders(orders.length);

                // Số người dùng mới trong 7 ngày
                const newUsers = accounts.filter(
                    (account) => new Date(account.created_at) >= sevenDaysAgo
                );
                setNewUsersCount(newUsers.length);

                // Tính doanh thu trong 7 ngày
                const completedOrdersLast7Days = orders.filter((order) => {
                    const completionDate = new Date(order.createdDate);
                    return (
                        order.status === "Đã hoàn thành" &&
                        completionDate >= sevenDaysAgo &&
                        completionDate <= currentDate
                    );
                });
                const revenue = completedOrdersLast7Days.reduce(
                    (sum, order) => sum + order.total_price,
                    0
                );
                setRevenueLast7Days(revenue);
                const dates = [];
                for (let i = 0; i < 7; i++) {
                    const date = new Date(sevenDaysAgo);
                    date.setDate(sevenDaysAgo.getDate() + i);
                    dates.push(date.toISOString().split("T")[0]); // Lấy định dạng yyyy-mm-dd
                }

                // Tính doanh thu từng ngày
                const dailyRevenue = dates.map((date) => {
                    const dailyOrders = orders.filter(
                        (order) =>
                            order.status === "Đã hoàn thành" &&
                            new Date(order.createdDate).toISOString().split("T")[0] === date
                    );
                    return dailyOrders.reduce((sum, order) => sum + order.total_price, 0);
                });

                setRevenuePerDay({ dates, revenues: dailyRevenue });

                // Tính tổng doanh thu
                const totalRevenue = orders
                    .filter((order) => order.status === "Đã hoàn thành")
                    .reduce((sum, order) => sum + order.total_price, 0);
                setTotalRevenue(totalRevenue); // Thêm state mới

                // Lấy 7 đơn hàng gần đây
                const sortedOrders = [...orders].sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                setRecentOrders(sortedOrders.slice(0, 7));



                // Nhóm số lượng đơn hàng theo giờ trong ngày


            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        fetchData();
    }, []);
    const ordersPerDay = revenuePerDay.dates.map((date) => {
        return orders.filter(
            (order) =>
                new Date(order.createdDate).toISOString().split("T")[0] === date
        ).length; // Đếm tổng số lượng đơn hàng theo ngày
    });

    const ordersData = {
        labels: revenuePerDay.dates, // Ngày trên trục x
        datasets: [
            {
                label: "Số lượng đơn hàng",
                data: ordersPerDay, // Tổng số lượng đơn hàng theo ngày
                backgroundColor: "#3B82F6", // Xanh dương tươi sáng
                borderColor: "#2563EB",    // Xanh đậm hơn cho đường viền
                pointBackgroundColor: "#60A5FA", // Xanh nhạt cho điểm
                pointBorderColor: "#1E3A8A", // Xanh đậm cho viền điểm
                tension: 0.4, // Đường cong mềm mại
                fill: false, // Không tô màu dưới đường
            },
        ],
        options: {
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,  // Bắt đầu từ 0
                        stepSize: 1,        // Bước nhảy là 1 (chỉ hiển thị số nguyên)
                        callback: function(value) {
                            return Number.isInteger(value) ? value : ''; // Chỉ hiển thị số nguyên
                        }
                    }
                }
            }
        }
    };


    const revenueData = {
        labels: revenuePerDay.dates, // Ngày trên trục x
        datasets: [
            {
                label: "Doanh Thu",
                data: revenuePerDay.revenues, // Doanh thu từng ngày trên trục y
                backgroundColor: "#10B981",
                borderColor: "#10B981",
                borderWidth: 1,
                borderRadius: 10,
                hoverBackgroundColor: "#34D399",
                hoverBorderColor: "#2D6A4F",
                hoverBorderWidth: 2,
                barPercentage: 0.6,
            },
        ],
    };

    return (
        <AdminLayout>
            <div className="p-4 sm:p-6 bg-gray-50 min-h-screen overflow-auto">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Bảng Điều Khiển</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Tổng số đơn hàng</h2>
                        <p className="text-2xl font-bold">{totalOrders}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Tổng doanh thu</h2>
                        <p className="text-2xl font-bold">{totalRevenue} đ</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Số người dùng Mới (7 ngày)</h2>
                        <p className="text-2xl font-bold">{newUsersCount}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1  lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
                    {/* Biểu đồ doanh thu*/}

                    <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-medium mb-4">Doanh Thu</h2>
                    <Bar data={revenueData} />
                </div>

                {/* Biểu đồ số lượng đơn hàng */}
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-medium mb-4">Đơn hàng trong ngày</h2>
                    <Line data={ordersData} />
                </div>
                </div>

                {/* Sản phẩm tồn kho */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
                    {/* Bảng Sản Phẩm Tồn Kho */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Sản Phẩm Hết Hàng</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                <tr className="text-gray-500">
                                    <th className="px-4 py-2">Hình Ảnh</th>
                                    <th className="px-4 py-2">Tên</th>
                                    <th className="px-4 py-2">Giá</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products
                                    .filter((product) => product.status === "out of stock") // Chỉ lấy sản phẩm "sẵn hàng"
                                    .sort((a, b) => b.price - a.price) // Sắp xếp theo giá giảm dần
                                    .slice(0, 5) // Lấy top 5 sản phẩm
                                    .map((product) => (
                                        <tr key={product.id}>
                                            <td className="px-4 py-2">
                                                <img
                                                    src={Array.isArray(product.image) ? product.image[0] : product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{product.name}</td>
                                            <td className="px-4 py-2">{product.price} đ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bảng Đơn Hàng Gần Đây */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Đơn Hàng Gần Đây</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                <tr className="text-gray-500">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Mã đơn</th>
                                    <th className="px-4 py-2">Trạng thái</th>
                                    <th className="px-4 py-2">Giá tiền</th>
                                    <th className="px-4 py-2">Ngày tạo</th>
                                </tr>
                                </thead>
                                <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-4 py-2">{order.account_id}</td>
                                        <td className="px-4 py-2">{order.cart_id}</td>
                                        <td className="px-4 py-2">
                                <span
                                    className={`px-2 py-1 text-xs rounded ${
                                        order.status === "Đã hoàn thành"
                                            ? "bg-green-100 text-green-500"
                                            : "bg-yellow-100 text-yellow-500"
                                    }`}
                                >
                                    {order.status}
                                </span>
                                        </td>
                                        <td className="px-4 py-2">{order.total_price} đ</td>
                                        <td className="px-4 py-2">{order.createdDate}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
