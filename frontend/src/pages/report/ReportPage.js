import React from "react";
import { Bar, Line } from "react-chartjs-2";
import AdminLayout from "../../layout/AdminLayout";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DeviceMobileIcon, DesktopComputerIcon, DeviceTabletIcon } from '@heroicons/react/outline';
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(LineElement, BarElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const ReportPage = () => {
    const chartData = {
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"],
        datasets: [
            {
                label: "Khách hàng từng mua",
                data: [300, 200, 400, 300, 350, 280, 400, 450, 300, 400, 320, 380],
                backgroundColor: "#d6daec",
                barPercentage: 0.6,
            },
            {
                label: "Khách hàng mới",
                data: [200, 150, 300, 200, 280, 220, 300, 320, 200, 250, 200, 280],
                backgroundColor: "#1e5eff",
                barPercentage: 0.6,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "#E5E7EB",
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    const averageOrderData = {
        labels: ["4am", "8am", "12pm", "4pm", "8pm", "12am"],
        datasets: [
            {
                label: "Giá trị đơn hàng trung bình",
                data: [500 , 1000, 300, 400, 200, 600],
                borderColor: "#2563EB",
                backgroundColor: "rgba(37, 99, 235, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const averageOrderOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "#E5E7EB",
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };
    const visitsByDevice = [
        { label: "Mobile", value: 65, icon: <DeviceMobileIcon className="h-5 w-5" /> },
        { label: "Desktop", value: 30, icon: <DesktopComputerIcon className="h-5 w-5" /> },
        { label: "Tablet", value: 5, icon: <DeviceTabletIcon className="h-5 w-5" /> },
        { label: "Other", value: 5 },
    ];

    const topCustomers = [
        { name: "Lee Henry", orders: 52, spent: "120.000.000 đ" },
        { name: "Myrtle McBride", orders: 43, spent: "100.000.000 đ" },
        { name: "Tommy Walker", orders: 41, spent: "60.000.000 đ" },
        { name: "Lela Cannon", orders: 38, spent: "40.000.000 đ" },
        { name: "Jimmy Cook", orders: 34, spent: "25.000.000 đ" },
    ];

    const topProducts = [
        { name: "Men White T-Shirt", image:"https://bizweb.dktcdn.net/100/358/122/products/du-an-moi-9-1-2-1-0aae9e00-11ef-4855-b3e4-193283d868e3-9a7e738a-6a6b-4179-91b4-98091a3cb436-1.jpg?v=1678955225603",clicks: 12040, sold: 195 },
        { name: "Women White T-Shirt",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv9Se1-sPq7zSkXuIiiJc3pHIZxPWXPyIuw&s", clicks: 11234, sold: 146 },
        { name: "Women Striped T-Shirt",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIJCHe5-ZFDDeyJCZ4MByPIrAeVb2n7ggK3Q&s", clicks: 10054, sold: 122 },
        { name: "Men Grey Hoodie", image:"https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/16269610/2021/11/27/5e4fb0c8-213e-4ebe-9f13-d0f535c53d061637986277865HIGHLANDERMenGreySweatshirt1.jpg",clicks: 8405, sold: 110 },
        { name: "Women Red T-Shirt",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhWHWsZXu95fpf2HD_TdHkbefYzvIJRPRvJA&s", clicks: 5600, sold: 87 },
    ];


    const stats = [
        { label: "Người dùng hiện tại", value: "5,653", change: "22.45%", color: "text-green-600" },
        { label: "Người dùng mới", value: "1,650", change: "15.34%", color: "text-green-600" },
        { label: "Tổng lượng truy cập", value: "9,504", change: "-18.25%", color: "text-red-600" },
        { label: "Lượng truy cập", value: "5,423", change: "-10.24%", color: "text-red-600" },
    ];
    return (
        <AdminLayout>
            <div className="p-6 bg-gray-50 h-screen overflow-auto">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-8">Thống kê</h1>

                    {/* Customer Growth Chart */}
                    <div className="bg-white shadow rounded-lg p-6 mb-10">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Tăng trưởng khách hàng</h2>
                        <div className="relative h-72">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white shadow rounded-lg p-6 flex flex-col items-center"
                            >
                                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                                <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
                                <p className={`text-sm font-semibold ${stat.color}`}>{stat.change}</p>
                            </div>
                        ))}
                    </div>

                    {/* Goals and Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Sales Goal */}
                        <div className="col-span-1 bg-white shadow rounded-lg p-4 text-center">
                            <h3 className="text-base font-semibold text-gray-700 mb-4">Mục tiêu doanh thu</h3>
                            <div className="w-20 h-20 mx-auto text-center text-[#131523] text-sm font-bold leading-7 mb-6">
                                <CircularProgressbar
                                    value={75}
                                    text={`${75}%`}
                                    styles={buildStyles({
                                        textColor: "#131523",
                                        pathColor: "#FACC15",
                                        trailColor: "#E5E7EB",
                                    })}
                                />
                            </div>
                            <div className="mt-6 text-left space-y-3">
                                <p className="text-sm flex justify-between">
                                    <span>Đã bán:</span> <span className="text-[#131523] font-bold">112.500.000 đ</span>
                                </p>
                                <p className="text-sm flex justify-between">
                                    <span>Mục tiêu tháng:</span> <span className="text-[#131523] font-bold">150.000.000 đ</span>
                                </p>
                                <p className="text-sm flex justify-between">
                                    <span>Còn lại:</span> <span className="text-[#131523] font-bold">37.500.000 đ</span>
                                </p>
                            </div>
                        </div>

                        {/* Conversion Rate */}
                        <div className="col-span-1 bg-white shadow rounded-lg p-4 text-center">
                            <h3 className="text-base font-semibold text-gray-700 mb-4">Tỷ lệ thực hiện</h3>
                            <div className="w-20 h-20 mx-auto text-center text-[#131523] text-sm font-bold leading-7 mb-6">
                                <CircularProgressbar
                                    value={25}
                                    text={`${25}%`}
                                    styles={buildStyles({
                                        textColor: "#131523",
                                        pathColor: "green",
                                        trailColor: "#E5E7EB",
                                    })}
                                />
                            </div>
                            <div className="mt-6 text-left space-y-3">
                                <p className="text-sm flex justify-between">
                                    <span>Giỏ hàng:</span> <span className="text-[#131523] font-bold">35%</span>
                                </p>
                                <p className="text-sm flex justify-between">
                                    <span>Mua hàng:</span> <span className="text-[#131523] font-bold">29%</span>
                                </p>
                                <p className="text-sm flex justify-between">
                                    <span>Thanh toán:</span> <span className="text-[#131523] font-bold">29%</span>
                                </p>
                            </div>
                        </div>

                        {/* Average Order Value */}
                        <div className="col-span-2 bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-6">Giá trị đơn hàng trung bình</h3>
                            <div className="relative h-40 mb-6">
                                <Line data={averageOrderData} options={averageOrderOptions} />
                            </div>
                            <p className="mt-6 text-center mb-3 flex justify-center gap-x-2 text-sm">
                                <span>Tháng này:</span>
                                <span className="font-bold">25.000.000 đ</span>
                            </p>

                            <p className="mt-6 text-center mb-3 flex justify-center gap-x-2 text-sm">
                                <span>Tháng trước:</span>
                                <span className="font-bold">35.000.000 đ</span>
                            </p>

                        </div>
                    </div>

                    {/* Customer Demographics */}
                    <div className="bg-white shadow rounded-lg p-6 mb-10 mt-8">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Customer Demographics</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="col-span-2">
                                <ul className="mt-4 grid grid-cols-2 gap-2 text-gray-700">
                                    <li>Hà Nội: <span className="font-bold">29,051</span></li>
                                    <li>Phú Thọ: <span className="font-bold">18,041</span></li>
                                    <li>Thanh Hóa: <span className="font-bold">10,430</span></li>
                                    <li>Hải Dương: <span className="font-bold">5,420</span></li>
                                </ul>
                            </div>
                            <div className="flex flex-col justify-between">
                                {/* Visits by Device */}
                                <div className="bg-gray-50 shadow rounded-lg p-4 mb-6">
                                    <h3 className="text-sm font-bold text-gray-700">Lượt truy cập theo thiết bị</h3>
                                    <ul className="mt-4 space-y-2">
                                        {visitsByDevice.map((device, index) => (
                                            <li key={index} className="flex justify-between items-center text-gray-600">
        <span className="flex items-center">
          <span className="mr-2 text-xl">{device.icon}</span>
            {device.label}
        </span>
                                                <span className="font-bold">{device.value}%</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Online Sessions */}
                                <div className="bg-gray-50 shadow rounded-lg p-4">
                                    <h3 className="text-sm font-bold text-gray-700">Trực tuyến</h3>
                                    <p className="mt-4 text-center text-2xl font-bold text-green-600">128</p>
                                    <p className="text-center text-sm text-gray-500">Người dùng hoạt động</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Customers & Products */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Top Customers */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-[#131523] text-base font-bold leading-normal mb-4">Khách hàng ưu tú</h3>

                            <div className="grid grid-cols-3 font-bold text-sm text-gray-700 mb-2">
                                <span className="text-left">Tên</span>
                                <span className="text-center">Số lượng đơn hàng</span>
                                <span className="text-right">Tổng chi tiêu</span>
                            </div>
                            <ul>
                                {topCustomers.map((customer, index) => (
                                    <li
                                        key={index}
                                        className="grid grid-cols-3 items-center py-3 text-gray-600 border-b last:border-0"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={customer.avatar || "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"}
                                                alt={customer.name}
                                                className="w-8 h-8 rounded-full"
                                            />

                                            <span className="text-[#131523] text-sm font-medium truncate">
                            {customer.name}
                        </span>
                                        </div>
                                        <span className="text-[#131523] text-sm font-normal text-center">
                        {customer.orders}
                    </span>
                                        <span className="text-[#131523] text-sm font-normal text-right">
                        {customer.spent}
                    </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Top Products */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-[#131523] text-base font-bold leading-normal mb-4">Sản phẩm bán chạy</h3>

                            <div className="grid grid-cols-3 font-bold text-sm text-gray-700 mb-2">
                                <span className="text-left">Tên</span>
                                <span className="text-center">Lượt tương tác</span>
                                <span className="text-right">Số lượng đã bán</span>
                            </div>
                            <ul>
                                {topProducts.map((product, index) => (
                                    <li
                                        key={index}
                                        className="grid grid-cols-3 items-center py-3 text-gray-600 border-b last:border-0"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-8 h-8 rounded"
                                            />
                                            <span className="text-[#131523] text-sm font-medium truncate">
                            {product.name}
                        </span>
                                        </div>
                                        <span className="text-[#131523] text-sm font-normal text-center">
                        {product.clicks}
                    </span>
                                        <span className="text-[#131523] text-sm font-normal text-right">
                        {product.sold}
                    </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ReportPage;
