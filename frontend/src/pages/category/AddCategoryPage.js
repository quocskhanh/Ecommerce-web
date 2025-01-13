import React, { useState } from 'react';
import AdminLayout from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
    const navigate = useNavigate();

    // Local state for form fields
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryImage, setCategoryImage] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add the logic to handle category creation
        console.log({ categoryName, categoryDescription, categoryImage });
    }

    return (
        <AdminLayout>
            <div className="flex">
                {/* Main Content */}
                <div className="w-full overflow-y-auto h-screen p-6 bg-gray-50">
                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate("/categories")} // Navigate back to category list page
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                        >
                            ← Quay Lại
                        </button>
                    </div>

                    {/* Page Header */}
                    <header className="mb-6">
                        <h1 className="text-3xl font-semibold text-gray-800">Thêm danh mục sản phẩm</h1>
                    </header>

                    {/* Category Form */}
                    <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            <label htmlFor="categoryName" className="block text-lg font-medium text-gray-700">Tên danh mục</label>
                            <input
                                id="categoryName"
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên danh mục"
                                required
                            />
                        </div>





                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Thêm danh mục
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddCategoryPage;
