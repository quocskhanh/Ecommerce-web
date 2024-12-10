import React from 'react';
import PropTypes from "prop-types";

const Button = ({type  ="button",
                    children,
                    className = "",
                    isLoading = false,
                    ...rest}) => {
    const child = !!isLoading ? (
        <div className="w-10 h-10 rounded-full border-4 border-gray-300 border-t-transparent animate-spin"></div>
    ) : (
        children
    );

    return (

        <button
            className={`p-4 text-base font-semibold text-white rounded-xl flex justify-center items-center
             min-h-[56px] ${isLoading ? "opacity-50 pointer-events-none" : ""}
             ${className}`}
            type = {type}
            {...rest}>
            {child}
        </button>
    );
};
Button.propTypes = {
    type : PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
}
export default Button;