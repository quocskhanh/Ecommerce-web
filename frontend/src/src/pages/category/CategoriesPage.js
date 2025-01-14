import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy danh sách các danh mục từ API khi component được render lần đầu
        axios.get('http://localhost:5000/categories') // Cập nhật với URL API của bạn
            .then(response => setCategories(response.data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa danh mục này?")) {
            // Gọi API để xóa danh mục
            axios.delete(`http://localhost:5000/categories/${id}`) // Cập nhật với URL API của bạn
                .then(() => {
                    // Sau khi xóa thành công, loại bỏ danh mục khỏi state
                    setCategories(categories.filter(category => category.id !== id));
                    console.log(`Category with ID: ${id} deleted.`);
                })
                .catch(error => {
                    console.error("Error deleting category:", error);
                });
        }
    };

    const handleEdit = (id) => {
        navigate(`/admin/categories/${id}`); // Navigate to the edit page
    };

    return (
        <AdminLayout>
            <div className="p-6 overflow-y-auto h-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Danh mục sản phẩm</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            onClick={() => navigate("/admin/categories/add-category")}>
                        + Thêm
                    </button>
                </div>
                {/* Chỉnh sửa grid cho responsive */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                        >
                            <div
                                className="h-40 bg-cover bg-center"
                                style={{ backgroundImage: `url(${category.image})` }}
                            ></div>
                            <div className="p-4">
                                <h2 className="text-lg font-medium text-gray-800">
                                    {category.name}
                                </h2>
                                <p className="text-gray-500">{category.items} mục</p>
                            </div>
                            {/* Hiệu ứng nút Edit và Delete */}
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => handleEdit(category.id)}
                                        className="flex items-center space-x-2 text-blue-600 bg-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500 hover:text-white transition duration-300 border border-blue-400"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>                                        <span>Sửa</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(category.id)}
                                        className="flex items-center space-x-2 text-red-600 bg-white px-4 py-2 rounded-md shadow-md hover:bg-red-500 hover:text-white transition duration-300 border border-blue-400"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                        <span>Xóa</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default CategoriesPage;
