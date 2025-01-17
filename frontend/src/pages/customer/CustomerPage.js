import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [editCustomer, setEditCustomer] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

    const itemsPerPage = 5;
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCustomers, setFilteredCustomers] = useState([]);

// Tính tổng số trang

// Lấy danh sách khách hàng của trang hiện tại
// Tính toán số trang và danh sách khách hàng hiển thị
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const currentCustomers = filteredCustomers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

// Hàm chuyển trang
    const changePage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    useEffect(() => {
        setFilteredCustomers(
            customers.filter((customer) =>
                customer.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
    }, [searchTerm, customers]);


    // Fetch API Data
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => {
                const formattedData = data.map((user) => ({
                    id: user.id,
                    name: user.name,
                    location: user.address.city,
                    orders: Math.floor(Math.random() * 20) + 1,
                    spent: `$${(Math.random() * 200).toFixed(2)}`,
                }));
                setCustomers(formattedData);
            })
            .catch((error) => console.error("Error fetching customers:", error));
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedCustomerIds((prev) =>
            prev.includes(id)
                ? prev.filter((customerId) => customerId !== id)
                : [...prev, id]
        );
    };

    const handleEditCustomer = () => {
        if (selectedCustomerIds.length === 1) {
            const customerToEdit = customers.find(
                (customer) => customer.id === selectedCustomerIds[0]
            );
            setEditCustomer(customerToEdit);
            setShowEditModal(true);
            setErrorMessage("");
        } else {
            alert("Vui lòng chọn đúng một khách hàng để sửa.");
        }
    };
    const [filter, setFilter] = useState([]);
    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
    };
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };
    const handleDeleteCustomers = () => {
        if (selectedCustomerIds.length > 0) {
            setShowDeleteModal(true);
            setErrorMessage("");
        } else {
            alert("Vui lòng chọn ít nhất một khách hàng để xóa.");
        }
    };


    const confirmDeleteCustomers = () => {
        setCustomers(
            customers.filter(
                (customer) => !selectedCustomerIds.includes(customer.id)
            )
        );
        setSelectedCustomerIds([]);
        setShowDeleteModal(false);

        // Hiển thị thông báo xóa thành công
        setShowDeleteSuccess(true);
    };


    const handleSaveEdit = () => {
        setCustomers(
            customers.map((customer) =>
                customer.id === editCustomer.id ? { ...editCustomer } : customer
            )
        );
        setShowEditModal(false);
    };
    const getInitials = (name) => {
        if (!name) return "";
        return name[0].toUpperCase(); // Lấy chữ cái đầu tiên của tên
    };



    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Khách hàng</h1>
                    <div className="flex gap-4">
                        <button
                            className="px-4 py-2 bg-white rounded border border-[#d6daec] hover:bg-gray-200"
                            onClick={() => console.log("Exporting data...")}
                        >
                            Xuất
                        </button>
                        <button
                            className="px-4 py-2 bg-[#1e5eff] rounded text-white hover:bg-blue-400"
                            onClick={() => navigate("/customer/information")}
                        >
                            + Thêm khách hàng
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between items-center p-4 border-b">
                        <div className="flex gap-4">
                            <select
                                className="border rounded-lg px-4 py-2"
                                value={filter}
                                onChange={handleFilterChange}
                            >
                                <option value="">Tất cả</option>
                                <option value="Áo dạ">Mã giảm phí vận chuyển</option>
                                <option value="Áo len">Mã giảm Tết</option>
                                <option value="Quần âu">Quần âu</option>
                                <option value="Đồ ngủ">Đồ ngủ</option>
                                <option value="Quần áo thể thao">Quần áo thể thao</option>
                            </select>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Tìm kiếm..."
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
                        </div>
                        {/* Các nút Sửa và Xóa */}
                        <div className="flex gap-4 ml-auto">
                            <button
                                className="px-5 py-3 bg-white-500 text-gray-600 rounded border border-blue-400 hover:bg-gray-300"
                                onClick={handleEditCustomer} // Hàm sửa
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                                </span>
                            </button>

                            <button
                                className="px-5 py-3 bg-white-500 text-blue-400 border border-blue-400 rounded hover:bg-gray-300"
                                onClick={handleDeleteCustomers} // Hiển thị modal xóa
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                </span>
                            </button>
                        </div>
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 p-4">{errorMessage}</p>
                    )}

                    <div className="overflow-y-auto ">
                        <table className="w-full text-left">
                            <thead className="bg-gray-300 ">
                            <tr>
                                <th className="p-4">
                                    <input
                                        type="checkbox"
                                        onChange={(e) =>
                                            setSelectedCustomerIds(
                                                e.target.checked
                                                    ? customers.map((customer) => customer.id)
                                                    : []
                                            )
                                        }
                                        checked={
                                            selectedCustomerIds.length === customers.length &&
                                            customers.length > 0
                                        }
                                    />
                                </th>
                                <th className="p-4">Tên</th>
                                <th className="p-4">Vị trí</th>
                                <th className="p-4">Đơn hàng</th>
                                <th className="p-4">Số tiền</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentCustomers.map((customer) => (
                                <tr key={customer.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedCustomerIds.includes(customer.id)}
                                            onChange={() => handleCheckboxChange(customer.id)}
                                        />
                                    </td>
                                    <td
                                        className="p-4 flex items-center gap-4 cursor-pointer"
                                        onClick={() => navigate(`/customer/profile/${customer.id}`)}
                                    >
                                        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full">
                                            {getInitials(customer.name)}
                                        </div>
                                        {customer.name}
                                    </td>
                                    <td className="p-4">{customer.location}</td>
                                    <td className="p-4">{customer.orders}</td>
                                    <td className="p-4">{customer.spent}</td>
                                </tr>
                            ))}
                            </tbody>


                        </table>
                    </div>

                </div>
            </div>

            {/* Edit Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Sửa khách hàng</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Tên</label>
                            <input
                                type="text"
                                value={editCustomer.name}
                                onChange={(e) =>
                                    setEditCustomer({ ...editCustomer, name: e.target.value })
                                }
                                className="border rounded w-full p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Vị trí</label>
                            <input
                                type="text"
                                value={editCustomer.location}
                                onChange={(e) =>
                                    setEditCustomer({ ...editCustomer, location: e.target.value})
                                }
                                className="border rounded w-full p-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Đơn hàng</label>
                            <input
                                type="text"
                                value={editCustomer.orders}
                                onChange={(e) =>
                                    setEditCustomer({ ...editCustomer, orders: e.target.value })
                                }
                                className="border rounded w-full p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Số tiền</label>
                            <input
                                type="text"
                                value={editCustomer.spent}
                                onChange={(e) =>
                                    setEditCustomer({ ...editCustomer, spent:e.target.value })
                                }
                                className="border rounded w-full p-2"
                            />
                        </div>


                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setShowEditModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={handleSaveEdit}
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
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
                        <p className="mb-4">
                            Bạn có chắc chắn muốn xóa khách hàng đã chọn không?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={confirmDeleteCustomers}
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 modal-enter">
                    <div className="bg-white p-8 rounded-lg max-w-md modal-enter-active">
                        <h3 className="text-xl font-semibold mb-4">Thông báo</h3>
                        <p>Khách hàng đã được xóa thành công!</p>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => setShowDeleteSuccess(false)}
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Phân trang */}
            <div className="p-4 flex justify-end items-center">
                <div className="flex gap-2">
                    <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="18px"
                            viewBox="0 -960 960 960"
                            width="18px"
                            fill="#5f6368"
                        >
                            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                        </svg>
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => changePage(index + 1)}
                            className={`px-3 py-1 rounded ${
                                currentPage === index + 1
                                    ? "bg-blue-200 text-blue-600"
                                    : "bg-gray-200"
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => changePage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="18px"
                            viewBox="0 -960 960 960"
                            width="18px"
                            fill="#5f6368"
                        >
                            <path d="M600-80l400-400-400-400-71 71 329 329-329 329 71 71Z" />
                        </svg>
                    </button>
                </div>
            </div>


        </AdminLayout>
    );
};

export default CustomerPage;
