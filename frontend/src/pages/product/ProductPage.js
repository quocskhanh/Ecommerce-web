import React, { useEffect, useState } from "react";
import AdminLayout from "../../layout/AdminLayout";
import { Link, useNavigate } from "react-router-dom";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [selected, setSelected] = useState([]);
    const [filter, setFilter] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();
    const [showEditModal, setShowEditModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Track success modal visibility
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/products");
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
    };

    useEffect(() => {
        let updatedProducts = [...products];
        if (filter) {
            updatedProducts = updatedProducts.filter((product) =>
                product.category.toLowerCase().includes(filter.toLowerCase())
            );
        }
        setFilteredProducts(updatedProducts);
    }, [filter, products]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        let searchedProducts = [...products];
        if (value) {
            searchedProducts = searchedProducts.filter(
                (product) =>
                    product.product.toLowerCase().includes(value.toLowerCase()) ||
                    product.category.toLowerCase().includes(value.toLowerCase())
            );
        }
        setFilteredProducts(searchedProducts);
    };

    const changePage = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const toggleSelect = (id) => {
        setSelected((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        );
    };

    const handleEditProduct = () => {
        if (selected.length === 1) {
            const productToEdit = products.find(product => product.id === selected[0]);
            setEditingProduct(productToEdit);
            setShowEditModal(true);
        } else if (selected.length === 0) {
            alert("Vui lòng chọn một sản phẩm để chỉnh sửa.");
        } else {
            alert("Chỉ có thể chỉnh sửa một sản phẩm tại một thời điểm.");
        }
    };

    const handleSaveEdit = async () => {
        if (!editingProduct) return;

        try {
            const response = await fetch(`http://localhost:5000/products/${editingProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingProduct),
            });

            if (!response.ok) throw new Error('Failed to update product');

            const updatedProduct = await response.json();

            // Cập nhật danh sách sản phẩm sau khi chỉnh sửa
            const updatedProducts = products.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product
            );
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);

            // Đóng modal và reset trạng thái
            setShowEditModal(false);
            setEditingProduct(null);
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Cập nhật sản phẩm thất bại, vui lòng thử lại.");
        }
    };

    const handleDeleteProducts = async () => {
        if (selected.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để xóa.");
            return;
        }

        try {
            await Promise.all(
                selected.map(id =>
                    fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' })
                )
            );

            const remainingProducts = products.filter(product => !selected.includes(product.id));
            setProducts(remainingProducts);
            setFilteredProducts(remainingProducts);
            setSelected([]);
            setShowDeleteModal(false);

            // Hiển thị thông báo sau khi xóa thành công
            setShowSuccessModal(true);

            // Tự động ẩn thông báo sau 3 giây
            setTimeout(() => {
                setShowSuccessModal(false);
            }, 3000);
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            alert("Xóa sản phẩm thất bại, vui lòng thử lại.");
        }
    };
    const handleExport = () => {
        const csvContent = `data:text/csv;charset=utf-8,${[
            ["ID", "Product", "Category", "Inventory", "Color", "Price", "Rating"],
            ...filteredProducts.map((product) => [
                product.id,
                product.name,
                product.price,
                product.description,
                product.category,
                product.status,
                product.colors,
                product.sizes,
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

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            // Nếu được check, chọn tất cả sản phẩm trong danh sách hiện tại
            setSelected(filteredProducts.map((item) => item.id));
        } else {
            // Nếu bỏ check, bỏ chọn tất cả
            setSelected([]);
        }
    };


    return (
        <AdminLayout>
            <div className="p-4 sm:p-6 md:p-8">
                <div className="flex justify-between items-center mb-6 flex-wrap">
                    <h1 className="text-2xl font-bold text-gray-800 w-full sm:w-auto">Sản phẩm</h1>
                    <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end mt-4 sm:mt-0">
                        <button onClick={handleExport} className="px-4 py-2 bg-white rounded border border-[#d6daec] hover:bg-gray-200">
                            Xuất
                        </button>
                        <button className="px-4 py-2 bg-[#1e5eff] rounded text-white hover:bg-blue-400" onClick={() => navigate("/admin/product/add-product")}>
                            + Thêm sản phẩm
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b">
                        <div className="flex gap-4 w-full sm:w-auto">
                            <select
                                className="border rounded-lg px-4 py-2 w-full sm:w-auto"
                                value={filter}
                                onChange={handleFilterChange}
                            >
                                <option value="">Danh mục sản phẩm</option>
                                <option value="Thời trang nam">Thời trang nam</option>
                                <option value="Thời trang nữ">Thời trang nữ</option>
                                <option value="Giày dép">Giày dép</option>
                                <option value="Phụ kiện">Phụ kiện</option>
                                <option value="Đồ công nghệ">Đồ công nghệ</option>
                            </select>





                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Tìm kiếm..."
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

                        <div className="flex flex-col sm:flex-row gap-4 ml-auto">
                            <button
                                className="px-5 py-3 bg-white-500 text-gray-600 rounded border border-blue-400 hover:bg-gray-300 cursor-pointer w-full sm:w-auto"
                                onClick={() => handleEditProduct()}
                                disabled={selected.length === 0}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                                </span>
                            </button>
                            <button
                                className="px-5 py-3 bg-white-500 text-blue-400 border border-blue-400 rounded hover:bg-gray-300 cursor-pointer w-full sm:w-auto"
                                onClick={() => setShowDeleteModal(true)

                            }
                                disabled={selected.length === 0}
                            >

                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                </span>
                            </button>
                        </div>
                    </div>


                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead className="bg-gray-300">
                            <tr>
                                <th className="p-4">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selected.length === filteredProducts.length && filteredProducts.length > 0}
                                    />
                                </th>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Tên sản phẩm</th>
                                <th className="border border-gray-300 p-2">Giá</th>
                                <th className="border border-gray-300 p-2">Mô tả</th>
                                <th className="border border-gray-300 p-2">Danh mục</th>
                                <th className="border border-gray-300 p-2">Trạng thái</th>
                                <th className="border border-gray-300 p-2">Màu sắc</th>
                                <th className="border border-gray-300 p-2">Kích cỡ</th>
                            </tr>
                            </thead>



                            {currentProducts.length > 0 ? (
                                currentProducts.map((item) => (
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
                                                {/* Use a default image or add a dynamic image */}
                                                <img
                                                    src="https://product.hstatic.net/1000369857/product/ao_thun_co_tron_ats08_mau_nau_1_026b0a00b02f45bfafa91b13c0109f2c.jpg" // Default image for product
                                                    alt={item.id}
                                                    className="w-10 h-10 rounded-full"
                                                />

                                            </div>
                                        </td>
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4">{item.price}</td>
                                        <td className="p-4">{item.description}</td>
                                        <td className="p-4">{item.category}</td>
                                        <td className="p-4">
                                            {item.status === "available" ? "Còn hàng" : "Hết hàng"}
                                        </td>                                        <td className="p-4">
                                            {item.colors && item.colors.length > 0
                                                ? item.colors.join(", ")
                                                : "No colors available"}
                                        </td>
                                        <td className="p-4">
                                            {item.sizes && item.sizes.length > 0
                                                ? item.sizes.join(", ")
                                                : "No sizes available"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-4 text-center">
                                        No products found
                                    </td>
                                </tr>
                            )}

                        </table>
                    </div>



                    {showEditModal && editingProduct && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                                <h2 className="text-xl font-semibold mb-4">Sửa sản phẩm</h2>
                                <div className="mb-4">
                                    <label className="block mb-2">Tên sản phẩm</label>
                                    <input
                                        type="text"
                                        value={editingProduct.product}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, product: e.target.value })
                                        }
                                        className="border rounded w-full p-2 mb-4"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Số lượng</label>
                                    <input
                                        type="number"
                                        value={editingProduct.inventory}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, inventory: e.target.value })
                                        }
                                        className="border rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Màu sắc</label>
                                    <input
                                        type="text"
                                        value={editingProduct.color}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, color: e.target.value })
                                        }
                                        className="border rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Giá</label>
                                    <input
                                        type="text"
                                        value={editingProduct.price}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, price: e.target.value })
                                        }
                                        className="border rounded w-full p-2"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Đánh giá</label>
                                    <input
                                        type="text"
                                        value={editingProduct.rating}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, rating: e.target.value })
                                        }
                                        className="border rounded w-full p-2"
                                    />
                                </div>

                                <div className="flex justify-between gap-4 mt-6">
                                    <button
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-full sm:w-auto"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
                                        onClick={handleSaveEdit}
                                    >
                                        Lưu
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Pagination */}
                    <div className="p-4 flex justify-end items-center">
                        <div className="flex gap-2">
                            <button
                                onClick={() => changePage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#5f6368">
                                    <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                                </svg>
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => changePage(index + 1)}
                                    className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-200 text-blue-600" : "bg-gray-200"}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => changePage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#5f6368">
                                    <path d="M600-80l400-400-400-400-71 71 329 329-329 329 71 71Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Xác nhận xóa</h2>
                            <p className="mb-4">
                                Bạn có chắc chắn muốn xóa khách hàng đã chọn không?
                            </p>
                            <div className="flex justify-between gap-2 mt-6">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-full sm:w-auto"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 w-full sm:w-auto"
                                    onClick={handleDeleteProducts}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* Success message */}
                {showSuccessModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                            <h3 className="text-xl font-semibold mb-4">Thông báo</h3>
                            <p>Khách hàng đã được xóa thành công!</p>
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full sm:w-auto"
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ProductPage;
