import React, { useState } from 'react';
import LayoutDashboard from "../../layout/LayoutDashboard";
import { useNavigate } from "react-router-dom";
import { FaTag, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { FaShippingFast } from 'react-icons/fa'; // Biểu tượng miễn phí vận chuyển

const mockData = [
    {
        id: 1,
        name: "Summer discount 10% off",
        usage: "15 times",
        status: "Active",
        date: "May 5, 2020 - May 15, 2020",
        freeShip: false, // Không miễn phí vận chuyển
    },
    {
        id: 2,
        name: "Free shipping on all items",
        usage: "42 times",
        status: "Active",
        date: "May 5, 2020 - May 15, 2020",
        freeShip: true, // Miễn phí vận chuyển
    },
    {
        id: 3,
        name: "Discount for women clothes 5%",
        usage: "12 times",
        status: "Active",
        date: "April 12, 2020 - April 20, 2020",
        freeShip: false,
    },
    {
        id: 4,
        name: "Free shipping on all items",
        usage: "15 times",
        status: "Expired",
        date: "Feb 14, 2020 - Feb 20, 2020",
        freeShip: true, // Miễn phí vận chuyển
    },
];

const CouponsPage = () => {
    const [coupons, setCoupons] = useState(mockData);
    const [currentTab, setCurrentTab] = useState("All Coupons");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [couponToDelete, setCouponToDelete] = useState(null);
    const [editCoupon, setEditCoupon] = useState(null);
    const itemsPerPage = 5;

    const filteredCoupons = coupons.filter((coupon) => {
        if (currentTab === "Active Coupons") return coupon.status === "Active";
        if (currentTab === "Expired Coupons") return coupon.status === "Expired";
        return true;
    }).filter((coupon) => coupon.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCoupons = filteredCoupons.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
    };

    const handleDelete = (id) => {
        setCoupons(coupons.filter((coupon) => coupon.id !== id));
        setModalVisible(false);
    };

    const handleEdit = (coupon) => {
        setEditCoupon(coupon);
    };

    const saveEdit = () => {
        setCoupons(coupons.map((coupon) => (coupon.id === editCoupon.id ? editCoupon : coupon)));
        setEditCoupon(null);
    };

    const navigate = useNavigate();

    return (
        <div>
            <LayoutDashboard>
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Coupons</h1>
                        <div className="flex gap-4">
                            <button
                                className="px-5 py-3 bg-[#1e5eff] rounded text-white hover:bg-blue-500"
                                onClick={() => navigate("/coupons/add-coupon")}
                            >
                                + Create
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b">
                        {["All Coupons", "Active Coupons", "Expired Coupons"].map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-2 border-b-2 ${
                                    currentTab === tab
                                        ? "border-blue-500 text-blue-500"
                                        : "border-transparent text-gray-500 hover:text-blue-500"
                                }`}
                                onClick={() => {
                                    setCurrentTab(tab);
                                    setCurrentPage(1);
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="p-4">Coupon Name</th>
                            <th className="p-4">Usage</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentCoupons.map((coupon) => (
                            <tr key={coupon.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        readOnly
                                    />
                                </td>
                                <td className="p-4 text-blue-600 font-medium flex items-center ">
                                    {/* Hiển thị biểu tượng Free Shipping nếu coupon có thông tin này */}
                                    {coupon.freeShip && <FaShippingFast className="mr-2 text-blue-500 " />}
                                    {!coupon.freeShip && <FaTag  className="mr-2 "/> }
                                    {coupon.name}
                                </td>
                                <td className="p-4">{coupon.usage}</td>
                                <td className="p-4">
                                    {coupon.status === 'Active' ? (
                                        <FaCheckCircle className="text-green-500" />
                                    ) : (
                                        <FaTimesCircle className="text-red-500" />
                                    )}
                                </td>
                                <td className="p-4">{coupon.date}</td>
                                <td className="p-4 flex gap-2">
                                    <button
                                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded border border-blue-400"
                                        onClick={() => handleEdit(coupon)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded border-blue-400 hover:bg-blue-400"
                                        onClick={() => {
                                            setCouponToDelete(coupon);
                                            setModalVisible(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="p-4 flex justify-between items-center">
                        <p>
                            Showing {startIndex + 1}-{startIndex + currentCoupons.length} of {filteredCoupons.length} results
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => changePage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Prev
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
                                Next
                            </button>
                        </div>
                    </div>

                    {/* Modal */}
                    {modalVisible && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
                                <p>Are you sure you want to delete "{couponToDelete?.name}"?</p>
                                <div className="flex justify-end gap-4 mt-4">
                                    <button
                                        className="px-4 py-2 bg-gray-200 rounded"
                                        onClick={() => setModalVisible(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-[#336dff] text-white rounded"
                                        onClick={() => handleDelete(couponToDelete.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Section */}
                    {editCoupon && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-bold mb-4">Edit Coupon</h2>
                                <input
                                    type="text"
                                    value={editCoupon.name}
                                    onChange={(e) => setEditCoupon({ ...editCoupon, name: e.target.value })}
                                    className="w-full p-2 border rounded mb-4"
                                />
                                <div className="flex justify-end gap-4">
                                    <button
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                        onClick={() => setEditCoupon(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400"
                                        onClick={saveEdit}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </LayoutDashboard>
        </div>
    );
};

export default CouponsPage;
