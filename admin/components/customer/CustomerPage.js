import React, { useState } from "react";
import LayoutDashboard from "../../layout/LayoutDashboard";
import { useNavigate } from "react-router-dom";

const mockData = Array.from({ length: 154 }, (_, i) => ({
    id: i + 1,
    name: `Customer ${i + 1}`,
    location: `Location ${i + 1}`,
    orders: Math.floor(Math.random() * 20) + 1,
    spent: `$${(Math.random() * 200).toFixed(2)}`,
}));

const CustomerPage = () => {
    const [customers, setCustomers] = useState(mockData);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editedCustomerData, setEditedCustomerData] = useState({});

    const itemsPerPage = 10;
    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCustomers = filteredCustomers.slice(
        startIndex,
        startIndex + itemsPerPage
    );
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

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

    const handleDeleteCustomer = (id) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    const handleEditCustomer = (customer) => {
        setEditingCustomer(customer.id);
        setEditedCustomerData(customer);
    };

    const handleSaveCustomer = () => {
        setCustomers(
            customers.map((customer) =>
                customer.id === editingCustomer ? editedCustomerData : customer
            )
        );
        setEditingCustomer(null);
    };

    const navigate = useNavigate();

    return (
        <LayoutDashboard>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => console.log("Exporting data...")}
                            className="px-4 py-2 bg-white rounded border border-[#d6daec] hover:bg-gray-200"
                        >
                            Export
                        </button>
                        <button
                            className="px-4 py-2 bg-[#1e5eff] rounded text-white hover:bg-blue-400"
                            onClick={() => navigate("/customer/information")}
                        >
                            + Add Customer
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between items-center p-4 border-b">
                        <div className="flex gap-4">
                            <select
                                className="border rounded-lg px-4 py-2"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="All">Filter</option>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                            </select>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
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
                        </div>
                    </div>

                    <div className="overflow-y-auto max-h-[400px]">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 sticky top-0">
                            <tr>
                                <th className="p-4">
                                    <input type="checkbox" />
                                </th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Location</th>
                                <th className="p-4">Orders</th>
                                <th className="p-4">Spent</th>
                                <th className="p-4">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentCustomers.map((customer) => (
                                <tr key={customer.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="p-4">
                                        {editingCustomer === customer.id ? (
                                            <input
                                                type="text"
                                                value={editedCustomerData.name}
                                                onChange={(e) =>
                                                    setEditedCustomerData({
                                                        ...editedCustomerData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                className="border rounded p-2"
                                            />
                                        ) : (
                                            customer.name
                                        )}
                                    </td>
                                    <td className="p-4">
                                        {editingCustomer === customer.id ? (
                                            <input
                                                type="text"
                                                value={editedCustomerData.location}
                                                onChange={(e) =>
                                                    setEditedCustomerData({
                                                        ...editedCustomerData,
                                                        location: e.target.value,
                                                    })
                                                }
                                                className="border rounded p-2"
                                            />
                                        ) : (
                                            customer.location
                                        )}
                                    </td>
                                    <td className="p-4">{customer.orders}</td>
                                    <td className="p-4">{customer.spent}</td>
                                    <td className="p-4 flex gap-2">
                                        {editingCustomer === customer.id ? (
                                            <button
                                                onClick={handleSaveCustomer}
                                                className="px-2 py-1 bg-green-500 text-white rounded"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEditCustomer(customer)}
                                                className="px-2 py-1 bg-white border border-gray-500 text-blue-500 rounded-md"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDeleteCustomer(customer.id)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 flex justify-between items-center">
                        <p>
                            Showing {Math.min(
                            (currentPage - 1) * itemsPerPage + 1,
                            customers.length
                        )}
                            -{Math.min(currentPage * itemsPerPage, customers.length)} of {customers.length} results
                        </p>
                        <div className="flex gap-2 items-center">
                            <button
                                onClick={() => changePage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Prev
                            </button>

                            {displayPages().map((page) => (
                                <button
                                    key={page}
                                    onClick={() => changePage(page)}
                                    className={`px-3 py-1 rounded ${
                                        page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <span className="px-2">...</span>
                            )}

                            <button
                                onClick={() => changePage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default CustomerPage;