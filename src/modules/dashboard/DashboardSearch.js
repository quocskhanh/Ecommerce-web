import React, {useState} from "react";
import {defaultImage} from "../../constants/global";

const DashboardSearch = () => {
    const[showSearch,setShowSearch] = useState(false)
    return (
        <div className="relative z-50">
            <div
                className="bg-white rounded-full shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] p-2
        w-full flex items-center"
            >
                <div className="flex-1 px-5">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-transparent text-sm focus:outline-none placeholder:text-text4 text-text1"
                    />
                </div>
                <button className="w-[80px] h-[50px] rounded-full bg-[#121018] text-white flex items-center justify-center flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                </button>
            </div>
            {/* Đảm bảo phần tử "search-results" được định vị chính xác */}
            {showSearch && <div className="search-results w-full bg-white absolute top-full left-0 z-50 translate-y-5 pb-6 rounded-3xl lg:w-[843px]">
                <div className="flex items-center justify-between p-3 bg-graySoft">
                    <span className="font-medium text-sm pl-4 underline">See all 10,124 fundraisier</span>
                    <button className="flex items-center justify-center w-[72px] h-[50px] rounded-xl bg-error bg-opacity-20 text-error">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 pb-0">
                <div className="flex flex-col gap-y-5 mb-6">
                    <SearchItem></SearchItem>
                    <SearchItem></SearchItem>
                    <SearchItem></SearchItem>
                    <SearchItem></SearchItem>
                </div>
                    <h3 className="text-sm font-semibold mb-4">Related searchs</h3>
                    <div className="flex flex-col gap-y-3 text-sm text-text2">
                        <p><strong>education</strong> fund</p>
                        <p>schoralship fund</p>
                    </div>
                </div>
            </div> }
        </div>
    );
};
function SearchItem() {
    return (


    <div className="flex items-center gap-x-5">
        <img src={defaultImage} className="w-[50px] h-[50px] rounded-lg object-cover" alt=""/>
        <div className="flex-1 mb-1 text-sm">
            <h3 className="mb-1"><strong>Education</strong> fund for Durham Family</h3>
            <p className="text-text3">By Liverpool</p>
        </div>
    </div>
    )
}

export default DashboardSearch;
