import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";

const AddCustomerPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false); // Modal state

    // State for the form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        streetAddress: "",
        apartment: "",
        city: "",
        country: "",
        postalCode: "",
        notes: "",
    });

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle save action (submit form data)
    const handleSave = () => {
        // You can make an API call here or save the data to local state
        console.log("Saved data: ", formData);
        // Redirect to customer page or show success message
        navigate("/customer");
    };

    // Handle cancel action (go back to customer page without saving)
    const handleCancel = () => {
        // Navigate back to customer page
        navigate("/customer");
    };

    return (
        <AdminLayout>
            <div className="flex">
                {/* Main Content */}
                <div className="w-full overflow-y-auto h-screen p-8 bg-gray-50">
                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate("/customer")} // Navigate back to customer page
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            ← Quay lại
                        </button>
                    </div>

                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-[#131523] text-2xl font-bold  leading-9">
                           Thêm khách hàng
                        </h1>
                    </header>

                    {/* Scrollable Form Container with Border */}
                    <div className="bg-white shadow-md rounded-lg p-8 space-y-8 border-t-4">
                        {/* Customer Information */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Thông tin khách hàng</h2>
                            <p className="text-sm text-gray-500 mb-4">Thông tin chi tiết về khách hàng</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Họ"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Tên"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Số điện thoại"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                            </div>
                        </div>

                        {/* Customer Address */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Địa chỉ khách hàng</h2>
                            <p className="text-sm text-gray-500 mb-4">Thông tin địa chỉ giao hàng</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                    placeholder="Đường"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="text"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleChange}
                                    placeholder="Căn hộ,văn phòng..."
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Thành phố"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <div>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                    >
                                        <option value="">Quốc gia</option>
                                        <option value="us">Việt Nam</option>
                                        <option value="ca">Trung Quốc</option>
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    placeholder="Mã bưu điện"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Số điện thoại"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                            </div>
                        </div>

                        {/* Customer Notes */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Ghi chú khách hàng</h2>
                            <p className="text-sm text-gray-500 mb-4">Thêm bất kỳ ghi chú nào liên quan đến khách hàng</p>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Thêm ghi chú về khách hàng"
                                className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                rows="6"
                            ></textarea>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-8 space-x-6 bottom-0 p-6">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-3 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200 transition duration-300"
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowModal(true);
                            }}
                            className="px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                        >
                            Lưu
                        </button>
                    </div>


                    {showModal && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
                            style={{ animation: "fadeIn 0.3s" }}
                        >
                            <div
                                className="bg-white rounded-lg p-6 w-96 shadow-lg text-center transform transition-transform duration-300 ease-in-out scale-90"
                                style={{ animation: "scaleIn 0.3s forwards" }}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold">Import Successful</h2>
                                <button
                                    onClick={() => {
                                        const modalElement = document.querySelector('.bg-white');
                                        modalElement.style.animation = "scaleOut 0.3s forwards";

                                        setTimeout(() => {
                                            setShowModal(false); // Đóng modal
                                            navigate("/customer"); // Điều hướng đến trang "add-product"
                                        }, 300); // Tùy chỉnh thời gian trễ nếu cần
                                    }}
                                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition-transform duration-200 hover:scale-105"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddCustomerPage;
