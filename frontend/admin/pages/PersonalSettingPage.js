import React, { useState } from "react";
import LayoutDashboard from "../layout/LayoutDashboard";

// InputField Component
const InputField = ({ label, name, value, onChange, type = "text", placeholder }) => (
    <div>
        <label className="block text-gray-700 font-medium mb-2">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
            placeholder={placeholder}
        />
    </div>
);

// SelectField Component
const SelectField = ({ label, name, value, onChange, options }) => (
    <div>
        <label className="block text-gray-700 font-medium mb-2">{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded"
        >
            {options.map((option, idx) => (
                <option key={idx} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

// ProfileImageUploader Component
const ProfileImageUploader = ({ profileImage, onFileChange }) => (
    <div className="col-span-1 md:col-span-2">
        <label className="block text-gray-700 font-medium mb-2">Profile Image</label>
        <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded h-32">
            {profileImage ? (
                <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile Preview"
                    className="h-full object-contain rounded"
                />
            ) : (
                <label htmlFor="profileImageInput" className="px-4 py-2 text-[#1e5eff] font-medium cursor-pointer">
                    Add File
                </label>
            )}
            <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
                id="profileImageInput"
            />
        </div>
    </div>
);

// PersonalTable Component (Profile Tab)
const PersonalTable = ({ formData, handleChange, handleFileChange, profileImage, setFormData }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData, profileImage);
        alert("Your changes have been saved successfully!");
    };

    const handleCancel = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            language: "English",
            timezone: "GMT +02:00",
        });
        alert("Your changes have been canceled!");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileImageUploader profileImage={profileImage} onFileChange={handleFileChange} />
                <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                />
                <InputField
                    label="Phone Number"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Phone Number"
                />
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Regional Settings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SelectField
                            label="Language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            options={["English", "Vietnamese", "Spanish"]}
                        />
                        <SelectField
                            label="Timezone"
                            name="timezone"
                            value={formData.timezone}
                            onChange={handleChange}
                            options={["GMT +02:00", "GMT +07:00", "GMT -05:00"]}
                        />
                    </div>
                </div>
            </div>

        </form>
    );
};

// Notifications Tab Content

const Toggle = ({ isEnabled, onToggle }) => {
    return (
        <button
            className={`w-10 h-5 rounded-full flex items-center ${
                isEnabled ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={onToggle}
        >
            <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    isEnabled ? "translate-x-4" : "translate-x-0"
                }`}
            ></div>
        </button>
    );
};
// Toggle Component

// NotificationsTab Component
const NotificationsTab = () => {
    const [settings, setSettings] = useState({
        personalizedOffers: true,
        onlineWebinars: true,
        newFeatures: true,
        securityAndBilling: false,
        marketing: false,
    });

    const handleToggle = (key) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const notificationItems = [
        {
            key: "personalizedOffers",
            title: "Personalized Offers",
            description: "Receive offers made special for you",
        },
        {
            key: "onlineWebinars",
            title: "Online Webinars",
            description: "Get notified about upcoming webinars",
        },
        {
            key: "newFeatures",
            title: "New Features",
            description: "Updates about new features and product releases",
        },
        {
            key: "securityAndBilling",
            title: "Security and Billing",
            description: "Account security and notifications about billing",
        },
        {
            key: "marketing",
            title: "Marketing",
            description: "Receive marketing newsletters about our new products",
        },
    ];

    return (
        <div className="max-w-[982px] mt-10 px-4">
            <div className="space-y-6">
                {notificationItems.map(({ key, title, description }) => (
                    <div key={key} className="flex items-center justify-between gap-4 ">
                        <div className="flex-1 mb-10">
                            <h2 className="text-[#131523] text-base font-bold leading-normal ">
                                {title}
                            </h2>
                            <p className="text-[#5a607f] text-sm font-normal leading-tight mt-1">
                                {description}
                            </p>
                        </div>
                        <Toggle
                            isEnabled={settings[key]}
                            onToggle={() => handleToggle(key)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


// Accounts Tab Content
const AccountsTab = () => (
    <div>
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <p>Manage your account settings here.</p>
        {/* Add account management form or options */}
    </div>
);

// Security Tab Content
const SecurityTab = () => (
    <div>
        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
        <p>Set up two-factor authentication and security questions.</p>
        {/* Add security settings form or options */}
    </div>
);

// PersonalSettingPage Component
const PersonalSettingPage = () => {
    const [formData, setFormData] = useState({
        // Profile Settings
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        language: "English",
        timezone: "GMT +02:00",

        // Notifications Settings
        personalizedOffers: false,
        onlineWebinars: false,
        newFeatures: false,
        securityBilling: false,
        marketing: false,

        // Accounts Settings (can be added as needed)
        accountType: "Basic",
        accountStatus: "Active",

        // Security Settings
        twoFactorAuthentication: false,
    });

    const [profileImage, setProfileImage] = useState(null);
    const [activeTab, setActiveTab] = useState("Profile");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setProfileImage(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Log all settings including profile image and form data
        console.log("All Settings Saved:", formData, profileImage);
        alert("Your settings have been saved successfully!");
    };

    const handleCancel = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            language: "English",
            timezone: "GMT +02:00",
            personalizedOffers: false,
            onlineWebinars: false,
            newFeatures: false,
            securityBilling: false,
            marketing: false,
            accountType: "Basic",
            accountStatus: "Active",
            twoFactorAuthentication: false,
        });
        alert("Your changes have been canceled!");
    };

    return (
        <div>
            <LayoutDashboard>
                <div className="w-full overflow-y-auto h-screen p-6 ">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                    </div>
                    <div className="mb-6 border-b border-gray-200">
                        <ul className="flex space-x-6 ">
                            {["Profile", "Notifications", "Accounts", "Security"].map((tab) => (
                                <li
                                    key={tab}
                                    className={`pb-2 cursor-pointer ${activeTab === tab
                                        ? "border-b-2 border-[#1e5eff] text-[#1e5eff]"
                                        : "text-gray-600"
                                    } font-medium`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="w-[1110px] h-[580px] bg-white rounded-md shadow-[0px_1px_4px_0px_rgba(21,34,50,0.08)]">
                        {activeTab === "Profile" && (
                            <PersonalTable
                                formData={formData}
                                handleChange={handleChange}
                                handleFileChange={handleFileChange}
                                profileImage={profileImage}
                                setFormData={setFormData}
                            />
                        )}
                        {activeTab === "Notifications" && (
                            <NotificationsTab
                                formData={formData}
                                handleChange={handleChange}
                            />
                        )}
                        {activeTab === "Accounts" && (
                            <AccountsTab
                                formData={formData}
                                handleChange={handleChange}
                            />
                        )}
                        {activeTab === "Security" && (
                            <SecurityTab
                                formData={formData}
                                handleChange={handleChange}
                            />
                        )}
                    </div>

                    {/* Add Save and Cancel buttons here, outside of the tab content */}
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
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-[#1e5eff] rounded text-white"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </LayoutDashboard>
        </div>
    );
};

export default PersonalSettingPage;
