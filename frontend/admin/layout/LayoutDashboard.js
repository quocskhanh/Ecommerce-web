import React from 'react';
import DashboardTopbar from "../modules/dashboard/DashboardTopbar";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";

const LayoutDashboard = ({ children }) => {
    return (
        <div className="h-screen bg-lite flex flex-col overflow-y-auto">
            {/* Topbar */}
            <DashboardTopbar />

            <div className="flex h-screen mt-16"> {/* Thêm mt-16 để đẩy Sidebar xuống dưới Topbar */}
                {/* Sidebar */}
                <DashboardSidebar />
                {/* Main content */}
                <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default LayoutDashboard;
