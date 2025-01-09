import React, { Component } from "react";
import LayoutDashboard from "../layout/LayoutDashboard";

class SettingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            darkMode: false,
            notifications: true,
            email: "",
            phone: "",
            currentPassword: "",
            newPassword: "",
            language: "en",
            timezone: "GMT",
            paymentMethod: "",
            paymentMethods: [],
            activeSection: "personal-information", // Mặc định hiển thị phần Personal Information
        };
    }

    handleDarkModeToggle = () => {
        this.setState(
            (prevState) => ({ darkMode: !prevState.darkMode }),
            () => {
                document.body.classList.toggle("dark-mode", this.state.darkMode);
            }
        );
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleAddPaymentMethod = () => {
        const { paymentMethod, paymentMethods } = this.state;

        if (paymentMethod.trim() === "") {
            alert("Please enter a valid payment method.");
            return;
        }

        this.setState({
            paymentMethods: [...paymentMethods, paymentMethod],
            paymentMethod: "",
        });
    };

    handleDeletePaymentMethod = (index) => {
        const { paymentMethods } = this.state;
        const updatedMethods = paymentMethods.filter((_, i) => i !== index);
        this.setState({ paymentMethods: updatedMethods });
    };

    handleSectionClick = (section) => {
        this.setState({ activeSection: section });
    };

    render() {
        const {
            darkMode,
            email,
            phone,
            currentPassword,
            newPassword,
            paymentMethod,
            paymentMethods,
            activeSection,
            fullname,
            birthday,
            about
        } = this.state;

        return (
            <LayoutDashboard>
                <div className="flex min-h-screen">
                    {/* Sidebar */}
                    <div className="w-1/4 bg-gray-200 dark:bg-gray-800 p-4">
                        <nav className="space-y-4">
                            <button
                                onClick={() => this.handleSectionClick("personal-information")}
                                className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </span>
                                <span>Personal Information</span>
                            </button>
                            <button
                                onClick={() => this.handleSectionClick("change-password")}
                                className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>
                                </span>
                                <span>Change Password</span>
                            </button>
                            <button
                                onClick={() => this.handleSectionClick("payment-methods")}
                                className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>
                                </span>
                                <span>Payment Methods</span>
                            </button>
                            <button
                                onClick={() => this.handleSectionClick("dark-mode")}
                                className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </svg>
                                </span>
                                <span>Dark Mode</span>
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="w-3/4 p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                        <h1 className="text-3xl font-bold mb-8 text-center">Settings</h1>

                        {/* Conditionally Rendered Sections */}
                        {activeSection === "personal-information" && (
                            <div className="space-y-12">
                                <h2 className="text-xl font-semibold">Personal Information</h2>
                                <div className="space-y-2">
                                    {/* Profile Image */}
                                    <div className="flex justify-center mb-6">
                                        <img src="https://img.theweek.in/content/dam/week/week/news/sports/images/2024/12/1/trent-alexander-arnold.jpg" alt="Profile" className="rounded-full w-32 h-32 object-cover" />
                                    </div>
                                    <label htmlFor="Full Name" className="block text-sm font-medium">Full Name</label>
                                    <input
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        value={fullname}
                                        onChange={this.handleInputChange}
                                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="About" className="block text-sm font-medium">About</label>
                                    <input
                                        id="about"
                                        name="about"
                                        type="text"
                                        value={about}
                                        onChange={this.handleInputChange}
                                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>


                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={this.handleInputChange}
                                        className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="block text-sm font-medium">Phone Number</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={this.handleInputChange}
                                        className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your phone number"
                                    />
                                </div>


                                <div className="space-y-2">
                                    <label htmlFor="Birth" className="block text-sm font-medium">Date of Birth</label>
                                    <input
                                        id="birthday"
                                        name="birthday"
                                        type="date"
                                        value={birthday}
                                        onChange={this.handleInputChange}
                                        className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === "change-password" && (
                            <div className="space-y-12 mt-12">
                                <h2 className="text-xl font-semibold">Change Password</h2>
                                <div className="space-y-2">
                                    <label htmlFor="currentPassword" className="block text-sm font-medium">Current Password</label>
                                    <input
                                        id="currentPassword"
                                        name="currentPassword"
                                        type="password"
                                        value={currentPassword}
                                        onChange={this.handleInputChange}
                                        className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        value={newPassword}
                                        onChange={this.handleInputChange}
                                        className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter new password"
                                    />
                                </div>
                            </div>
                        )}

                        {activeSection === "payment-methods" && (
                            <div className="space-y-12 mt-12">
                                <h2 className="text-xl font-semibold">Payment Methods</h2>
                                <div className="space-y-2">
                                    <label htmlFor="paymentMethod" className="block text-sm font-medium">Add a Payment Method</label>
                                    <div className="flex space-x-2">
                                        <input
                                            id="paymentMethod"
                                            name="paymentMethod"
                                            type="text"
                                            value={paymentMethod}
                                            onChange={this.handleInputChange}
                                            className="w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter payment method"
                                        />
                                        <button
                                            onClick={this.handleAddPaymentMethod}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                                <ul className="mt-4 space-y-2">
                                    {paymentMethods.map((method, index) => (
                                        <li key={index} className="flex justify-between items-center">
                                            <span>{method}</span>
                                            <button
                                                onClick={() => this.handleDeletePaymentMethod(index)}
                                                className="text-red-500"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeSection === "dark-mode" && (
                            <div className="mt-12">
                                <h2 className="text-xl font-semibold">Dark Mode</h2>
                                <div className="flex items-center space-x-2">
                                    <label htmlFor="darkModeToggle" className="text-sm">Enable Dark Mode</label>
                                    <input
                                        id="darkModeToggle"
                                        type="checkbox"
                                        checked={darkMode}
                                        onChange={this.handleDarkModeToggle}
                                        className="w-6 h-6"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </LayoutDashboard>
        );
    }
}

export default SettingPage;
