import React from 'react';
import { NavLink } from "react-router-dom";
import IconCategories from "../../components/icons/IconCategories";
import IconProduct from "../../components/icons/IconProduct";
import IconLogout from "../../components/icons/IconLogout";
import IconGlobalSettings from "../../components/icons/IconGlobalSettings";
import IconReports from "../../components/icons/IconReports";
import IconInbox from "../../components/icons/IconInbox";
import IconOrder from "../../components/icons/IconOrder";
import IconCoupons from "../../components/icons/IconCoupons";
import IconDashboard from "../../components/icons/IconDashboard";
import IconKnowledgeBase from "../../components/icons/IconKnowledgeBase";
import IconProductUpdates from "../../components/icons/IconProductUpdates";
import IconCustomer from "../../components/icons/IconCustomer";
import IconPersonalSetting from "../../components/icons/IconPersonalSetting";

const sidebarLink = [
    {
        icon: <IconDashboard />,
        title: "Dashboard",
        url: "/",
    },
    {
        icon: <IconOrder />,
        title: "Orders",
        url: "/order",
        badge: 16,
    },
    {
        icon: <IconProduct />,
        title: "Products",
        url: "/product",
    },
    {
        icon: <IconCategories />,
        title: "Categories",
        url: "/categories",
    },
    {
        icon: <IconCustomer />,
        title: "Customer",
        url: "/customer",
    },
    {
        icon: <IconReports />,
        title: "Reports",
        url: "/reports",
    },
    {
        icon: <IconCoupons />,
        title: "Coupons",
        url: "/coupons",
    },
    {
        icon: <IconInbox />,
        title: "Inbox",
        url: "/inbox",
    },
];

const otherLinks = [
    {
        icon: <IconKnowledgeBase />,
        title: "Knowledge Base",
        url: "/knowledge",
    },
    {
        icon: <IconProductUpdates />,
        title: "Product Updates",
        url: "/productupdate",
    },
];

const settingsLinks = [
    {
        icon: <IconPersonalSetting />,
        title: "Personal Settings",
        url: "/personal",
    },
    {
        icon: <IconGlobalSettings />,
        title: "Global Settings",
        url: "/global",
    },
    {
        icon: <IconLogout />,
        title: "Logout",
        url: "/logout",
    },
];

const DashboardSidebar = () => {
    const navLinkClass =
        "flex items-center px-4 py-3 rounded-lg transition-all duration-300 text-gray-300 text-sm font-medium hover:bg-gray-200 hover:text-gray-900";
    const activeClass =
        "bg-white text-gray-900 shadow-lg";

    return (
        <div
            className="h-screen w-[260px] bg-[#1e2753] px-5 py-6 flex flex-col gap-8 overflow-auto sticky top-0"
        >
            {/* Main Links */}
            <div>
                {sidebarLink.map((link) => (
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
                        {link.badge && (
                            <span className="ml-auto bg-black text-white text-xs px-2 py-0.5 rounded-full">
                                {link.badge}
                            </span>
                        )}
                    </NavLink>
                ))}
            </div>

            {/* Other Information */}
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">
                    Other Information
                </h3>
                {otherLinks.map((link) => (
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

            {/* Settings */}
            <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-3">
                    Settings
                </h3>
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
        </div>
    );
};

export default DashboardSidebar;

