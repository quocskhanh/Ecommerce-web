import React from 'react';
import LayoutDashboard from "../layout/LayoutDashboard";
import ProductTable from "../components/table/ProductTable";

const ProductPage = () => {
    return (
        <LayoutDashboard>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-white rounded border border-[#d6daec]">
                            Export
                        </button>
                        <button className="px-4 py-2 bg-[#1e5eff] rounded text-white">
                            + Add Product
                        </button>
                    </div>
                </div>
                <ProductTable />
            </div>
        </LayoutDashboard>
    );
};

export default ProductPage;
