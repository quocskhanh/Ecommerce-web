import React, { useState } from 'react';
import AdminLayout from "../../layout/AdminLayout";
import {useNavigate} from "react-router-dom";

const ShippingPage = () => {
    // Sample data for shipping methods
    const [shippingMethods, setShippingMethods] = useState([
        { id: 1, order_id: 101, address: "123 ABC Street", shipping_fee: "50,000 VND", status: "Active" },
        { id: 2, order_id: 102, address: "456 DEF Avenue", shipping_fee: "30,000 VND", status: "Active" },
        { id: 3, order_id: 103, address: "789 GHI Road", shipping_fee: "200,000 VND", status: "Inactive" },
    ]);

    const handleAddShipping = () => {
        // Logic for adding new shipping method
    };

    const handleEditShipping = (id) => {
        // Logic for editing existing shipping method
    };
    const navigate = useNavigate()

    const handleDeleteShipping = (id) => {
    };

    return (
        <AdminLayout>
            <div className="container mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Quản lý Vận chuyển</h2>
                    <button
                        onClick={() =>   navigate("/shipping/update")
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Thêm Phương thức Vận chuyển
                    </button>
                </div>

                <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-300">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mã Đơn Hàng</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Địa chỉ</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phí Vận Chuyển</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Trạng thái</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
                        </tr>
                        </thead>
                        <tbody>
                        {shippingMethods.map((method) => (
                            <tr key={method.id} className="border-b">
                                <td className="px-6 py-4 text-sm text-gray-800">{method.order_id}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{method.address}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">{method.shipping_fee}</td>
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    <span
                                        className={`px-2 py-1 rounded-full text-white ${
                                            method.status === "Active" ? "bg-green-500" : "bg-red-500"
                                        }`}
                                    >
                                        {method.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-800">
                                    <button
                                        onClick={() => handleEditShipping(method.id)}
                                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mr-2"
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        onClick={() => handleDeleteShipping(method.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ShippingPage;
