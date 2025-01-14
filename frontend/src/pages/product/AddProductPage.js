import React, {useEffect, useState} from "react";
import AdminLayout from "../../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import colors from "tailwindcss/colors";

const AddProductPage = () => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [categories, setCategories] = useState("");
    const [images, setImages] = useState([]);
    const [colorsList, setColors] = useState([]); // Updated color state name
    const [sizes, setSizes] = useState([]); // Updated sizes state name
    const [showModal, setShowModal] = useState(false);
    const [status, setStatus] = useState([]);

    const navigate = useNavigate();

    const handleSave = async () => {
        // Kiểm tra các trường đầu vào
        if (!productName || !productDescription || !productPrice || !status || sizes.length === 0 || colorsList.length === 0 || categories.length === 0) {
            alert("Vui lòng điền đầy đủ thông tin và chọn ít nhất một kích cỡ, màu sắc và danh mục!");
            return;
        }

        const productData = {
            name: productName,
            description: productDescription,
            price: productPrice,
            image: images, // Updated field name for discount
            status: status, // Updated field name for discount
            category_id: categories, // Join categories into a string for simplicity
            colors: colorsList, // Use colorsList for color data
            sizes: sizes, // Use sizes for size data
        };



        try {
            const response = await fetch("http://localhost:5000/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            });

            if (response.ok) {
                setShowModal(true); // Show success modal
            } else {
                console.error("Failed to add product");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };



    const [availableCategories, setAvailableCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://localhost:5000/categories"); // URL API của danh mục
                if (response.ok) {
                    const data = await response.json();
                    setAvailableCategories(data); // Dữ liệu cần chứa { id, name }
                } else {
                    console.error("Failed to fetch categories");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageURLInput = (e) => {
        const url = e.target.value;
        if (url && !images.includes(url)) {
            setImages([...images, url]);
        }
    };

    return (
        <AdminLayout>
            <div className="flex">
                {/* Main Content */}
                <div className="w-full overflow-y-auto h-screen p-6">
                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate("/admin/product")}
                            className="flex items-center px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#5f6368"
                                className="mr-2"
                            >
                                <path d="M360-240 120-480l240-240 56 56-144 144h488v-160h80v240H272l144 144-56 56Z" />
                            </svg>
                            <span>Quay Lại</span>
                        </button>
                    </div>
                    <header className=" mb-6">
                        <h1 className="text-2xl font-bold ">Thêm sản phẩm</h1>
                    </header>

                    <div className="grid grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="col-span-2 space-y-6 bg-white p-6 rounded-lg shadow-md">
                            {/* Product Information */}
                            <div>
                                <label className="block font-semibold mb-2">Tên sản phẩm</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="border px-4 py-2 w-full rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Mô tả sản phẩm</label>
                                <textarea
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    className="border px-4 py-2 w-full rounded"
                                />
                            </div>

                            {/* Images */}
                            <div>
                                <label className="block font-semibold mb-2">Ảnh (URL)</label>
                                <input
                                    type="text"
                                    onChange={handleImageURLInput}
                                    className="border px-4 py-2 w-full rounded"
                                    placeholder="Nhập URL ảnh sản phẩm"
                                />
                                <div className="flex gap-2 mt-2">
                                    {images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt="Preview"
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="block font-semibold mb-2">Giá sản phẩm</label>
                                    <input
                                        type="text"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        className="border px-4 py-2 w-full rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-2">Tồn kho</label>
                                    <input
                                        type="text"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="border px-4 py-2 w-full rounded"
                                    />
                                </div>
                            </div>

                            {/* Size and Color */}
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <label className="block font-semibold mb-2">Màu sắc</label>
                                    <input
                                        type="text"
                                        value={colorsList.join(", ")} // Hiển thị mảng màu sắc dưới dạng chuỗi
                                        onChange={(e) => setColors(e.target.value.split(", ").map(color => color.trim()))} // Cập nhật màu sắc
                                        className="border px-4 py-2 w-full rounded"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="block font-semibold mb-2">Kích cỡ</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {["XXL", "XL", "L", "M"].map((size) => (
                                            <label
                                                key={size}
                                                className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition duration-300"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={size}
                                                    checked={sizes.includes(size)} // Kiểm tra nếu kích cỡ đã được chọn
                                                    onChange={(e) => {
                                                        // Thêm hoặc xóa kích cỡ từ mảng `sizes` khi thay đổi
                                                        setSizes((prev) =>
                                                            e.target.checked
                                                                ? [...prev, size] // Thêm kích cỡ nếu checkbox được chọn
                                                                : prev.filter((item) => item !== size) // Xóa kích cỡ nếu checkbox không được chọn
                                                        );
                                                    }}
                                                    className="form-checkbox text-blue-500"
                                                />
                                                <span className="text-gray-700">{size}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <label className="block font-semibold mb-2">Danh mục sản phẩm</label>
                                <select
                                    value={categories}
                                    onChange={(e) => setCategories(e.target.value)}
                                    className="border px-4 py-2 w-full rounded"
                                >
                                    <option value="">Chọn danh mục</option>
                                    {availableCategories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Save and Cancel Buttons */}
                    <div className="flex justify-end mt-6 gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/product")}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded shadow-md hover:bg-gray-300"
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            onClick={handleSave} // Call the API to save the product
                            className="px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                        >
                            Lưu
                        </button>
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
                            style={{ animation: "fadeIn 0.3s" }}
                        >
                            <div
                                className="bg-white rounded-lg p-6 w-96 shadow-lg text-center transform transition-transform duration-300 ease-in-out scale-90"
                                style={{ animation: "scaleIn 0.3s forwards" }}
                            >
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-md">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="blue"
                                        >
                                            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold">Import Successful</h2>
                                <p className="text-gray-600 mt-2">Added new products to your store.</p>
                                <button
                                    onClick={() => {
                                        const modalElement = document.querySelector(".bg-white");
                                        modalElement.style.animation = "scaleOut 0.3s forwards";

                                        setTimeout(() => {
                                            setShowModal(false);
                                            navigate("/admin/product");
                                        }, 300);
                                    }}
                                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition-transform duration-200 hover:scale-105"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default AddProductPage;
