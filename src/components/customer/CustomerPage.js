import React from 'react';
import OrderTable from "../components/table/OrderTable";
import LayoutDashboard from "../layout/LayoutDashboard";
import CustomerTable from "../components/table/CustomerTable";

const CustomerPage = () => {
    return (
        <div>
            <LayoutDashboard>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
                        <div className="text-[#5a607f] text-base font-normal font-['Inter'] leading-normal">All Customers</div>
                        <div className="text-[#5a607f] text-base font-normal font-['Inter'] leading-normal">New Customers</div>
                        <div className="text-[#5a607f] text-base font-normal font-['Inter'] leading-normal">From Europe</div>
                        <div className="text-[#5a607f] text-base font-normal font-['Inter'] leading-normal">Returning Customers</div>
                        <div className="flex gap-4">
                            <button className="px-4 py-2 bg-white rounded border border-[#d6daec]">
                                Export
                            </button>
                            <button className="px-4 py-2 bg-[#1e5eff] rounded text-white">
                                + Add Customer
                            </button>
                        </div>
                    </div>
                    <CustomerTable />
                </div>
            </LayoutDashboard>
        </div>
    );
};

export default CustomerPage;