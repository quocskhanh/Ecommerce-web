import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Đăng ký các thành phần Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MonthlyStatisticsChart = ({ title }) => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
            {
                label: "Profit",
                data: [75, 65, 85, 55, 70, 60, 75, 85, 80, 70, 60, 75],
                backgroundColor: "#FFD700", // Gold
            },
            {
                label: "Refunds",
                data: [50, 55, 45, 60, 40, 50, 55, 45, 60, 40, 55, 50],
                backgroundColor: "#4682FF", // Blue
            },
            {
                label: "Expenses",
                data: [65, 70, 60, 75, 80, 65, 70, 60, 75, 80, 70, 65],
                backgroundColor: "#2FBF71", // Green
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { beginAtZero: true },
        },
    };

    return (
        <div className="p-8 mbbg-white rounded shadow h-[350px]">
            <h4 className="mb-4 text-lg font-semibold">{title}</h4>
            <Bar data={data} options={options} />
        </div>
    );
};

export default MonthlyStatisticsChart;
