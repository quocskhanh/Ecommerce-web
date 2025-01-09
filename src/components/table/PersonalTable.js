import React, { useState } from "react";

const PersonalTable = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        language: "English",
        timezone: "GMT +02:00",
    });
    const [profileImage, setProfileImage] = useState(null); // State for profile image

    // Handle text input and select changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle profile image file input
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file); // Store the file in state
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData, profileImage);
        alert("Your changes have been saved successfully!");
    };

    // Handle form cancellation/reset
    const handleCancel = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            language: "English",
            timezone: "GMT +02:00",
        });
        setProfileImage(null); // Reset profile image
        console.log("Form reset to default values");
        alert("Your changes have been canceled!");
    };

    return (
        <div className="p-6">
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <ul className="flex space-x-6">
                    <li className="pb-2 border-b-2 border-[#1e5eff] text-[#1e5eff] font-medium">
                        Profile
                    </li>
                    <li className="pb-2 text-gray-600 cursor-pointer">
                        Notifications
                    </li>
                    <li className="pb-2 text-gray-600 cursor-pointer">Accounts</li>
                    <li className="pb-2 text-gray-600 cursor-pointer">Security</li>
                </ul>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Image */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">
                            Profile Image
                        </label>
                        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded h-32">
                            {profileImage ? (
                                <img
                                    src={URL.createObjectURL(profileImage)}
                                    alt="Profile Preview"
                                    className="h-full object-contain rounded"
                                />
                            ) : (
                                <label
                                    htmlFor="profileImageInput"
                                    className="px-4 py-2 text-[#1e5eff] font-medium cursor-pointer"
                                >
                                    Add File
                                </label>
                            )}
                            <input
                                type="file"
                                name="profileImage"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="profileImageInput"
                            />
                        </div>
                    </div>

                    {/* First Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            placeholder="First Name"
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            placeholder="Last Name"
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            placeholder="Email Address"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            placeholder="Phone Number"
                        />
                    </div>

                    {/* Regional Settings */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Regional Settings
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Language */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Language
                                </label>
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                >
                                    <option>English</option>
                                    <option>Vietnamese</option>
                                    <option>Spanish</option>
                                </select>
                            </div>

                            {/* Timezone */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Timezone
                                </label>
                                <select
                                    name="timezone"
                                    value={formData.timezone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                >
                                    <option>GMT +02:00</option>
                                    <option>GMT +07:00</option>
                                    <option>GMT -05:00</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-white rounded border border-[#d6daec]"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#1e5eff] rounded text-white"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalTable;
