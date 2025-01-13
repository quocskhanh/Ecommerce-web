import React, { useState, useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountsPage = () => {
    const [accounts, setAccounts] = useState([]); // State lưu trữ danh sách tài khoản
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [totalPages, setTotalPages] = useState(1); // Tổng số trang
    const itemsPerPage = 10; // Số lượng tài khoản trên mỗi trang
    const navigate = useNavigate();

    // Fetch tài khoản từ API
    useEffect(() => {
        axios
            .get("http://localhost:5000/accounts")
            .then((response) => {
                setAccounts(response.data); // Cập nhật danh sách tài khoản
                setTotalPages(Math.ceil(response.data.length / itemsPerPage)); // Tính tổng số trang
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu tài khoản:", error);
            });
    }, []);

    // Xử lý xóa tài khoản
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:5000/api/accounts/${id}`)
            .then(() => {
                setAccounts((prevAccounts) => {
                    const updatedAccounts = prevAccounts.filter((account) => account.id !== id);
                    setTotalPages(Math.ceil(updatedAccounts.length / itemsPerPage));
                    return updatedAccounts;
                });
            })
            .catch((error) => {
                console.error("Lỗi khi xóa tài khoản:", error);
            });
    };

    // Chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Tính toán tài khoản cần hiển thị
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentAccounts = accounts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div>
            <AdminLayout>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Tài Khoản</h1>
                        <button
                            className="px-4 py-2 bg-[#1e5eff] rounded text-white hover:bg-blue-400"
                            onClick={() => navigate("/accounts/add-account")}
                        >
                            + Thêm tài khoản
                        </button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <thead>
                            <tr className="bg-gray-3 00">
                                <th className="py-3 px-4 border-b font-semibold text-gray-700 text-left">ID</th>
                                <th className="py-3 px-4 border-b font-semibold text-gray-700 text-left">Name</th>
                                <th className="py-3 px-4 border-b font-semibold text-gray-700 text-left">Email</th>
                                <th className="py-3 px-4 border-b font-semibold text-gray-700 text-left">Phone Number</th>
                                <th className="py-3 px-4 border-b font-semibold text-gray-700 text-left">Address</th>
                                <th className="py-3 px-4 border-b font-semibold text-gray-700 text-left">Date of Birth</th>
                                <th className="py-3 px-4 border-b font-semibold text-gray-700 text-left">Gender</th>
                                <th className="py-3 px-4 border-b font-semibold text-gray-700 text-left">Password</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentAccounts.map((account, index) => (
                                <tr
                                    key={account.id}
                                    className={`${
                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    } hover:bg-gray-100`}
                                >
                                    <td className="py-3 px-4 border-b text-gray-600">{`#${account.id}`}</td>
                                    <td className="py-3 px-4 border-b text-gray-600">{account.username}</td>
                                    <td className="py-3 px-4 border-b text-gray-600">{account.email}</td>
                                    <td className="py-3 px-4 border-b text-gray-600">{account.phone_number}</td>
                                    <td className="py-3 px-4 border-b text-gray-600">{account.address || "N/A"}</td>
                                    <td className="py-3 px-4 border-b text-gray-600">{account.date_of_birth || "N/A"}</td>
                                    <td className="py-3 px-4 border-b text-gray-600">{account.gender || "N/A"}</td>
                                    <td className="py-3 px-4 border-b text-gray-600 truncate">{account.password}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 flex justify-end items-center ">
                        <div className="flex gap-2 ">
                            <button
                                className={`px-3 py-1 bg-gray-200 rounded disabled:opacity-50 ${
                                    currentPage === 1
                                        ? "bg-gray-300"
                                        : "bg-blue-500 text-white hover:bg-blue-200"
                                }`}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
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
                            {[...Array(totalPages).keys()].map((page) => (
                                <button
                                    key={page + 1}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === page + 1
                                            ? "bg-blue-200 text-blue-600"
                                            : "bg-gray-200"
                                    }`}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    {page + 1}
                                </button>
                            ))}
                            <button
                                className={`px-3 py-1 bg-gray-200 rounded disabled:opacity-50 ${
                                    currentPage === totalPages
                                        ? "bg-gray-300"
                                        : "bg-blue-500 text-white hover:bg-blue-400"
                                }`}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
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
                </div>
            </AdminLayout>
        </div>
    );
};

export default AccountsPage;
