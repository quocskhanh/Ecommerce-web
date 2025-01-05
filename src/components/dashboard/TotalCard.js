import React from 'react';

const TotalCard = ({ title, value, percentage, description, icon }) => {
    return (
        <div className="p-6 bg-white rounded shadow">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold">{title}</h4>
                <span className={`text-sm ${percentage.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
          {percentage}
        </span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-gray-500">{description}</p>
        </div>
    );
};

export default TotalCard;
