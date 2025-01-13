import React from 'react';
import PropTypes from "prop-types";
import {withErrorBoundary} from "react-error-boundary";
import ErrorComponent from "../common/ErrorComponent";


const ButtonGoogle = ({text = "Sign up with Google",onClick = () => {}}) => {
    return (
        <button className="flex my-4 items-center gap-x-3 w-full justify-center py-3 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all bg-white">
            <img srcSet="/ggicon.png 2x" alt="icon-google" className="w-6 h-6"
            onClick={onClick}/>
            <span className="text-gray-700 font-medium">{text}</span>
        </button>
    );
};
ButtonGoogle.propTypes ={
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default withErrorBoundary(ButtonGoogle,{
    FallbackComponent: ErrorComponent
});