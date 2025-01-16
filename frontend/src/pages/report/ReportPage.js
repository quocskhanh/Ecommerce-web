import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import AdminLayout from "../../layout/AdminLayout";

const ReportPage = () => {
    const [orders, setOrders] = useState([]);
    const [usersCount, setUsersCount] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [revenuePerDay, setRevenuePerDay] = useState({ dates: [], revenues: [] });

    const [products, setProducts] = useState([]);
    const [bestSellingProduct, setBestSellingProduct] = useState(null); // Sản phẩm bán chạy nhất
    const [topCustomer, setTopCustomer] = useState(null);
    const [maxSales, setMaxSales] = useState(0);  // maxSales state
    const [maxSpending, setMaxSpending] = useState(0);  // maxSpending state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Sử dụng token
                    "Content-Type": "application/json",
                };

                const ordersResponse = await axios.get("https://testbe-1.onrender.com/orders", { headers });
                const productsResponse = await axios.get("https://testbe-1.onrender.com/products", { headers });
                const accountsResponse = await axios.get("https://testbe-1.onrender.com/accounts", { headers });


                const orders = ordersResponse.data;
                const products = productsResponse.data;
                const accounts = accountsResponse.data;

                setOrders(orders);
                setProducts(products);
                setUsersCount(accounts.length);

                const currentDate = new Date();
                const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1); // Ngày đầu tháng

                // Tổng số đơn hàng trong tháng
                const monthlyOrders = orders.filter((order) => {
                    const orderDate = new Date(order.created_at);
                    return orderDate >= startOfMonth && orderDate <= currentDate;
                });
                setTotalOrders(monthlyOrders.length);

                // Tính doanh thu trong tháng
                const completedOrdersThisMonth = monthlyOrders.filter((order) => order.status === "Đã thanh toán");
                const monthlyRevenue = completedOrdersThisMonth.reduce((sum, order) => sum + order.total_price, 0);
                setTotalRevenue(monthlyRevenue);

                // Tính doanh thu từng ngày trong tháng
                const dates = [];
                const dailyRevenue = [];
                for (let i = 0; i < 30; i++) {
                    const date = new Date(startOfMonth);
                    date.setDate(startOfMonth.getDate() + i);
                    dates.push(date.toISOString().split("T")[0]);

                    const dailyOrders = monthlyOrders.filter(
                        (order) =>
                            new Date(order.created_at).toISOString().split("T")[0] === date.toISOString().split("T")[0] &&
                            order.status === "Đã thanh toán"
                    );
                    dailyRevenue.push(dailyOrders.reduce((sum, order) => sum + order.total_price, 0));
                }

                setRevenuePerDay({ dates, revenues: dailyRevenue });

                // Tính toán số lượng bán của mỗi sản phẩm
                const productSales = {};

                orders.forEach((order) => {
                    order.items.forEach((item) => {
                        if (productSales[item.productId]) {
                            productSales[item.productId] += item.quantity;
                        } else {
                            productSales[item.productId] = item.quantity;
                        }
                    });
                });

                // Tìm sản phẩm bán chạy nhất
                let bestSelling = null;
                let maxSalesCount = 0;

                Object.keys(productSales).forEach((productId) => {
                    const sales = productSales[productId];
                    if (sales > maxSalesCount) {
                        maxSalesCount = sales;
                        bestSelling = products.find((product) => product.id === productId);
                    }
                });

                setBestSellingProduct(bestSelling);
                setMaxSales(maxSalesCount);

                // Tính toán tổng chi tiêu của mỗi khách hàng
                const customerSpending = {};

                orders.forEach((order) => {
                    if (order.status === "Đã thanh toán") {
                        if (customerSpending[order.account_id]) {
                            customerSpending[order.account_id] += order.total_price;
                        } else {
                            customerSpending[order.account_id] = order.total_price;
                        }
                    }
                });

                // Tìm khách hàng chi tiêu nhiều nhất
                let topCustomer = null;
                let maxSpendingAmount = 0;

                Object.keys(customerSpending).forEach((accountId) => {
                    const spending = customerSpending[accountId];
                    if (spending > maxSpendingAmount) {
                        maxSpendingAmount = spending;
                        topCustomer = accounts.find((account) => account.id === accountId);
                    }
                });

                setTopCustomer(topCustomer);
                setMaxSpending(maxSpendingAmount);

                // Lấy 5 đơn hàng gần đây
                const recentOrders = orders.slice(0, 5);
                setRecentOrders(recentOrders);

            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);

    // Dữ liệu biểu đồ số lượng đơn hàng
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
                fill: false,
            },
        ],
    };

    return (
        <AdminLayout>
            <div className="p-4 sm:p-6 bg-gray-50 min-h-screen overflow-auto">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Báo cáo</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-gray-500">Tổng số người dùng</div>
                    <div className="text-2xl font-semibold">{usersCount}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-gray-500">Tổng số đơn hàng trong tháng</div>
                    <div className="text-2xl font-semibold">{totalOrders}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-gray-500">Tổng doanh thu</div>
                    <div className="text-2xl font-semibold">{totalRevenue.toLocaleString()}</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-gray-500">Sản phẩm bán chạy nhất</div>
                    <div className="text-2xl font-semibold">
                        {bestSellingProduct ? bestSellingProduct.name : "Chưa có dữ liệu"}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-gray-500">Biểu đồ doanh thu</div>
                    <Line data={revenueData} options={{ responsive: true }} />
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <div className="text-gray-500">Biểu đồ số lượng đơn hàng</div>
                    <Bar data={ordersData} options={{ responsive: true }} />
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mt-6">
                <div className="text-gray-500">Khách hàng chi tiêu nhiều nhất</div>
                <div className="text-2xl font-semibold">
                    {topCustomer ? topCustomer.username : "Chưa có dữ liệu"}
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow mt-6">
                <div className="text-gray-500">5 đơn hàng gần đây</div>
                <ul>
                    {recentOrders.map((order) => (
                        <li key={order.id} className="border-b py-2">
                            <div className="text-gray-600">Mã đơn hàng: {order.id}</div>
                            <div className="text-gray-500">
                                Ngày: {new Date(order.created_at).toLocaleDateString()}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            </div>
        </AdminLayout>
    );
};

export default ReportPage;
