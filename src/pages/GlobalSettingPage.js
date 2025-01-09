import React from 'react';
import OrderTable from "../components/table/OrderTable";
import LayoutDashboard from "../layout/LayoutDashboard";
import CustomerTable from "../components/table/CustomerTable";
import PersonalTable from "../components/table/PersonalTable";
import GlobalSettingTable from "./GlobalSettingTable";

const CustomerPage = () => {
    return (
        <div>
            <LayoutDashboard>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Choose a plan</h1>
                    </div>
                    <GlobalSettingTable />
                </div>
            </LayoutDashboard>
        </div>
    );
};

export default CustomerPage;