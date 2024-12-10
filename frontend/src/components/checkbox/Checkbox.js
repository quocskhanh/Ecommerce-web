import React from 'react';

const Checkbox = ({checked = false,onClick = () => {}},name = "") => {
    return (
        <label
            className={`border border-gray-400 inline-flex items-center justify-center text-white p-1 w-5 h-5 rounded  ${checked ? "bg-primary border-primary " : "border-strock"}`}>
            <input type="checkbox"  className="hidden" onChange={() => {}} name={name}
            onClick={onClick}/>
            <span>
               <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="w-6 h-6 text-white"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor"
                   strokeWidth={2}
               >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
            </span>
        </label>
    );
};

export default Checkbox;