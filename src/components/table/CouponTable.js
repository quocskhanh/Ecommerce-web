import React, { useState } from "react";

const mockData = [
    {
        id: 1,
        name: "Summer discount 10% off",
        usage: "15 times",
        status: "Active",
        date: "May 5, 2020 - May 15, 2020",
    },
    {
        id: 2,
        name: "Free shipping on all items",
        usage: "42 times",
        status: "Active",
        date: "May 5, 2020 - May 15, 2020",
    },
    {
        id: 3,
        name: "Discount for women clothes 5%",
        usage: "12 times",
        status: "Active",
        date: "April 12, 2020 - April 20, 2020",
    },
    {
        id: 4,
        name: "Free shipping on all items",
        usage: "15 times",
        status: "Expired",
        date: "Feb 14, 2020 - Feb 20, 2020",
    },
];

const CouponTable = () => {
    const [coupons, setCoupons] = useState(mockData);
    const [currentTab, setCurrentTab] = useState("All Coupons");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectAll, setSelectAll] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
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

    return (
        <div className="bg-white rounded-lg shadow-lg">
            {/* Tabs */}
            <div className="flex border-b">
                {[
                    "All Coupons",
                    "Active Coupons",
                    "Expired Coupons",
                ].map((tab) => (
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

            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
                <div className="flex gap-4">
                    <select className="border rounded-lg px-4 py-2">
                        <option>Filter</option>
                        <option>Paid</option>
                        <option>Pending</option>
                    </select>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="border rounded-lg px-4 py-2 pl-10"
                        />


                        <svg xmlns="http://www.w3.org/2000/svg"
                             height="24px"
                             viewBox="0 -960 960 960"
                             width="24px"
                             fill="#5f6368"
                             className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                        ><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white rounded border border-[#d6daec]">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </button>
                    <button className="px-4 py-2 bg-white rounded border border-[#d6daec]">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>
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
                </tr>
                </thead>
                <tbody>
                {currentCoupons.map((coupon) => (
                    <tr
                        key={coupon.id}
                        className="border-b hover:bg-gray-50"
                    >
                        <td className="p-4">
                            <input
                                type="checkbox"
                                checked={selectAll}
                                readOnly
                            />
                        </td>
                        <td className="p-4 text-blue-600 font-medium">
                            {coupon.name}
                        </td>
                        <td className="p-4">{coupon.usage}</td>
                        <td className="p-4">{coupon.status}</td>
                        <td className="p-4">{coupon.date}</td>
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
        </div>
    );
};

export default CouponTable;
