import React, { useState } from "react";
import LayoutDashboard from "../../layout/LayoutDashboard";
import { useNavigate } from "react-router-dom";

const AddCouponPage = () => {
    const navigate = useNavigate();
    const [couponType, setCouponType] = useState("fixed"); // Default to Fixed Discount

    return (
        <LayoutDashboard>
            <div className="flex">
                <div className="w-full overflow-y-auto h-screen p-6">

                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate("/coupons")}
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            ← Back
                        </button>
                    </div>

                    <header className="mb-6">
                        <h1 className="text-2xl font-bold">Create Coupon</h1>
                    </header>

                    {/* Coupon Form */}
                    <form className="bg-white p-6 rounded shadow-md">
                        {/* Coupon Information */}
                        <section className="mb-6">
                            <h2 className="text-lg font-semibold mb-4">Coupon Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Coupon Code</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Enter coupon code"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Coupon Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Enter coupon name"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Coupon Type */}
                        <section className="mb-6">
                            <h2 className="text-lg font-semibold mb-4">Coupon Type</h2>
                            <div className="flex gap-4">
                                {[
                                    { label: "Fixed Discount", value: "fixed", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="icon">
                                    <path id="color" fill-rule="evenodd"
                                          style={{
                                              fill: couponType === "fixed" ? "#1E5EFF" : "#7E84A3"
                                          }}
                                          clip-rule="evenodd" d="M20 5C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H4C2.89543 19 2 18.1046 2 17V7C2 5.89543 2.89543 5 4 5H20ZM20 7H4V17H20V7ZM12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z" fill="#1E5EFF"/>
                                    </g>
                                    </svg>)
                                     },
                                    { label: "Percentage Discount", value: "percentage", icon: (<svg width="24" height="24" viewBox="0 0 24 24"
                                                                                                     fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="icon">
                                                    <path id="color" fill-rule="evenodd"
                                                          style={{
                                                              fill: couponType === "percentage" ? "#1E5EFF" : "#7E84A3"
                                                          }}
                                                          clip-rule="evenodd" d="M14 3C15.1046 3 16 3.89543 16 5V7H20V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V7H8V5C8 3.89543 8.89543 3 10 3H14ZM18 9H6V19H18V9ZM14 5H10V7H14V5Z" fill="#7E84A3"/>
                                                </g>
                                            </svg>
                                        ) },
                                    { label: "Free Shipping", value: "free_shipping", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="icon">
                                                    <path id="color"
                                                          style={{
                                                              fill: couponType === "free_shipping" ? "#1E5EFF" : "#7E84A3"
                                                          }}
                                                          fill-rule="evenodd" clip-rule="evenodd" d="M13 4C14.1046 4 15 4.89543 15 6V7H19.618L22 11.7639V17H20C20 18.6569 18.6569 20 17 20C15.3431 20 14 18.6569 14 17H10C10 18.6569 8.65685 20 7 20C5.34315 20 4 18.6569 4 17H2V6C2 4.89543 2.89543 4 4 4H13ZM7 16C6.72386 16 6 16 6 16C6 16 6 16.7239 6 17C6 17.2761 6 18 6 18C6 18 6.72386 18 7 18C7.27614 18 8 18 8 18C8 18 8 17.2761 8 17C8 16.7239 8 16 8 16C8 16 7.27614 16 7 16ZM17 16C16.7449 16 16 16 16 16V17C16 17.2761 16 18 16 18C16 18 16.7239 18 17 18C17.2761 18 18 18 18 18C18 18 18 17.2761 18 17C18 16.7239 18 16 18 16C18 16 17.2761 16 17 16ZM13 6H4V15L4.76381 15.0001C5.31313 14.3863 6.11145 14 7 14C7.88855 14 8.68687 14.3863 9.23619 15.0001L13 15V6ZM18.381 9H15L15.0001 14.7638C15.5308 14.2888 16.2317 14 17 14C17.8885 14 18.6869 14.3863 19.2362 15.0001L20 15V12.237L18.381 9Z" fill="#7E84A3"/>
                                                </g>
                                            </svg>
                                        ) },
                                    { label: "Price Discount", value: "price", icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g id="icon">
                                                    <path id="color"
                                                          style={{
                                                              fill: couponType === "price" ? "#1E5EFF" : "#7E84A3"
                                                          }}
                                                          fill-rule="evenodd" clip-rule="evenodd" d="M11.5459 3.57029C11.9641 3.15205 12.5498 2.9466 13.1377 3.01192L21 3L20.9881 10.8623C21.0534 11.4502 20.848 12.0359 20.4297 12.4541L11.4541 21.4297C10.6937 22.1901 9.46093 22.1901 8.70056 21.4297L2.57027 15.2994C1.80991 14.5391 1.80991 13.3063 2.57027 12.5459L11.5459 3.57029ZM13 5L3.94704 13.9227L10.0773 20.053L19 11V5H13ZM14 8L16 10L14 12L12 10L14 8Z" fill="#7E84A3"/>
                                                </g>
                                            </svg>
                                        ) },
                                ].map(({ label, value, icon }) => (
                                    <button
                                        key={value}
                                        type="button"
                                        className={`flex flex-col items-center justify-center w-[245px] h-[108px]  bg-white border-2 border-[#1e5eff]" rounded ${
                                            couponType === value
                                                ? `bg-blue-500 text-[#1e5eff] border-[#1e5eff]`
                                                : "bg-gray-100 text-gray-600 border-gray-300"
                                        } hover:bg-blue-100`}
                                        onClick={() => setCouponType(value)}
                                    >
                                        <span className="text-3xl">{icon}</span> {/* Icon kích thước lớn hơn */}
                                        <span className="mt-2 text-base font-semibold">{label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Discount Value</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
                                        placeholder="Enter value"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Applies to</label>
                                    <select
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    >
                                        <option value="">Choose</option>
                                        <option value="all">All Products</option>
                                        <option value="specific">Specific Products</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Usage Limits */}
                        <section className="mb-6">
                            <h2 className="text-lg font-semibold mb-4">Usage Limits</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">End Date</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Amount of uses</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                                        placeholder="Enter usage limit"
                                    />
                                </div>
                                <div className="flex items-center gap-2 mt-6">
                                    <input type="checkbox" id="unlimited-uses" />
                                    <label htmlFor="unlimited-uses">Don’t limit amount of uses</label>
                                </div>
                            </div>
                        </section>

                        {/* Submit Buttons */}
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => navigate("/coupons")}
                                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default AddCouponPage;
