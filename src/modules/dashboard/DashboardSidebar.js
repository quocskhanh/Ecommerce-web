import React from 'react';
import IconDashborad from "../../components/icons/IconDashborad";
import { NavLink } from "react-router-dom";
import IconPayment from "../../components/icons/IconPayment";
import IconProduct from "../../components/icons/IconProduct";
import IconLogout from "../../components/icons/IconLogout";
import IconSettings from "../../components/icons/IconSettings";
import IconHistory from "../../components/icons/IconHistory";
import IconLanguage from "../../components/icons/IconLanguage";
import IconOrder from "../../components/icons/IconOrder";
import IconShipping from "../../components/icons/IconShipping";

const sidebarLink = [
    {
        icon: <IconDashborad />,
        title: "Dashboard",
        url: "/"
    },
    {
        icon: <IconOrder />,
        title: "Order",
        url: "/order",
    },
    {
        icon: <IconPayment />,
        title: "Payment",
        url: "/payment",
    },
    {
        icon: <IconProduct />,
        title: "Product",
        url: "/product"
    },

    {
        icon: <IconHistory />,
        title: "History",
        url: "/history"
    },
    {
        icon: <IconShipping />,
        title: "Shipping",
        url: "/shipping"
    },
    {
        icon: <IconLanguage />,
        title: "Language",
        url: "/language"
    },
    {
        icon: <IconSettings />,
        title: "Settings",
        url: "/setting"
    },
    {
        icon: <IconLogout />,
        title: "Logout",
        url: "/logout",

    },
];

const DashboardSidebar = () => {
    const navLinkClass =
        "flex items-center gap-x-4 px-4 py-3 rounded-lg transition-all duration-300 text-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-black-500 hover:text-white";

    const activeClass =
        "bg-gradient-to-r from-gray-500 to-black-500 text-white shadow-lg";

    return (
        <div className="w-full md:w-[200px] rounded-3xl bg-gray-100 shadow-lg px-6 py-6 flex flex-col flex-shrink-0 gap-4">
            {sidebarLink.map((link) => (
                <NavLink
                    to={link.url}
                    key={link.title}
                    className={({ isActive }) =>
                        isActive ? `${navLinkClass} ${activeClass}` : navLinkClass
                    }
                >
                    <span className="text-2xl">{link.icon}</span>
                    <span className="md:block font-semibold text-black hidden">
                        {link.title}
                    </span>
                </NavLink>
            ))}
        </div>
    );
};

export default DashboardSidebar;
