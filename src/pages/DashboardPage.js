import React from "react";
import LayoutDashboard from "../layout/LayoutDashboard";
import Heading from "../components/common/Heading";
import TotalCard from "../components/dashboard/TotalCard";
import TotalSalesChart from "../components/dashboard/TotalSalesChart";
import MonthlyStatisticsChart from "../components/dashboard/MonthlyStatisticsChart";

const DashboardPage = () => {
    return (
        <LayoutDashboard>
            <Heading title="Dashboard" />

            {/* Cards Section */}
            <div className="grid grid-cols-4 gap-6 mb-8">
                <TotalCard
                    title="Total Revenue"
                    value="$10.54"
                    percentage="+22.45%"
                    description="Revenue in the last 30 days"
                    icon="revenue"
                />
                <TotalCard
                    title="Orders"
                    value="1,056"
                    percentage="+15.34%"
                    description="Orders in the last 30 days"
                    icon="orders"
                />
                <TotalCard
                    title="Unique Visits"
                    value="5,420"
                    percentage="+10.24%"
                    description="Visitors in the last 30 days"
                    icon="visits"
                />
                <TotalCard
                    title="New Users"
                    value="1,650"
                    percentage="+15.34%"
                    description="New users in the last 30 days"
                    icon="users"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="col-span-2 bg-white p-6 rounded-lg shadow">
                    <TotalSalesChart title="Orders Over Time" />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <MonthlyStatisticsChart title="Last 7 Days Sales" />
                </div>
            </div>

            {/* Data Tables Section */}
            <div className="grid grid-cols-2 gap-6">

            </div>
        </LayoutDashboard>
    );
};

export default DashboardPage;
