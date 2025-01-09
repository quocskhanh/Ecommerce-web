import React from 'react';

const Checkbox = ({ checked = false, onClick = () => {}, name = "" }) => {
    return (
        <label
            className={`inline-flex items-center justify-center p-1 w-5 h-5 rounded border-2 ${checked ? "bg-black border-gray-500" : "border-gray-500"}`}
        >
            <input
                type="checkbox"
                className="hidden"
                onChange={() => {}}
                name={name}
                onClick={onClick}
            />
            <span className="relative w-full h-full flex items-center justify-center">
                {checked && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </span>
        </label>
    );
};

export default Checkbox;
