import React from 'react';
import OrderTable from "../components/table/OrderTable";
import LayoutDashboard from "../layout/LayoutDashboard";
import CouponTable from "../components/table/CouponTable";

const CustomerPage = () => {
    return (
        <div>
            <LayoutDashboard>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
                        <div className="flex gap-4">
                            <button className="px-4 py-2 bg-[#1e5eff] rounded text-white">
                                + Create
                            </button>
                        </div>
                    </div>
                    <CouponTable />
                </div>
            </LayoutDashboard>
        </div>
    );
};

export default CustomerPage;