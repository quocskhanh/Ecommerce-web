    import React, { useState, useEffect } from "react";
    import AdminLayout from "../layout/AdminLayout";
    import { Bar, Line } from "react-chartjs-2";
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
        const [topConsumers, setTopConsumers] = useState([]);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const headers = {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    };

                    const ordersResponse = await axios.get("https://testbe-1.onrender.com/orders", { headers });
                    const productsResponse = await axios.get("https://testbe-1.onrender.com/products", { headers });
                    const accountsResponse = await axios.get("https://testbe-1.onrender.com/accounts", { headers });
                    const revenueResponse = await axios.get("https://testbe-1.onrender.com/orders/revenue", { headers });

                    const orders = ordersResponse.data;
                    const accounts = accountsResponse.data;

                    setOrders(orders);
                    setProducts(productsResponse.data);

                    setTotalOrders(orders.length);

                    const currentDate = new Date();
                    const sevenDaysAgo = new Date();
                    sevenDaysAgo.setDate(currentDate.getDate() - 3);
                    const newUsers = accounts.filter(
                        (account) => new Date(account.created_at) >= sevenDaysAgo
                    );
                    setNewUsersCount(newUsers.length);

                    const { totalRevenue } = revenueResponse.data;
                    setTotalRevenue(totalRevenue);

                    const dailyRevenue = Array(7).fill(0);
                    const dates = [];

                    for (let i = 6; i >= 0; i--) {
                        const date = new Date();
                        date.setDate(currentDate.getDate() - i);
                        const dateString = date.toISOString().split("T")[0];
                        dates.push(dateString);

                        dailyRevenue[6 - i] = orders
                            .filter(
                                (order) =>
                                    new Date(order.created_at).toISOString().split("T")[0] === dateString &&
                                    order.status === "Đã vận chuyển"
                            )
                            .reduce((sum, order) => sum + order.total_price, 0);
                    }

                    setRevenueLast7Days(dailyRevenue.reduce((a, b) => a + b, 0));
                    setRevenuePerDay({ dates, revenues: dailyRevenue });

                    const sortedOrders = [...orders].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setRecentOrders(sortedOrders.slice(0, 7));

                    const topConsumers = accounts
                        .sort((a, b) => b.total_spent - a.total_spent)
                        .slice(0, 5);
                    setTopConsumers(topConsumers);
                } catch (error) {
                    console.error("Error fetching data", error);
                }
            };
            fetchData();
        }, []);

        const ordersPerDay = revenuePerDay.dates.map((date) => {
            return orders.filter(
                (order) =>
                    new Date(order.created_at).toISOString().split("T")[0] === date
            ).length;
        });

        const ordersData = {
            labels: revenuePerDay.dates,
            datasets: [
                {
                    label: "Số lượng đơn hàng",
                    data: ordersPerDay,
                    backgroundColor: "#3B82F6",
                    borderColor: "#2563EB",
                    pointBackgroundColor: "#60A5FA",
                    pointBorderColor: "#1E3A8A",
                    tension: 0.4,
                    fill: false,
                },
            ],
        };

        const revenueData = {
            labels: revenuePerDay.dates,
            datasets: [
                {
                    label: "Doanh Thu",
                    data: revenuePerDay.revenues,
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
                <div className="p-6 bg-gray-50 min-h-screen">
                    <h1 className="text-2xl font-bold text-gray-800 mb-8 mt-6">Bảng Điều Khiển</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Tổng số đơn hàng</h2>
                            <p className="text-3xl font-bold">{totalOrders}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Tổng doanh thu</h2>
                            <p className="text-3xl font-bold">{totalRevenue} đ</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Số người dùng Mới (7 ngày)</h2>
                            <p className="text-3xl font-bold">{newUsersCount}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Doanh Thu</h2>
                            <Bar data={revenueData} />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Đơn hàng theo ngày</h2>
                            <Line data={ordersData} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Khách hàng ưu tú</h2>
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                <tr className="text-gray-500 border-b">
                                    <th className="px-4 py-2">Tên</th>
                                    <th className="px-4 py-2">Địa chỉ</th>
                                    <th className="px-4 py-2">Tổng Chi Tiêu</th>
                                </tr>
                                </thead>
                                <tbody>
                                {topConsumers.map((user) => (
                                    <tr key={user.id} className="border-b">
                                        <td className="px-4 py-2">{user.first_name} {user.last_name}</td>
                                        <td className="px-4 py-2">{user.address}</td>
                                        <td className="px-4 py-2">{user.total_spent} đ</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-medium mb-4">Đơn Hàng Gần Đây</h2>
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                <tr className="text-gray-500 border-b">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Mã đơn</th>
                                    <th className="px-4 py-2">Trạng thái</th>
                                    <th className="px-4 py-2">Giá tiền</th>
                                    <th className="px-4 py-2">Ngày tạo</th>
                                </tr>
                                </thead>
                                <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b">
                                        <td className="px-4 py-2">{order.account_id}</td>
                                        <td className="px-4 py-2">{order.cart_id}</td>
                                        <td className="px-4 py-2">{order.status}</td>
                                        <td className="px-4 py-2">{order.total_price} đ</td>
                                        <td className="px-4 py-2">{order.created_at}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    };

    export default DashboardPage;
