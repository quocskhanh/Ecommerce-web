import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from "../../layout/AdminLayout";

const EditCategoryPage = () => {
    const { id } = useParams();  // Get category ID from the URL
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: '',
        items: 0,
        image: '',
    });
    const [imageFile, setImageFile] = useState(null); // State for the selected image file

    useEffect(() => {
        // Fetch the category data by ID when the component is mounted
        axios.get(`http://localhost:5000/categories/${id}`)
            .then(response => {
                setCategory(response.data);  // Set the category data to state
            })
            .catch(error => {
                console.error('Error fetching category:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file); // Store the selected file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', category.name);
        formData.append('image', imageFile); // Append the image file
        formData.append('items', category.items);

        try {
            await axios.put(`http://localhost:5000/categories/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Specify that it's a file upload
                },
            });
            alert('Category updated successfully');
            navigate('/admin/categories');  // Navigate back to the categories list
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="flex">
                <div className="w-full overflow-y-auto h-screen p-6 bg-gray-50">
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate("/admin/categories")} // Navigate back to category list page
                            className="flex items-center px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368" className="mr-2">
                                <path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z"/>
                            </svg>
                            <span>Quay Lại</span>
                        </button>
                    </div>

                    <header className="mb-6">
                        <h1 className="text-3xl font-semibold text-gray-800">Sửa danh mục sản phẩm</h1>
                    </header>

                    {/* Category Edit Form */}
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                        {/* Category Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Tên danh mục</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={category.name}
                                onChange={handleChange}
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên danh mục"
                                required
                            />
                        </div>

                        {/* Category Image File Upload */}
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-lg font-medium text-gray-700">Chọn ảnh danh mục</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                accept="image/*"  // Accept only image files
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end mt-6">
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Cập nhật danh mục
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditCategoryPage;
