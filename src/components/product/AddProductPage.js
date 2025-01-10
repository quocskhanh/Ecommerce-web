import React, { useState } from "react";
import LayoutDashboard from "../layout/LayoutDashboard";

const AddProductPage = () => {
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const handleSave = () => {
        console.log({
            productName,
            productDescription,
            productPrice,
            discountPrice,
            categories,
            tags,
        });
        alert("Product added successfully!");
    };

    return (
        <LayoutDashboard>
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <form className="space-y-4">
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

                <div className="flex gap-4">
                    <div>
                        <label className="block font-semibold mb-2">Product Price</label>
                        <input
                            type="text"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="border px-4 py-2 w-full rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold mb-2">Discount Price</label>
                        <input
                            type="text"
                            value={discountPrice}
                            onChange={(e) => setDiscountPrice(e.target.value)}
                            className="border px-4 py-2 w-full rounded"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <label className="block font-semibold mb-2">Categories</label>
                    <div className="space-x-4">
                        <label>
                            <input
                                type="checkbox"
                                value="Men"
                                onChange={(e) =>
                                    setCategories((prev) =>
                                        e.target.checked
                                            ? [...prev, e.target.value]
                                            : prev.filter((cat) => cat !== e.target.value)
                                    )
                                }
                            />
                            Men
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                value="Women"
                                onChange={(e) =>
                                    setCategories((prev) =>
                                        e.target.checked
                                            ? [...prev, e.target.value]
                                            : prev.filter((cat) => cat !== e.target.value)
                                    )
                                }
                            />
                            Women
                        </label>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
        </LayoutDashboard>
    );
};

export default AddProductPage;
