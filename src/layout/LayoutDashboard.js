import React from 'react';
import DashboardTopbar from "../modules/dashboard/DashboardTopbar";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";

const LayoutDashboard = ({ children }) => {
    return (
        <div className="min-h-screen bg-lite flex flex-col">
            {/* Topbar */}
            <DashboardTopbar />

            <div className="flex h-screen mt-16"> {/* Thêm mt-16 để đẩy Sidebar xuống dưới Topbar */}
                {/* Sidebar */}
                <DashboardSidebar />
                {/* Main content */}
                <div className="flex-1 overflow-hidden">{children}</div>
            </div>
        </div>
    );
};

export default LayoutDashboard;
