import React, { useState } from "react";
import { Link } from "react-router-dom";

const DashboardTopbar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [notificationMenuVisible, setNotificationMenuVisible] = useState(false);
    const [messageMenuVisible, setMessageMenuVisible] = useState(false);
    const [chatMenuVisible, setChatMenuVisible] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);

    const [notifications, setNotifications] = useState([
        { id: 1, message: "Your order #1234 has been shipped.", read: false },
        { id: 2, message: "New promotional discount available!", read: false },
        { id: 3, message: "Your profile has been updated.", read: true },
    ]);

    const [messages, setMessages] = useState([
        { id: 1, sender: "Admin", text: "Welcome to FASCO Dashboard!" },
        { id: 2, sender: "Support", text: "Your recent ticket has been resolved." },
    ]);

    const [chats, setChats] = useState([
        { id: 1, name: "John Doe", message: "Hey, can you help me with my order?" },
        { id: 2, name: "Jane Smith", message: "Thank you for the quick response!" },
    ]);

    const toggleMenu = () => setMenuVisible((prev) => !prev);
    const toggleNotificationMenu = () => setNotificationMenuVisible((prev) => !prev);
    const toggleMessageMenu = () => setMessageMenuVisible((prev) => !prev);
    const toggleChatMenu = () => setChatMenuVisible((prev) => !prev);

    const toggleFullscreen = () => {
        if (!fullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setFullscreen((prev) => !prev);
    };

    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        );
    };

    return (
        <div className="fixed top-0 left-0 w-full h-16 bg-[#070b1d] flex items-center justify-between px-6 shadow-md z-50">
            {/* Logo and Search */}
            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center">
                    <img src="/Group%201000004658.png" alt="FASCO Logo" className="w-11 h-12" />
                    <span className="text-white text-2xl font-normal font-['Rubik Glitch'] ml-2">FASCO</span>
                </Link>
                <div className="relative w-80">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full py-2 pl-12 pr-4 bg-[#121018] text-white rounded-lg text-sm focus:outline-none"
                    />


                    <svg xmlns="http://www.w3.org/2000/svg"
                         fill="none"
                         className="absolute top-2.5 left-3 w-6 h-6 text-white"
                         viewBox="0 0 24 24"
                         stroke-width="1.5" stroke="currentColor" >
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-6 text-white">
                {/* Notifications */}
                <div className="relative">
                    <span onClick={toggleNotificationMenu} className="cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                            />
                        </svg>
                    </span>
                    {notificationMenuVisible && (
                        <ul className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md">
                            {notifications.map((notification) => (
                                <li
                                    key={notification.id}
                                    onClick={() => markAsRead(notification.id)}
                                    className={`px-4 py-2 cursor-pointer ${
                                        notification.read ? "text-gray-400" : "text-black font-medium"
                                    }`}
                                >
                                    {notification.message}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Fullscreen */}
                <div className="relative">
                    <span onClick={toggleFullscreen} className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white"><path d="M120-120v-200h80v120h120v80H120Zm520 0v-80h120v-120h80v200H640ZM120-640v-200h200v80H200v120h-80Zm640 0v-120H640v-80h200v200h-80Z"/></svg>
                    </span>
                </div>

                {/* Chat */}
                <div className="relative">
                    <span onClick={toggleChatMenu} className="cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                            />
                        </svg>
                    </span>
                    {chatMenuVisible && (
                        <ul className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md">
                            {chats.map((chat) => (
                                <li key={chat.id} className="px-4 py-2 cursor-pointer">
                                    <p className="font-semibold">{chat.name}</p>
                                    <p className="text-gray-600">{chat.message}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* User Menu */}
                <div className="relative">
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={toggleMenu}
                    >
                        <div className="bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded-full uppercase">
                            R
                        </div>
                        <span className="text-sm">Randhir Kumar</span>
                    </div>
                    {menuVisible && (
                        <ul className="absolute right-0 mt-2 w-40 bg-black shadow-md rounded-md">
                            <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
                                <Link to="/personal">Personal</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
                                <Link to="/settings">Settings</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
                                <Link to="/order">Orders</Link>
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-500 cursor-pointer">
                                <Link to="/logout">Logout</Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};
export default DashboardTopbar;
