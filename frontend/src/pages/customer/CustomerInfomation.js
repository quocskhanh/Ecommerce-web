import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";

const CustomerInfomation = () => {
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Giả sử bạn gọi API để lưu dữ liệu vào backend ở đây
        console.log("Customer information saved", customerInfo);
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Thông tin khách hàng</h1>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="space-y-6">
                        {/* Tên khách hàng */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Tên khách hàng
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={customerInfo.name}
                                onChange={handleChange}
                                className="mt-2 p-3 border border-gray-300 rounded w-full"
                                placeholder="Nhập tên khách hàng"
                            />
                        </div>

                        {/* Email khách hàng */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={customerInfo.email}
                                onChange={handleChange}
                                className="mt-2 p-3 border border-gray-300 rounded w-full"
                                placeholder="Nhập email khách hàng"
                            />
                        </div>

                        {/* Số điện thoại khách hàng */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={customerInfo.phone}
                                onChange={handleChange}
                                className="mt-2 p-3 border border-gray-300 rounded w-full"
                                placeholder="Nhập số điện thoại khách hàng"
                            />
                        </div>

                        {/* Địa chỉ khách hàng */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Địa chỉ
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={customerInfo.address}
                                onChange={handleChange}
                                className="mt-2 p-3 border border-gray-300 rounded w-full"
                                placeholder="Nhập địa chỉ khách hàng"
                            />
                        </div>

                        {/* Thành phố */}
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                Thành phố
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={customerInfo.city}
                                onChange={handleChange}
                                className="mt-2 p-3 border border-gray-300 rounded w-full"
                                placeholder="Nhập thành phố"
                            />
                        </div>

                        {/* Quốc gia */}
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Quốc gia
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={customerInfo.country}
                                onChange={handleChange}
                                className="mt-2 p-3 border border-gray-300 rounded w-full"
                                placeholder="Nhập quốc gia"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <button
                            onClick={() => console.log("Cancel")}
                            className="px-6 py-3 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CustomerInfomation;
