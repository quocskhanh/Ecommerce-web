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
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            try {
                // Fetch products
                const productResponse = await fetch("http://localhost:5000/products");
                const productsData = await productResponse.json();


                // Fetch categories
                const categoryResponse = await fetch("http://localhost:5000/categories");
                const categoriesData = await categoryResponse.json();
                setCategories(categoriesData);

                // Enrich products with category data
                const enrichedProducts = productsData.map(product => {
                    const category = categoriesData.find(cat => cat.id === product.category_id);
                    return {
                        ...product,
                        category_name: category ? category.name : "Uncategorized",
                    };
                });

                setProducts(enrichedProducts);
                setFilteredProducts(enrichedProducts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProductsAndCategories();
    }, []);

    const handleFilterChange = (e) => {
        const selectedCategory = e.target.value;
        setFilter(selectedCategory);
        const filtered = selectedCategory
            ? products.filter(product => product.category_id === parseInt(selectedCategory))
            : products;
        setFilteredProducts(filtered);
    };

    useEffect(() => {
        let updatedProducts = [...products];

        if (searchTerm) {
            updatedProducts = updatedProducts.filter(product =>
                product.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProducts(updatedProducts);
    }, [searchTerm, products]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
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
            const selectedId = Number(selected[0]); // Chuyển selected[0] thành số nguyên nếu cần
            const productToEdit = products.find(product => product.id === selectedId);
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
            // Chuyển selected[0] thành kiểu số nguyên nếu cần
            const selectedIds = selected.map(id => Number(id)); // Đảm bảo selected chứa các số nguyên

            // Xóa các sản phẩm đã chọn từ cơ sở dữ liệu
            await Promise.all(
                selectedIds.map(id =>
                    fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' })
                )
            );

            // Cập nhật lại danh sách sản phẩm sau khi xóa
            const remainingProducts = products.filter(product => !selectedIds.includes(product.id));

            // Cập nhật lại filteredProducts để không có sản phẩm bị xóa
            setProducts(remainingProducts);

            // Cập nhật filteredProducts với điều kiện tìm kiếm hoặc lọc hiện tại
            let updatedFilteredProducts = remainingProducts;

            if (filter) {
                updatedFilteredProducts = updatedFilteredProducts.filter(product => product.category_name === filter);
            }

            if (searchTerm) {
                updatedFilteredProducts = updatedFilteredProducts.filter(product =>
                    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setFilteredProducts(updatedFilteredProducts);

            // Reset các sản phẩm đã chọn
            setSelected([]);

            // Đóng modal xóa sau khi thành công
            setShowDeleteModal(false);

            // Hiển thị thông báo thành công sau khi xóa
            setShowSuccessModal(true);

            // Tự động ẩn thông báo thành công sau 3 giây
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
            ["ID", "Product Name", "Category", "Description", "Status", "Colors", "Sizes", "Price"],
            ...filteredProducts.map((product) => [
                product.id,
                product.name,
                product.description,
                product.status,
                product.colors.join(", "),
                product.sizes.join(", "),
                product.price,
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
            setSelected(filteredProducts.map((item) => item.id));
        } else {
            setSelected([]);
        }
    };




return (
        <AdminLayout>
            <div className="p-6 ">
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
                                <option value="">Tất cả danh mục</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    placeholder="Tìm kiếm sản phẩm..."
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
                                className="px-5 py-3 bg-white-500 text-gray-600 rounded border border-blue-400 hover:bg-blue-500 cursor-pointer w-full sm:w-auto"
                                onClick={handleEditProduct}
                            >
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                                </span>
                            </button>

                            <button
                                className="px-5 py-3 bg-white-500 text-blue-400 border border-blue-400 rounded hover:bg-red-500 cursor-pointer w-full sm:w-auto"
                                onClick={() => {
                                    if (selected.length === 0) {
                                        // Nếu không có tài khoản nào được chọn, hiển thị cảnh báo hoặc thông báo
                                        alert("Vui lòng chọn sản phẩm để xóa!");
                                    } else {
                                        // Nếu có tài khoản được chọn, hiển thị modal xóa
                                        setShowDeleteModal(true);
                                    }
                                }}
                            >

                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                                </span>
                            </button>
                        </div>
                    </div>


                    <div className="overflow-x-auto">
                        <table className="w-full text-center min-w-[600px]">
                            <thead className="bg-gray-300">
                            <tr>
                                <th className="p-4 border border-gray-400 text-center">
                                    <input
                                        type="checkbox"
                                        onChange={handleSelectAll}
                                        checked={selected.length === filteredProducts.length && filteredProducts.length > 0}
                                    />
                                </th>
                                <th className="p-2 border border-gray-400">ID</th>
                                <th className="p-2 border border-gray-400">Ảnh</th>

                                <th className="border border-gray-400 p-2">Tên sản phẩm</th>
                                <th className="border border-gray-400 p-2">Giá</th>
                                <th className="border border-gray-400 p-2">Mô tả</th>
                                <th className="border border-gray-400 p-2">Trạng thái</th>
                                <th className="border border-gray-400 p-2">Màu sắc</th>
                                <th className="border border-gray-400 p-2">Kích cỡ</th>
                            </tr>
                            </thead>



                            {currentProducts.length > 0 ? (
                                currentProducts.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-100 border border-gray-300">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(item.id)}
                                                onChange={() => toggleSelect(item.id)}
                                            />
                                        </td>
                                        <td className="p-4 border border-gray-300">{item.id}</td>
                                        <td className="p-4 border border-gray-300">
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                                        </td>
                                        <td className="p-4 border border-gray-300">{item.name}</td>
                                        <td className="p-4 border border-gray-300">{item.price}</td>
                                        <td className="p-4 border border-gray-300">{item.description}</td>
                                        <td className="p-4 border border-gray-300">
                                            {item.status }
                                        </td>
                                        <td className="p-4">
                                            {item.colors && item.colors.length > 0
                                                ? item.colors.join(", ")
                                                : "No colors available"}
                                        </td>
                                        <td className="p-4 border border-gray-300">
                                            {item.sizes && item.sizes.length > 0
                                                ? item.sizes.join(", ")
                                                : "No sizes available"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="p-4 text-center">
                                        Không có sản phẩm nào được tìm thấy.
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
                                        value={editingProduct.name}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, name: e.target.value })
                                        }
                                        className="border rounded w-full p-2 "
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2">Giá</label>
                                    <input
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, price: e.target.value })
                                        }
                                        className="border rounded w-full p-2"
                                    />
                                </div>


                                <div className="mb-4">
                                    <label className="block mb-2">Mô tả</label>
                                    <input
                                        type="text"
                                        value={editingProduct.description}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, description: e.target.value })
                                        }
                                        className="border rounded w-full p-2"
                                    />
                                </div>





                                <div className="mb-4">
                                    <label className="block mb-2">Tồn kho</label>
                                    <input
                                        type="text"
                                        value={editingProduct.status}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, status: e.target.value })
                                        }
                                        className="border rounded w-full p-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2">Màu sắc</label>
                                    <input
                                        type="text"
                                        value={editingProduct.colors}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, colors: e.target.value })
                                        }
                                        className="border rounded w-full p-2"
                                    />
                                </div>


                                <div className="mb-4">
                                    <label className="block mb-2">Kích cỡ</label>
                                    <input
                                        type="text"
                                        value={editingProduct.sizes}
                                        onChange={(e) =>
                                            setEditingProduct({ ...editingProduct, sizes: e.target.value })
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
                    <div className="p-4 flex justify-between items-center">
                        <p>
                            Hiển thị {Math.min((currentPage - 1) * itemsPerPage + 1, products.length)}-
                            {Math.min(currentPage * itemsPerPage, products.length)} trong {products.length}
                        </p>
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
