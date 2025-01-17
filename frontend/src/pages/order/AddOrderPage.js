import React, { useState } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const AddOrderPage = () => {
    const navigate = useNavigate();

    // State to store form information
    const [order, setOrder] = useState({
        id: '',
        order: '',
        date: '',
        customer: '',
        paymentStatus: 'Đã thanh toán', // Default value
        orderStatus: 'Chờ lấy hàng', // Default value
        total: ''
    });

    // State to show API loading status
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false); // Modal state

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Check if any field is empty
        if (!order.id || !order.order || !order.date || !order.customer || !order.total) {
            alert("Vui lòng điền đầy đủ thông tin đơn hàng.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Call API to add the order
            const response = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });

            if (!response.ok) {
                throw new Error(`Lỗi ${response.status}: Không thể thêm đơn hàng`);
            }

            const result = await response.json();
            console.log('API Response:', result);

            // Show success modal
            setShowModal(true);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Đã xảy ra lỗi khi thêm đơn hàng');
        } finally {
            setLoading(false);
        }
    };

    // Close modal and navigate to orders page
    const handleModalConfirm = () => {
        setShowModal(false);
        navigate('/order');
    };

    const handleCancel = () => {
        // Navigate back to orders page
        navigate("/order");
    };

    return (
        <AdminLayout>
            <div className="flex">
                <div className="w-full overflow-y-auto h-screen p-8 bg-gray-50">
                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate('/order')} // Navigate back to orders page
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            ← Quay lại
                        </button>
                    </div>

                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-[#131523] text-2xl font-bold leading-9">Thêm đơn hàng</h1>
                    </header>

                    {/* Scrollable Form Container with Border */}
                    <div className="bg-white shadow-md rounded-lg p-8 space-y-8 border-t-4">
                        {/* Order Information */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Thông tin đơn hàng</h2>
                            <p className="text-sm text-gray-500 mb-4">Thông tin chi tiết về đơn hàng</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="id"
                                    value={order.id}
                                    onChange={handleChange}
                                    placeholder="ID đơn hàng"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="text"
                                    name="order"
                                    value={order.order}
                                    onChange={handleChange}
                                    placeholder="Mã đơn hàng"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="datetime-local"
                                    name="date"
                                    value={order.date}
                                    onChange={handleChange}
                                    placeholder="Ngày đặt hàng"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="text"
                                    name="customer"
                                    value={order.customer}
                                    onChange={handleChange}
                                    placeholder="Tên khách hàng"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                            </div>
                        </div>

                        {/* Payment Status */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Trạng thái thanh toán</h2>
                            <p className="text-sm text-gray-500 mb-4">Chọn trạng thái thanh toán cho đơn hàng</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <select
                                    name="paymentStatus"
                                    value={order.paymentStatus}
                                    onChange={handleChange}
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                >
                                    <option value="Đã thanh toán">Đã thanh toán</option>
                                    <option value="Đang xử lý">Đang xử lý</option>
                                </select>
                            </div>
                        </div>

                        {/* Order Status */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Trạng thái đơn hàng</h2>
                            <p className="text-sm text-gray-500 mb-4">Chọn trạng thái của đơn hàng</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <select
                                    name="orderStatus"
                                    value={order.orderStatus}
                                    onChange={handleChange}
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                >
                                    <option value="Chờ lấy hàng">Chờ lấy hàng</option>
                                    <option value="Đang giao hàng">Đang giao hàng</option>
                                    <option value="Đã giao hàng">Đã giao hàng</option>
                                </select>
                            </div>
                        </div>

                        {/* Total Amount */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Tổng tiền</h2>
                            <p className="text-sm text-gray-500 mb-4">Nhập tổng số tiền đơn hàng</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="total"
                                    value={order.total}
                                    onChange={handleChange}
                                    placeholder="Nhập tổng tiền (VD: 1.000.000 đ)"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                            </div>
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
                            type="submit"
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                        >
                            Lưu
                        </button>
                    </div>

                    {/* Modal for success */}
                    {showModal && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
                            style={{ animation: 'fadeIn 0.3s' }}
                        >
                            <div
                                className="bg-white rounded-lg p-6 w-96 shadow-lg text-center transform transition-transform duration-300 ease-in-out scale-90"
                                style={{ animation: 'scaleIn 0.3s forwards' }}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue">
                                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold">Thêm đơn hàng thành công</h2>
                                <button
                                    onClick={() => {
                                        const modalElement = document.querySelector('.bg-white');
                                        modalElement.style.animation = 'scaleOut 0.3s forwards';

                                        setTimeout(() => {
                                            setShowModal(false); // Close modal
                                            navigate('/order'); // Navigate to the orders page
                                        }, 300); // Customize delay if needed
                                    }}
                                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition-transform duration-200 hover:scale-105"
                                >
                                    Tiếp tục
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddOrderPage;
