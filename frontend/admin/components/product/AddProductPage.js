import React, { useState } from "react";
import LayoutDashboard from "../../layout/LayoutDashboard";
import {useNavigate} from "react-router-dom";

const AddProductPage = () => {
    const [shippingWeight, setShippingWeight] = useState("");
    const [shippingCountry, setShippingCountry] = useState("");
    const [isDigitalItem, setIsDigitalItem] = useState(false);
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [seoTitle, setSeoTitle] = useState("");
    const [seoDescription, setSeoDescription] = useState("");
    const [images, setImages] = useState([]);
    const [hasOptions, setHasOptions] = useState(false);
    const [options, setOptions] = useState([{ size: "Size", values: [] }]);
    const [showModal, setShowModal] = useState(false); // Modal state



    const handleSave = () => {
        console.log({
            productName,
            productDescription,
            productPrice,
            discountPrice,
            categories,
            tags,
            seoTitle,
            seoDescription,
            images,
            options: hasOptions ? options : null,
        });
    };

    const handleAddOption = () => {
        setOptions([...options, { size: "Size", values: [] }]);
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files).map((file) =>
            URL.createObjectURL(file)
        );
        setImages([...images, ...files]);
    };
    const navigate = useNavigate()

    return (
        <LayoutDashboard>
            <div className="flex">
                {/* Main Content */}
                <div className="w-full overflow-y-auto h-screen p-6">

                    {/* Back Button */}
                    <div className="flex items-center mb-6">
                        <button
                            onClick={() => navigate("/product")} // Navigate back to product page
                            className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            ← Back
                        </button>
                    </div>
                    <header className=" mb-6">
                        <h1 className="text-2xl font-bold ">Add Product</h1>
                    </header>

                    <div className="grid grid-cols-3 gap-6">
                        {/* Left Column */}
                        <div className="col-span-2 space-y-6 bg-white p-6 rounded-lg shadow-md">
                            {/* Product Information */}
                            <div>
                                <label className="block font-semibold mb-2">Product Name</label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="border px-4 py-2 w-full rounded"
                                />
                            </div>
                            <div>
                                <label className="block font-semibold mb-2">Product Description</label>
                                <textarea
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    className="border px-4 py-2 w-full rounded"
                                />
                            </div>

                            {/* Images */}
                            <div>
                                <label className="block font-semibold mb-2">Images</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="border px-4 py-2 w-full rounded"
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
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block font-semibold mb-2">Product Price</label>
                                    <input
                                        type="text"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        className="border px-4 py-2 w-full rounded"
                                        placeholder="Enter price"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block font-semibold mb-2">Discount Price</label>
                                    <input
                                        type="text"
                                        value={discountPrice}
                                        onChange={(e) => setDiscountPrice(e.target.value)}
                                        className="border px-4 py-2 w-full rounded"
                                        placeholder="Price at discount"
                                    />
                                </div>
                            </div>

                            {/* Different Options */}
                            <div className="mt-6">
                                <label className="block font-semibold text-lg mb-4">Different Options</label>

                                {/* Toggle Switch for Options */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className={`relative w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
                                            hasOptions ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                        onClick={() => setHasOptions(!hasOptions)}
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                                hasOptions ? "translate-x-6" : "translate-x-0"
                                            }`}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">
            {hasOptions ? "This product has multiple options" : "Enable options for this product"}
        </span>
                                </div>

                                {/* Options Section */}

                                <div className={`${hasOptions ? "block" : "hidden"} transition-opacity duration-300`}>
                                    {options.map((option, index) => (
                                        <div key={index} className="mb-6">
                                            {/* Option Label */}
                                            <label className="block font-medium mb-2">Option {index + 1}</label>

                                            <div className="flex items-center gap-4">
                                                {/* Dropdown for Option */}
                                                <select
                                                    value={option.size}
                                                    onChange={(e) => {
                                                        const newOptions = [...options];
                                                        newOptions[index].size = e.target.value;
                                                        setOptions(newOptions);
                                                    }}
                                                    className="flex-1 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white"
                                                >
                                                    <option value="">Select Option</option>
                                                    <option value="S">S</option>
                                                    <option value="M">M</option>
                                                    <option value="L">L</option>
                                                    <option value="XL">XL</option>
                                                </select>

                                                {/* Option Values Input */}
                                                <input
                                                    type="text"
                                                    placeholder="Values (e.g. S, M, L, XL)"
                                                    value={option.values?.join(", ")}
                                                    onChange={(e) => {
                                                        const newOptions = [...options];
                                                        newOptions[index].values = e.target.value
                                                            .split(",")
                                                            .map((val) => val.trim());
                                                        setOptions(newOptions);
                                                    }}
                                                    className="flex-1 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddOption}
                                        className="text-blue-500 hover:text-blue-600 underline font-medium"
                                    >
                                        Add More
                                    </button>
                                </div>

                            </div>



                            {/* Shipping */}
                            <div className="mt-6">
                                <label className="block font-semibold text-lg mb-4">Shipping</label>

                                {/* Shipping Weight and Country */}
                                <div className="flex gap-6 mb-6">
                                    <div className="flex-1">
                                        <label className="block font-medium mb-2">Weight (kg)</label>
                                        <input
                                            type="text"
                                            value={shippingWeight}
                                            onChange={(e) => setShippingWeight(e.target.value)}
                                            placeholder="Enter weight"
                                            className="border px-4 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block font-medium mb-2">Country</label>
                                        <select
                                            value={shippingCountry}
                                            onChange={(e) => setShippingCountry(e.target.value)}
                                            className="border px-4 py-2 w-full rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        >
                                            <option value="">Select Country</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="AU">Australia</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Toggle for Digital Item */}
                                <div className="flex items-center gap-4">
                                    {/* Toggle Switch */}
                                    <div
                                        className={`relative w-14 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
                                            isDigitalItem ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                        onClick={() => setIsDigitalItem(!isDigitalItem)}
                                    >
                                        <div
                                            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                                                isDigitalItem ? "translate-x-6" : "translate-x-0"
                                            }`}
                                        ></div>
                                    </div>
                                    {/* Toggle Label */}
                                    <span className="text-sm font-medium text-gray-700">
            {isDigitalItem ? "This is a digital item" : "This is a physical item"}
        </span>
                                </div>
                            </div>
                        </div>

                            {/* Right Column */}
                        <div className="space-y-6">
                            {/* Categories */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <label className="block font-semibold mb-2">Categories</label>
                                <div className="space-y-2">
                                    {["Women", "Men", "T-Shirt", "Hoodie", "Dress"].map((category) => (
                                        <label key={category} className="block">
                                            <input
                                                type="checkbox"
                                                value={category}
                                                onChange={(e) =>
                                                    setCategories((prev) =>
                                                        e.target.checked
                                                            ? [...prev, e.target.value]
                                                            : prev.filter((cat) => cat !== e.target.value)
                                                    )
                                                }
                                            />
                                            <span className="ml-2">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <label className="block font-semibold mb-2">Tags</label>
                                <input
                                    type="text"
                                    value={tags.join(", ")}
                                    onChange={(e) =>
                                        setTags(e.target.value.split(", ").map((tag) => tag.trim()))
                                    }
                                    className="border px-4 py-2 w-full rounded"
                                    placeholder="Add tags (e.g. T-Shirt, Men Clothes)"
                                />
                            </div>

                            {/* SEO Settings */}
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <label className="block font-semibold mb-2">SEO Settings</label>
                                <div>
                                    <label className="block font-semibold mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={seoTitle}
                                        onChange={(e) => setSeoTitle(e.target.value)}
                                        className="border px-4 py-2 w-full rounded"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block font-semibold mb-2">Description</label>
                                    <textarea
                                        value={seoDescription}
                                        onChange={(e) => setSeoDescription(e.target.value)}
                                        className="border px-4 py-2 w-full rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save and Cancel Buttons */}
                    <div className="flex justify-end mt-6 gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/product")} // Navigate back to product page
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded shadow-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setShowModal(true);
                            }}
                            className="px-6 py-2 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>

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
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="blue"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                                    </div>
                                </div>
                                <h2 className="text-xl font-semibold">Import Successful</h2>
                                <p className="text-gray-600 mt-2">Added new products to your store.</p>
                                <button
                                    onClick={() => {
                                        const modalElement = document.querySelector('.bg-white');
                                        modalElement.style.animation = "scaleOut 0.3s forwards";

                                        setTimeout(() => {
                                            setShowModal(false); // Đóng modal
                                            navigate("/product"); // Điều hướng đến trang "add-product"
                                        }, 300); // Tùy chỉnh thời gian trễ nếu cần
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
        </LayoutDashboard>
    );
};

export default AddProductPage;
