import React from "react";
import DashboardTopbar from "../dashboard/DashboardTopbar";
import DashboardSidebar from "../dashboard/DashboardSidebar";

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-lite flex flex-col overflow-hidden">
            {/* Topbar */}
            <DashboardTopbar />

            <div className="flex h-screen mt-16">
                {/* Sidebar */}
                <div className="fixed top-16 left-0 h-[calc(100%-4rem)] w-[260px] overflow-y-auto bg-[#1e2753] z-10">
                    <DashboardSidebar />
                </div>
                {/* Main content */}
                <div className="flex-1 ml-[280px] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
