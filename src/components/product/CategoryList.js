import React from 'react';

const CategoryList = ({ categories, onCategoryClick }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Product Categories</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index} className="mb-2 hover:text-blue-500 flex items-center">
                        <span className="mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <button onClick={() => onCategoryClick(category)}>{category}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryList;
