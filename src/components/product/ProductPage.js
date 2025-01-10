import React, { useState } from "react";
import LayoutDashboard from "../layout/LayoutDashboard";
import {useNavigate} from "react-router-dom";

const ProductPage = () => {
    const mockData = [
        {
            id: 1,
            product: "Men Hoodie",
            category: "Hoodies",
            inventory: "96 in stock",
            color: "Black",
            price: "$49.90",
            rating: "5.0 (32 Votes)",
            image: "https://m.media-amazon.com/images/I/71mhs8nkGeL._AC_UY1000_.jpg",
        },
        {
            id: 2,
            product: "Women Striped T-Shirt",
            category: "T-Shirt",
            inventory: "56 in stock",
            color: "White",
            price: "$34.90",
            rating: "4.8 (24 Votes)",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVxkoxYBvJ7R1gpVLJLa1K_YwQ6y6MaL5YQA&s",
        },
        {
            id: 3,
            product: "Women White T-Shirt",
            category: "T-Shirt",
            inventory: "78 in stock",
            color: "White",
            price: "$40.90",
            rating: "5.0 (54 Votes)",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFv9Se1-sPq7zSkXuIiiJc3pHIZxPWXPyIuw&s",
        },
    ];

    const [products, setProducts] = useState(mockData);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const [selected, setSelected] = useState([]);
    const [filter, setFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);
    const navigate = useNavigate()

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    // Pagination
    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Toggle product selection
    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // Handle filter
    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);

        const filteredProducts =
            value === ""
                ? mockData
                : mockData.filter((product) =>
                    product.category.toLowerCase().includes(value.toLowerCase())
                );
        setProducts(filteredProducts);
        setCurrentPage(1);
    };

    // Handle search
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const searchedProducts = mockData.filter(
            (product) =>
                product.product.toLowerCase().includes(value.toLowerCase()) ||
                product.category.toLowerCase().includes(value.toLowerCase())
        );
        setProducts(searchedProducts);
        setCurrentPage(1);
    };

    // Handle edit
    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const saveEdit = (updatedProduct) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === updatedProduct.id ? updatedProduct : product
            )
        );
        setEditingProduct(null);
    };

    // Handle delete
    const handleDelete = (id) => {
        setProducts((prev) => prev.filter((product) => product.id !== id));
    };

    // Handle export
    const handleExport = () => {
        const csvContent = `data:text/csv;charset=utf-8,${[
            ["ID", "Product", "Category", "Inventory", "Color", "Price", "Rating"],
            ...products.map((product) => [
                product.id,
                product.product,
                product.category,
                product.inventory,
                product.color,
                product.price,
                product.rating,
            ]),
        ]
            .map((e) => e.join(","))
            .join("\n")}`;

        const link = document.createElement("a");
        link.setAttribute("href", encodeURI(csvContent));
        link.setAttribute("download", "products.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <LayoutDashboard>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleExport}
                            className="px-4 py-2 bg-white rounded border border-[#d6daec]"
                        >
                            Export
                        </button>
                        <button className="px-4 py-2 bg-[#1e5eff] rounded text-white"
                            onClick={() => navigate("/add-product")}
                                >
                            + Add Product
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="flex justify-between items-center p-4 border-b">
                        <div className="flex gap-4">
                            <select
                                className="border rounded-lg px-4 py-2"
                                value={filter}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Categories</option>
                                <option value="Hoodies">Hoodies</option>
                                <option value="T-Shirt">T-Shirt</option>
                            </select>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Search..."
                                    className="border rounded-lg px-4 py-2 pl-10"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="#5f6368"
                                    className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                                >
                                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4">
                                <input
                                    type="checkbox"
                                    onChange={(e) =>
                                        setSelected(
                                            e.target.checked
                                                ? products.map((item) => item.id)
                                                : []
                                        )
                                    }
                                />
                            </th>
                            <th className="p-4">Product</th>
                            <th className="p-4">Inventory</th>
                            <th className="p-4">Color</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Rating</th>
                            <th className="p-4">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentProducts.map((item) => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(item.id)}
                                        onChange={() => toggleSelect(item.id)}
                                    />
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={item.image}
                                            alt={item.product}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <div className="font-semibold">{item.product}</div>
                                            <div className="text-gray-500 text-sm">
                                                {item.category}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">{item.inventory}</td>
                                <td className="p-4">{item.color}</td>
                                <td className="p-4">{item.price}</td>
                                <td className="p-4">{item.rating}</td>
                                <td className="p-4">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="px-2 py-1 text-blue-500 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="px-2 py-1 text-red-500 hover:underline ml-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="p-4 flex justify-between items-center">
                        <div className="flex gap-2">
                            <button
                                onClick={() => changePage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="18px"
                                    viewBox="0 -960 960 960"
                                    width="18px"
                                    fill="#5f6368"
                                >
                                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                                </svg>
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => changePage(index + 1)}
                                    className={`px-3 py-1 rounded ${
                                        currentPage === index + 1
                                            ? "bg-blue-200 text-blue-600"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => changePage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="18px"
                                    viewBox="0 -960 960 960"
                                    width="18px"
                                    fill="#5f6368"
                                >
                                    <path d="M600-80l400-400-400-400-71 71 329 329-329 329 71 71Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Edit Modal */}
                {editingProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    saveEdit(editingProduct);
                                }}
                            >
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        value={editingProduct.product}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                product: e.target.value,
                                            })
                                        }
                                        className="border w-full px-3 py-2 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Category
                                    </label>
                                    <input
                                        type="text"
                                        value={editingProduct.category}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                category: e.target.value,
                                            })
                                        }
                                        className="border w-full px-3 py-2 rounded-lg"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Price
                                    </label>
                                    <input
                                        type="text"
                                        value={editingProduct.price}
                                        onChange={(e) =>
                                            setEditingProduct({
                                                ...editingProduct,
                                                price: e.target.value,
                                            })
                                        }
                                        className="border w-full px-3 py-2 rounded-lg"
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingProduct(null)}
                                        className="px-4 py-2 text-gray-500 border rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </LayoutDashboard>
    );
};

export default ProductPage;
