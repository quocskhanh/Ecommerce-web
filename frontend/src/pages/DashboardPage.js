import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const DashboardPage = () => {
    const [selectedFilter, setSelectedFilter] = useState("day");


    // Dữ liệu mẫu cho biểu đồ
    const lineData = {
        labels: selectedFilter === "day" ? ["4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"] :
            selectedFilter === "week" ? ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"] :
                selectedFilter === "month" ? ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"] : [],
        datasets: [
            {
                label: "Ngày 22",
                data: selectedFilter === "day" ? [10, 20, 30, 40, 34, 50, 42, 35, 48, 30, 25, 35] :
                    selectedFilter === "week" ? [200, 350, 300, 400, 250, 450, 500] :
                        selectedFilter === "month" ? [1000, 1200, 1500, 1800, 1700, 1600, 2000, 2200, 2500, 2400, 2300, 2500] : [],
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                tension: 0.4,
            },
            {
                label: "Ngày 21",
                data: selectedFilter === "day" ? [5, 15, 25, 35, 30, 45, 40, 30, 42, 28, 20, 25] :
                    selectedFilter === "week" ? [100, 200, 150, 250, 200, 300, 350] :
                        selectedFilter === "month" ? [800, 950, 1200, 1500, 1300, 1400, 1800, 1700, 2000, 2100, 2300, 2200] : [],
                borderColor: "#D1D5DB",
                backgroundColor: "rgba(209, 213, 219, 0.5)",
                tension: 0.4,
            },
        ],
    };

    const barData = {
        labels: ["12", "13", "14", "15", "16", "17", "18"],
        datasets: [
            {
                label: "Doanh thu",
                data: [1000, 1200, 1525, 2525, 2100, 2300, 2400],
                backgroundColor: "#10B981",
            },
        ],
    };

    return (
        <AdminLayout>
            <div className="p-4 sm:p-6 bg-gray-50 min-h-screen overflow-auto">
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">Bảng Điều Khiển</h1>
                    <button className="flex items-center gap-2 px-4 py-2 text-blue-500 text-sm sm:text-base font-normal leading-normal rounded-lg shadow hover:bg-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="blue">
                            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                        </svg>
                        Quản lý
                    </button>
                </div>

                {/* Tổng quan */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                    {[
                        { title: "Tổng doanh thu", value: "1.121.245.312 đ", growth: "+22.45%", bgColor: "bg-gray-200", textColor: "text-blue-500" },
                        { title: "Đơn hàng", value: "1,056", growth: "+10.24%", bgColor: "bg-gray-200", textColor: "text-yellow-500" },
                        { title: "Lượng truy cập", value: "5,420", growth: "+10.24%", bgColor: "bg-gray-200", textColor: "text-pink-500" },
                        { title: "Số người dùng mới", value: "1,650", growth: "+15.34%", bgColor: "bg-gray-200", textColor: "text-green-500" },
                    ].map((item, index) => (
                        <div key={index} className={`p-4 ${item.bgColor} rounded-lg shadow`}>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-lg sm:text-xl font-bold mt-2">{item.value}</p>
                            <p className={`text-sm ${item.textColor}`}>{item.growth}</p>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Orders Chart */}
                    <div className="col-span-1 lg:col-span-2 bg-white p-4 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-medium">Thống Kê Đơn Hàng</h2>
                            <div className="flex space-x-2">
                                {["day", "week", "month"].map((filter) => (
                                    <button
                                        key={filter}
                                        className={`px-3 py-1 text-sm bg-gray-100 rounded shadow ${
                                            selectedFilter === filter ? "bg-gray-300" : ""
                                        }`}
                                        onClick={() => setSelectedFilter(filter)}
                                    >
                                        {filter === "day" ? "Hàng Ngày" : filter === "week" ? "Hàng Tuần" : "Hàng Tháng"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="h-[300px] md:h-[400px]">
                            <Line data={lineData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Doanh Thu 7 Ngày Qua</h2>
                        <div className="h-[300px] md:h-[400px]">
                            <Bar data={barData} options={{ maintainAspectRatio: false }} />
                        </div>
                    </div>
                </div>

                {/* Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
                    {/* Recent Transactions */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Giao Dịch Gần Đây</h2>
                        <div className="overflow-x-auto">
                        <table className="w-full text-left border-separate border-spacing-2">
                            <thead>
                            <tr className="text-sm text-gray-500">
                                <th className="px-4 py-2">Tên</th>
                                <th className="px-4 py-2">Ngày</th>
                                <th className="px-4 py-2">Số Tiền</th>
                                <th className="px-4 py-2">Trạng Thái</th>
                            </tr>
                            </thead>
                            <tbody>
                            {[{
                                name: "Jagarnath S.", date: "24.05.2023", amount: "124.970 đ", status: "Đã thanh toán"
                            }, {
                                name: "Anand G.", date: "23.05.2023", amount: "55.420 đ", status: "Chờ thanh toán"
                            }, {
                                name: "Kartik S.", date: "23.05.2023", amount: "89.900 đ", status: "Đã thanh toán"
                            }, {
                                name: "Rakesh S.", date: "22.05.2023", amount: "144.940 đ", status: "Chờ thanh toán"
                            }, {
                                name: "Anup S.", date: "22.05.2023", amount: "240.200 đ", status: "Đã thanh toán"
                            }].map((item, index) => (
                                <tr key={index} className="text-sm">
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.date}</td>
                                    <td className="px-4 py-2">{item.amount}</td>
                                    <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 text-xs rounded ${item.status === "Đã thanh toán" ? "bg-green-100 text-green-500" : "bg-yellow-100 text-yellow-500"}`}
                                            >
                                                {item.status}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    </div>

                    {/* Best-Selling Products */}
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Sản Phẩm Bán Chạy Nhất</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                            <thead>
                            <tr className="text-sm text-gray-500">
                                <th className="px-4 py-2">Hình ảnh</th>
                                <th className="px-4 py-2">Tên</th>
                                <th className="px-4 py-2">Giá</th>
                                <th className="px-4 py-2">Số Lượng Bán</th>
                            </tr>
                            </thead>
                            <tbody>
                            {[{
                                name: "Áo Hoodie Xám Nam",
                                image: "https://www.pursuefitness.com/cdn/shop/files/oversized-hoodie-grey-marl-mens.jpg?v=1691625718",
                                price: "300.000 đ",
                                units: 204
                            }, {
                                name: "Áo Thun Kẻ Sọc Nữ",
                                image: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/476248/item/vngoods_69_476248_3x4.jpg?width=494",
                                price: "400.000 đ",
                                units: 155
                            }, {
                                name: "Áo Thun Trắng Nữ",
                                image: "https://i5.walmartimages.com/seo/Gildan-Women-T-Shirts-Value-Pack-White-Shirts-Plain-Sleep-Single-OR-6-12-T-shirts-T-shirt-Casual-Shirt-Basic_5987debd-a4bd-480e-b472-d81c0be28213.f96c79d6c3dabae5ba0152e84fccd97e.jpeg",
                                price: "900.000 đ",
                                units: 120
                            }, {
                                name: "Áo Thun Trắng Nam",
                                image: "https://cdn.shopify.com/s/files/1/0835/1005/files/Escuyer-crew-neck-t-shirt-white-1_1024x1024.jpg?15355619158198583135",
                                price: "999.000 đ",
                                units: 204
                            }, {
                                name: "Áo Thun Đỏ Nữ",
                                image: "https://muselot.in/cdn/shop/products/Women_s-plain-red-t-shirt.jpg?v=1658093714",
                                price: "565.000 đ",
                                units: 155
                            }].map((item, index) => (
                                <tr key={index} className="text-sm">
                                    <td className="px-4 py-2">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.price}</td>
                                    <td className="px-4 py-2">{item.units}</td>
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
