import React, { useState } from "react";
import LayoutDashboard from "../../layout/LayoutDashboard";
import { useNavigate } from "react-router-dom";

const AddCustomerPage = () => {
    const navigate = useNavigate();

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
        <LayoutDashboard>
            <div className="flex">
                {/* Main Content */}
                <div className="w-full overflow-y-auto h-screen p-8 bg-gray-50">
                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate("/customer")} // Navigate back to customer page
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            ← Back
                        </button>
                    </div>

                    {/* Header */}
                    <header className="mb-8">
                        <h1 className="text-[#131523] text-2xl font-bold font-['Inter'] leading-9">
                            Add Customer
                        </h1>
                    </header>

                    {/* Scrollable Form Container with Border */}
                    <div className="bg-white shadow-md rounded-lg p-8 space-y-8 border-t-4">
                        {/* Customer Information */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Customer Information</h2>
                            <p className="text-sm text-gray-500 mb-4">Provide key details about the customer</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                            </div>
                        </div>

                        {/* Customer Address */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Customer Address</h2>
                            <p className="text-sm text-gray-500 mb-4">Enter shipping address information</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    name="streetAddress"
                                    value={formData.streetAddress}
                                    onChange={handleChange}
                                    placeholder="Street Address"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="text"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleChange}
                                    placeholder="Apartment, Suite, etc."
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <div>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                    >
                                        <option value="">Choose Country</option>
                                        <option value="us">United States</option>
                                        <option value="ca">Canada</option>
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    placeholder="Postal Code"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone"
                                    className="border rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                                />
                            </div>
                        </div>

                        {/* Customer Notes */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Customer Notes</h2>
                            <p className="text-sm text-gray-500 mb-4">Add any relevant notes about this customer</p>
                            <textarea
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                placeholder="Add notes about customer"
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
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default AddCustomerPage;
