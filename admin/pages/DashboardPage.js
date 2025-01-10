import React from "react";
import LayoutDashboard from "../layout/LayoutDashboard";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const DashboardPage = () => {
    // Dữ liệu mẫu cho biểu đồ
    const lineData = {
        labels: ["4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm"],
        datasets: [
            {
                label: "May 22",
                data: [10, 20, 30, 40, 34, 50, 42, 35, 48, 30, 25, 35],
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                tension: 0.4,
            },
            {
                label: "May 21",
                data: [5, 15, 25, 35, 30, 45, 40, 30, 42, 28, 20, 25],
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
                label: "Revenue",
                data: [1000, 1200, 1525, 2525, 2100, 2300, 2400],
                backgroundColor: "#10B981",
            },
        ],
    };

    return (
        <LayoutDashboard>
            <div className="p-6 bg-gray-50 h-screen overflow-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Dashboard</h1>
                    <button className="flex items-center gap-2 px-4 py-2  text-[#1e5eff] text-base font-normal font-['Inter'] leading-normal rounded-lg shadow hover:bg-blue-300">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/></svg>
        </span>
                        Manage
                    </button>
            </div>

                {/* Tổng quan */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                    {[
                        { title: "Total Revenue", value: "$10.54", growth: "+22.45%", bgColor: "bg-blue-100", textColor: "text-blue-500" },
                        { title: "Orders", value: "1,056", growth: "+10.24%", bgColor: "bg-yellow-100", textColor: "text-yellow-500" },
                        { title: "Unique Visits", value: "5,420", growth: "+10.24%", bgColor: "bg-pink-100", textColor: "text-pink-500" },
                        { title: "New Users", value: "1,650", growth: "+15.34%", bgColor: "bg-green-100", textColor: "text-green-500" },
                    ].map((item, index) => (
                        <div key={index} className={`p-4 ${item.bgColor} rounded-lg shadow`}>
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xl font-bold mt-2">{item.value}</p>
                            <p className={`text-sm ${item.textColor}`}>{item.growth}</p>
                        </div>
                    ))}
                </div>

                {/* Biểu đồ */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Biểu đồ Orders Over Time */}
                    <div className="col-span-2 bg-white p-4 rounded-lg shadow h-[400px] flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium">Orders Over Time</h2>
                            <div className="space-x-2">
                                <button className="px-3 py-1 text-sm bg-gray-100 rounded shadow">Daily</button>
                                <button className="px-3 py-1 text-sm bg-gray-100 rounded shadow">Weekly</button>
                                <button className="px-3 py-1 text-sm bg-gray-100 rounded shadow">Monthly</button>
                            </div>
                        </div>
                        <Line data={lineData} options={{ maintainAspectRatio: false }} />
                        <div className="mt-4 flex justify-between text-gray-500 text-sm">
                            <p>Total Orders: <span className="text-gray-800 font-bold">12,345</span></p>
                            <p>Growth: <span className="text-green-500 font-bold">+15%</span></p>
                        </div>
                    </div>

                    {/* Biểu đồ Last 7 Days Sales */}
                    <div className="bg-white p-4 rounded-lg shadow h-[400px] flex flex-col">
                        <h2 className="text-lg font-medium mb-4">Last 7 Days Sales</h2>
                        <Bar data={barData} options={{ maintainAspectRatio: false }} />
                        <div className="mt-4 text-gray-500">
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-lg font-bold">1,259</p>
                                    <p className="text-sm">Items Sold</p>
                                </div>
                                <div>
                                    <p className="text-lg font-bold">$12,546</p>
                                    <p className="text-sm">Revenue</p>
                                </div>
                            </div>
                            <div className="mt-2 text-sm">
                                <p>Highest Sales: <span className="font-bold">May 16</span> ($2,525)</p>
                                <p>Lowest Sales: <span className="font-bold">May 12</span> ($1,000)</p>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Bảng */}
                <div className="grid grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
                        <table className="w-full text-left border-separate border-spacing-2">
                            <thead>
                            <tr className="text-sm text-gray-500">
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Amount</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {[
                                { name: "Jagarnath S.", date: "24.05.2023", amount: "$124.97", status: "Paid" },
                                { name: "Anand G.", date: "23.05.2023", amount: "$55.42", status: "Pending" },
                                { name: "Kartik S.", date: "23.05.2023", amount: "$89.90", status: "Paid" },
                                { name: "Rakesh S.", date: "22.05.2023", amount: "$144.94", status: "Pending" },
                                { name: "Anup S.", date: "22.05.2023", amount: "$70.52", status: "Paid" },
                            ].map((item, index) => (
                                <tr key={index} className="text-sm">
                                    <td className="px-4 py-2">{item.name}</td>
                                    <td className="px-4 py-2">{item.date}</td>
                                    <td className="px-4 py-2">{item.amount}</td>
                                    <td className="px-4 py-2">
                                            <span
                                                className={`px-2 py-1 text-xs rounded ${
                                                    item.status === "Paid"
                                                        ? "bg-green-100 text-green-500"
                                                        : "bg-yellow-100 text-yellow-500"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-medium mb-4">Top Products by Units Sold</h2>
                        <table className="w-full text-left border-separate border-spacing-2">
                            <thead>
                            <tr className="text-sm text-gray-500">
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Units Sold</th>
                            </tr>
                            </thead>
                            <tbody>
                            {[
                                {
                                    name: "Men Grey Hoodie",
                                    image: "https://www.pursuefitness.com/cdn/shop/files/oversized-hoodie-grey-marl-mens.jpg?v=1691625718",
                                    price: "$49.90",
                                    units: 204
                                },
                                {
                                    name: "Women Striped T-Shirt",
                                    image: "https://image.uniqlo.com/UQ/ST3/vn/imagesgoods/476248/item/vngoods_69_476248_3x4.jpg?width=494",
                                    price: "$34.90",
                                    units: 155
                                },
                                {
                                    name: "Women White T-Shirt",
                                    image: "https://i5.walmartimages.com/seo/Gildan-Women-T-Shirts-Value-Pack-White-Shirts-Plain-Sleep-Single-OR-6-12-T-shirts-T-shirt-Casual-Shirt-Basic_5987debd-a4bd-480e-b472-d81c0be28213.f96c79d6c3dabae5ba0152e84fccd97e.jpeg",
                                    price: "$40.90",
                                    units: 120
                                },
                                {
                                    name: "Men White T-Shirt",
                                    image: "https://cdn.shopify.com/s/files/1/0835/1005/files/Escuyer-crew-neck-t-shirt-white-1_1024x1024.jpg?15355619158198583135",
                                    price: "$49.90",
                                    units: 204
                                },
                                {
                                    name: "Women Red T-Shirt",
                                    image: "https://muselot.in/cdn/shop/products/Women_s-plain-red-t-shirt.jpg?v=1658093714",
                                    price: "$34.90",
                                    units: 155
                                },
                            ].map((item, index) => (
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
        </LayoutDashboard>
    );
};

export default DashboardPage;
