import React, { useState } from 'react';
import AdminLayout from '../../layout/AdminLayout';
import { useNavigate } from 'react-router-dom';

const AddOrderPage = () => {
    const navigate = useNavigate();

    // State to store form information
    const [order, setOrder] = useState({
        id: '',
        account_id: '',
        cart_id: '',
        total_price: '',
        status: 'Đã thanh toán', // Default value
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

        // Validation: Check required fields
        if (!order.id || !order.account_id || !order.cart_id || !order.total_price || !order.status) {
            alert("Vui lòng điền đầy đủ thông tin đơn hàng.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:5000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error(`Lỗi ${response.status}: Không thể thêm đơn hàng`);
            }

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
        navigate('/admin/order');
    };

    const handleCancel = () => {
        // Navigate back to orders page
        navigate("/admin/order");
    };

    return (
        <AdminLayout>
            <div className="flex">
                <div className="w-full overflow-y-auto h-screen p-8 bg-gray-50">
                    <button
                        onClick={() => navigate("/admin/order")} // Navigate back to category list page
                        className="flex mb-10 items-center px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="mr-2">
                            <path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z"/>
                        </svg>
                        <span>Quay Lại</span>
                    </button>

                    <header className="mb-10">
                        <h1 className="text-[#131523] text-2xl font-bold leading-9">Thêm đơn hàng</h1>
                    </header>

                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8 space-y-8 border-t-4">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Thông tin đơn hàng</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="id"
                                    value={order.id}
                                    onChange={handleChange}
                                    placeholder="ID đơn hàng"
                                    className="border rounded-md p-4 w-full"
                                />
                                <input
                                    type="text"
                                    name="account_id"
                                    value={order.account_id}
                                    onChange={handleChange}
                                    placeholder="ID tài khoản"
                                    className="border rounded-md p-4 w-full"
                                />
                                <input
                                    type="text"
                                    name="cart_id"
                                    value={order.cart_id}
                                    onChange={handleChange}
                                    placeholder="ID giỏ hàng"
                                    className="border rounded-md p-4 w-full"
                                />
                                <input
                                    type="number"
                                    name="total_price"
                                    value={order.total_price}
                                    onChange={handleChange}
                                    placeholder="Tổng tiền"
                                    className="border rounded-md p-4 w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Trạng thái đơn hàng</h2>
                            <select
                                name="status"
                                value={order.status}
                                onChange={handleChange}
                                className="border rounded-md p-4 w-full"
                            >
                                <option value="Đang giao hàng">Đang giao hàng</option>
                                <option value="Đã giao hàng">Đã giao hàng</option>
                            </select>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-3 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-200"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Lưu
                            </button>
                        </div>
                    </form>

                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 text-center">
                                <h2 className="text-xl font-semibold mb-4">Thêm đơn hàng thành công</h2>
                                <button
                                    onClick={handleModalConfirm}
                                    className="px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
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
