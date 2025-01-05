import React from 'react';
import DashboardTopbar from "../modules/dashboard/DashboardTopbar";
import DashboardSidebar from "../modules/dashboard/DashboardSidebar";
import Overlay from "../components/common/Overlay";

const LayoutDashboard = ({children}) => {
    return (
        <div className="p-10 bg-lite">
            <DashboardTopbar></DashboardTopbar>
            <div className="flex gap-x-10 items-start min-h-screen">
                <Overlay></Overlay>
                <DashboardSidebar></DashboardSidebar>
            <div className="flex-1">
                {children}
            </div>
            </div>
        </div>
    );
};

export default LayoutDashboard;