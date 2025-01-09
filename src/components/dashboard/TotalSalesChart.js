import React from "react";
import {Bar, Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
} from "chart.js";

// Đăng ký các thành phần cần thiết
ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale
);

const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
        {
            label: "Monthly Sales",
            data: [10, 20, 30, 40, 50],
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 2,
        },
    ],
};

const options = {
    responsive: true,
    scales: {
        x: {
            type: "category",
            title: { display: true, text: "Months" }
        },
        y: {
            type: "linear",
            title: { display: true, text: "Sales" }
        },
    },
};

const TotalSalesChart = () => {
    return <Bar data={data} options={options} />;
};

export default TotalSalesChart;
