import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/common/ErrorComponent";
const LayoutAuthentication = (props) => {
    const { children, heading = "" } = props;

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-white p-10 relative text-gray-800">
            {/* Logo */}
            <Link to="/" className="inline-block mb-5 lg:mb-16">
                <img
                    srcSet="/logo.jpeg 2x"
                    alt="fashion-app"
                    className="w-20 h-20 absolute top-4 left-4"
                />
            </Link>

            {/* Main Container */}
            <div className="w-full max-w-[556px] bg-white rounded-xl shadow-lg px-5 py-8 lg:px-16 lg:py-12 mx-auto">
                <h1 className="font-semibold text-lg lg:text-xl mb-3 text-gray-800 text-center">
                    {heading}
                </h1>
                {children}
            </div>
        </div>
    );
};


LayoutAuthentication.propTypes = {
    heading: PropTypes.string,
    children: PropTypes.node,
};

export default withErrorBoundary(LayoutAuthentication, {
    FallbackComponent: ErrorComponent,
});
