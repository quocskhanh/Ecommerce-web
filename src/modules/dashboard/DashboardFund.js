import React from 'react';
import Button from "../../components/button/Button";

const DashboardFund = () => {
    return (
        <div className="flex items-center gap-x-2 text-text2 text-base font-medium cursor-pointer">
            <span>Fundrising for</span>
            <span className="w-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 max-w-full h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
                        </span>
        </div>
    );
};

export default DashboardFund;