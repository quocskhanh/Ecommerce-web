import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layout/AdminLayout";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState("");
    const [statuses, setStatuses] = useState([]); // Store unique statuses
    const itemsPerPage = 5;
    const [editingOrder, setEditingOrder] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Track success modal visibility
    const [filtereOrders, setFilteredOrders] = useState([]); // Dữ liệu đã lọc
    const [editedCustomerData, setEditedCustomerData] = useState({
        account_id: '',
        cart_id: '',
        total_price: '',
        status: ''
    });
    const [showDeleteModal, setShowDeleteModal] = useState(null); // Track the order being deleted
    const [showEditModal, setShowEditModal] = useState(false); // Track edit modal visibility

    const navigate = useNavigate();

    // Fetch orders from db.json
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/orders");
                const data = await response.json();
                setOrders(data);

                // Extract unique statuses
                const uniqueStatuses = [
                    ...new Set(data.map((order) => order.status))
                ];
                setStatuses(uniqueStatuses);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    useEffect(() => {
        if (filterStatus === "") {
            setFilteredOrders(orders); // Hiển thị tất cả nếu không có lọc
        } else {
            setFilteredOrders(orders.filter((order) => order.status === filterStatus));
        }
    }, [filterStatus, orders]);

    // Handle delete

// Handle delete trigger (show modal)
    const handleDeleteTrigger = () => {
        if (selectedOrders.length === 0) {
            alert("Vui lòng chọn ít nhất một đơn hàng để xóa.");
        } else {
            setShowDeleteModal(true); // Show the delete confirmation modal
        }
    };

// Confirm and delete selected orders
    const handleConfirmDelete = async () => {
        try {
            for (const id of selectedOrders) {
                await fetch(`http://localhost:5000/orders/${id}`, {
                    method: "DELETE",
                });
            }
            setOrders(orders.filter((order) => !selectedOrders.includes(order.id)));
            setShowDeleteModal(false); // Close delete confirmation modal
            setSelectedOrders([]); // Clear selection
            setShowSuccessModal(true); // Show success modal
            setTimeout(() => setShowSuccessModal(false), 3000); // Automatically hide after 3 seconds
        } catch (error) {
            console.error("Error deleting orders:", error);
        }
    };


    // Handle edit (populate editedCustomerData with the selected order data)
// Handle edit (populate editedCustomerData with the selected order data)
    const handleEditOrder = () => {
        if (selectedOrders.length === 1) {
            const selectedOrder = orders.find((order) => order.id === selectedOrders[0]);
            setEditingOrder(selectedOrder.id);
            setEditedCustomerData({ ...selectedOrder });
            setShowEditModal(true);
        } else if (selectedOrders.length === 0) {
            alert("Vui lòng chọn một đơn hàng để chỉnh sửa.");
        } else {
            alert("Chỉ có thể chỉnh sửa một đơn hàng tại một thời điểm.");
        }
    };

// Handle input change for editing
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCustomerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveOrder = async () => {
        try {
            // Update order data in the backend
            await fetch(`http://localhost:5000/orders/${editingOrder}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedCustomerData),
            });

            // Update orders list in the frontend
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === editingOrder ? { ...order, ...editedCustomerData } : order
                )
            );

            setEditingOrder(null);
            setShowEditModal(false); // Close edit modal after saving changes
            alert("Đơn hàng đã được cập nhật!");
        } catch (error) {
            console.error("Error saving order:", error);
        }
    };


    // Handle checkbox selection
    const toggleSelectOrder = (id) => {
        setSelectedOrders((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((orderId) => orderId !== id)
                : [...prevSelected, id]
        );
    };

    // Filter and paginate orders
    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.status?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "" ||
            order.status?.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesFilter;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentOrders = filteredOrders.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const displayPages = () => {
        const maxVisiblePages = 5;
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, start + maxVisiblePages - 1);

        if (end === totalPages) {
            start = Math.max(1, end - maxVisiblePages + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6 flex-wrap">
                    <h1 className="text-2xl font-bold text-gray-800 w-full sm:w-auto">Đơn hàng</h1>
                    <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        <button
                            className="px-4 py-2 bg-white rounded border border-[#d6daec] hover:bg-gray-200"
                        >
                            Xuất
                        </button>
                        <button
                            className="px-4 py-2 bg-[#1e5eff] rounded text-white hover:bg-blue-400"
                            onClick={() => navigate("/admin/order/add-order")}
                        >
                            + Thêm đơn hàng
                        </button>
                    </div>
                </div>

                {/* Edit Modal */}
                {/* Edit Modal */}
                {showEditModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-96 sm:w-full sm:max-w-xs shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa đơn hàng</h2>
                            <div className="mb-4">
                                <label className="block mb-2">Trạng thái đơn hàng</label>
                                <input
                                    type="text"
                                    value={editedCustomerData.status || ''}
                                    name="status" // Ensure this name matches the data structure
                                    onChange={handleInputChange}
                                    className="border rounded w-full p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Số tiền</label>
                                <input
                                    type="text"
                                    value={editedCustomerData.total_price || ''}
                                    name="total_price" // Ensure this name matches the data structure
                                    onChange={handleInputChange}
                                    className="border rounded w-full p-2"
                                />
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setShowEditModal(false)} // Close modal without saving
                                >
                                    Hủy
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={handleSaveOrder}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-96 sm:w-full sm:max-w-xs shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Xác nhận</h2>
                            <p className="mb-4 text-gray-600">
                                Bạn có chắc chắn muốn xóa các đơn hàng đã chọn không?
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setShowDeleteModal(false)} // Close modal without deleting
                                >
                                    Hủy
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={handleConfirmDelete} // Confirm deletion
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Modal */}
                {showSuccessModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg max-w-md sm:max-w-xs modal-enter-active">
                            <h3 className="text-xl font-semibold mb-4">Thông báo</h3>
                            <p>Đơn hàng đã được xóa thành công!</p>
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
                        <select
                            className="border rounded-lg px-4 py-2 mb-4 sm:mb-0"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="">Tất cả</option>
                            {statuses.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>))}
                        </select>

                        <div className="relative ml-4 mb-4 sm:mb-0">
                            <input
                                type="text"
                                placeholder="Tìm kiếm khách hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border rounded-lg px-4 py-2 pl-10"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#5f6368"
                                className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                            >
                                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                            </svg>
                        </div>

                        <div className="flex gap-4 ml-auto w-full sm:w-auto justify-between sm:justify-end">
                            <button
                                className="px-5 py-3 bg-white-500 text-gray-600 rounded border border-blue-400 hover:bg-blue-500 cursor-pointer"
                                onClick={handleEditOrder}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                                </span>
                            </button>

                            <button
                                className="px-5 py-3 bg-white-500 text-blue-400 border border-blue-400 rounded hover:bg-red-500 cursor-pointer"
                                onClick={handleDeleteTrigger}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-center">
                            <thead className="bg-gray-300 sticky top-0">
                            <tr>
                                <th className="p-4 border border-gray-400 text-center ">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setSelectedOrders(
                                                checked ? orders.map((order) => order.id) : []
                                            );
                                        }}
                                        checked={selectedOrders.length === orders.length && orders.length > 0}
                                    />
                                </th>
                                <th className="border border-gray-400 p-4">ID Đơn hàng</th>
                                <th className="border border-gray-400 p-4">ID Khách hàng</th>
                                <th className="border border-gray-400 p-4">Trạng thái thanh toán</th>
                                <th className="border border-gray-400 p-4">Mã giỏ hàng</th>
                                <th className="border border-gray-400 p-4">Tổng số tiền</th>
                            </tr>
                            </thead>
                            <tbody>
                            { currentOrders.length > 0 ? (currentOrders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-100 border border-gray-300">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selectedOrders.includes(order.id)}
                                                onChange={() => toggleSelectOrder(order.id)}
                                            />
                                        </td>
                                        <td className="p-4 border border-gray-300">{order.id}</td>
                                        <td className="p-4 border border-gray-300">{order.account_id}</td>
                                        <td className="p-4 border border-gray-300">{order.status}</td>
                                        <td className="p-4 border border-gray-300">{order.cart_id}</td>
                                        <td className="p-4 border border-gray-300">{order.total_price}</td>
                                    </tr>
                                ))
                            ):(
                                <tr>
                                    <td colSpan="7" className="p-4 text-center">
                                        Không có đơn hàng nào được tìm thấy.
                                    </td>
                                </tr>
                            )
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 flex justify-between items-center">
                        <p>
                            Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, orders.length)}-
                            {Math.min(currentPage * itemsPerPage, orders.length)} trong {orders.length}
                        </p>
                        <div className="flex gap-2">
                            <button
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                disabled={currentPage === 1}
                                onClick={() => changePage(currentPage - 1)}
                            >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                            </svg>
                        </span>
                            </button>
                            {displayPages().map((page) => (
                                <button
                                    key={page}
                                    className={`px-3 py-1 border rounded ${
                                        currentPage === page ? "bg-blue-200 text-blue-600 " : "bg-gray-200"
                                    }`}
                                    onClick={() => changePage(page)}
                                >
                                    {page}
                                </button>
                            ))
                            }
                            <button
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                disabled={currentPage === totalPages}
                                onClick={() => changePage(currentPage + 1)}
                            >
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                            </svg>
                        </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default OrderPage;