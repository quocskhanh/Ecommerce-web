import React from 'react';
import OrderTable from "../components/table/OrderTable";
import LayoutDashboard from "../layout/LayoutDashboard";
import CustomerTable from "../components/table/CustomerTable";
import PersonalTable from "../components/table/PersonalTable";

const CustomerPage = () => {
    return (
        <div>
            <LayoutDashboard>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                        <div className="flex gap-4">
                            <button className="px-4 py-2 bg-white rounded border border-[#d6daec]">
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-[#1e5eff] rounded text-white">
                                Save
                            </button>
                        </div>
                    </div>
                    <PersonalTable />
                </div>
            </LayoutDashboard>
        </div>
    );
};

export default CustomerPage;