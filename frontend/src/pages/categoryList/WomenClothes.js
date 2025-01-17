import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";

const WomenClothes = () => {
    // Initial state
    const initialProducts = [];
    const [products, setProducts] = useState(initialProducts);
    const [categoryVisible, setCategoryVisible] = useState(true);

    // Backup states for cancel functionality
    const [originalProducts, setOriginalProducts] = useState([...initialProducts]);
    const [originalVisibility, setOriginalVisibility] = useState(categoryVisible);

    // Product editing states
    const [editingProduct, setEditingProduct] = useState(null);
    const [tempProduct, setTempProduct] = useState({ name: "", image: "" });

    const navigate = useNavigate();

    // Handle file upload
    const handleAddFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File selected:", file.name);
        }
    };

    // Edit product logic
    const handleEdit = (product) => {
        setEditingProduct(product);
        setTempProduct({ name: product.name, image: product.image });
    };

    const handleSaveEdit = () => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === editingProduct.id
                    ? { ...editingProduct, ...tempProduct }
                    : product
            )
        );
        setEditingProduct(null);
        setTempProduct({ name: "", image: "" });
    };

    const handleCancelEdit = () => {
        setEditingProduct(null);
        setTempProduct({ name: "", image: "" });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempProduct((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Save and cancel all changes
    const handleSaveAll = () => {
        setOriginalProducts([...products]);
        setOriginalVisibility(categoryVisible);
        alert("Changes saved successfully!");
    };

    const handleCancelAll = () => {
        setProducts([...originalProducts]);
        setCategoryVisible(originalVisibility);
        setEditingProduct(null);
        setTempProduct({ name: "", image: "" });
        alert("All changes reverted.");
    };

    // Add and delete product
    const handleAddProduct = () => {
        const newProduct = {
            id: Date.now(),
            name: "New Product",
            image: "/images/default.jpg",
        };
        setProducts((prev) => [...prev, newProduct]);
    };

    const handleDelete = (id) => {
        setProducts((prev) => prev.filter((product) => product.id !== id));
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="p-3 ">
                <button
                    onClick={() => navigate("/categories")}
                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                    ← Back
                </button>
                <h1 className="mt-4 text-2xl font-bold">Thời trang nữ</h1>
            </div>

            {/* Main Content */}
            <div className="p-4 max-w-6xl mx-auto bg-white rounded-md shadow-md mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Products Section */}
                <div className="md:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Products ({products.length})
                    </h3>
                    <ul className={`space-y-4 ${products.length >= 4 ? "max-h-96 overflow-y-auto" : ""}`}>
                        {products.map((product) => (
                            <li
                                key={product.id}
                                className="flex items-center justify-between border border-gray-300 rounded-lg p-3 hover:shadow-lg group transition-shadow"
                            >
                                {editingProduct?.id === product.id ? (
                                    <div className="w-full h-full">
                                        <input
                                            type="text"
                                            value={tempProduct.name}
                                            onChange={(e) =>
                                                setTempProduct((prev) => ({ ...prev, name: e.target.value }))
                                            }
                                            className="mb-2 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
                                        />
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={tempProduct.image}
                                                alt="Preview"
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <input
                                                type="file"
                                                onChange={handleImageChange}
                                                className="text-sm text-gray-600"
                                            />
                                        </div>
                                        <div className="flex space-x-4 mt-4">
                                            <button
                                                onClick={handleSaveEdit}
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-12 h-12 rounded-md object-cover mr-4"
                                            />
                                            <span className="text-gray-700 text-sm">{product.name}</span>
                                        </div>
                                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="text-blue-500 hover:underline text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:underline text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleAddProduct}
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        + Add Product
                    </button>
                </div>

                {/* Category Info Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Category Visibility
                    </label>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Visible on site</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={categoryVisible}
                                onChange={() => setCategoryVisible(!categoryVisible)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition"></div>
                            <div
                                className="w-4 h-4 bg-white rounded-full shadow absolute top-1 left-1 peer-checked:translate-x-5 transition"
                            ></div>
                        </label>
                    </div>

                    {categoryVisible && (
                        <div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-600">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value="Women Clothes"
                                    className="w-full mt-2 p-2 border border-gray-300 rounded focus:ring focus:ring-blue-500"
                                    readOnly
                                />
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-600">
                                    Image
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <p className="text-sm text-gray-500">Drag and drop files here</p>
                                    <label
                                        htmlFor="file-upload"
                                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded cursor-pointer"
                                    >
                                        Add File
                                    </label>
                                    <input
                                        id="file-upload"
                                        type="file"
                                        className="hidden"
                                        onChange={handleAddFile}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="flex justify-end mt-8 p-4 bg-white ">
                <button
                    onClick={handleCancelAll}
                    className="px-6 py-2 bg-white text-blue-500 rounded border hover:bg-gray-100 mr-4"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSaveAll}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save
                </button>
            </div>
        </AdminLayout>
    );
};

export default WomenClothes;
