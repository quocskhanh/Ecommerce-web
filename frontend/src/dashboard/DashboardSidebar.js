import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import IconCategories from "../components/icons/IconCategories";
import IconProduct from "../components/icons/IconProduct";
import IconLogout from "../components/icons/IconLogout";
import IconGlobalSettings from "../components/icons/IconGlobalSettings";
import IconReports from "../components/icons/IconReports";
import IconInbox from "../components/icons/IconInbox";
import IconOrder from "../components/icons/IconOrder";
import IconDashboard from "../components/icons/IconDashboard";
import IconCustomer from "../components/icons/IconCustomer";
import IconPersonalSetting from "../components/icons/IconPersonalSetting";

const sidebarLink = [
    { icon: <IconDashboard />, title: "Bảng điều khiển", url: "/admin" },
    { icon: <IconOrder />, title: "Đơn hàng", url: "/admin/order" },
    { icon: <IconProduct />, title: "Sản phẩm", url: "/admin/product" },
    { icon: <IconCategories />, title: "Danh mục", url: "/admin/categories" },
    { icon: <IconCustomer />, title: "Khách hàng", url: "/admin/customer" },
    { icon: <IconReports />, title: "Thống kê", url: "/admin/reports" },
    { icon: <IconInbox />, title: "Vận chuyển", url: "/admin/shipping" },
];

const settingsLinks = [
    { icon: <IconPersonalSetting />, title: "Tài khoản", url: "/admin/accounts" },
    { icon: <IconGlobalSettings />, title: "Cài đặt chung", url: "/admin/setting" },
    { icon: <IconLogout />, title: "Đăng xuất", url: "/admin/logout" },
];

const DashboardSidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage mobile sidebar visibility

    const navLinkClass = "flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 text-sm font-medium hover:bg-gray-200 hover:text-gray-900";
    const activeClass = "bg-white text-gray-900 shadow-lg";

    return (
        <div>
            {/* Sidebar Toggle Button (for mobile view) */}
            <button
                className="lg:hidden text-white mb-4 z-20" // Thêm z-index
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg">{isOpen ? 'Đóng' : 'Mở'}</span>
            </button>

            {/* Sidebar Container */}
            <div
                className={`sticky top-0 min-h-screen w-[260px] bg-[#1e2753] px-5 py-6 flex flex-col gap-8 overflow-auto transition-all duration-300 ${isOpen ? 'block' : 'lg:block hidden'}`}
            >
                {/* Main Links */}
                <div>
                    {sidebarLink.map((link) => (
                        <NavLink
                            to={link.url}
                            key={link.title}
                            end={link.url === '/admin'} // Only highlight the Dashboard link when the exact URL is matched
                            className={({ isActive }) =>
                                isActive ? `${navLinkClass} ${activeClass}` : navLinkClass
                            }
                        >
                            <div className="flex items-center gap-x-4">
                                <span>{link.icon}</span>
                                <span>{link.title}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>

                {/* Settings */}
                <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">Cài đặt</h3>
                    {settingsLinks.map((link) => (
                        <NavLink
                            to={link.url}
                            key={link.title}
                            className={({ isActive }) =>
                                isActive ? `${navLinkClass} ${activeClass}` : navLinkClass
                            }
                        >
                            <div className="flex items-center gap-x-4">
                                <span>{link.icon}</span>
                                <span>{link.title}</span>
                            </div>
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}
            </div>
        </div>
    );
};

export default DashboardSidebar;
