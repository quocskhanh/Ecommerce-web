import React, { useState } from "react";
import AdminLayout from "../../layout/AdminLayout";

const ShippingPage = () => {
    const [orderId, setOrderId] = useState(""); // Lưu trữ order_id người dùng nhập
    const [shipping, setShipping] = useState(null); // Lưu trữ thông tin vận chuyển
    const [loading, setLoading] = useState(false); // Hiển thị trạng thái đang tải
    const [error, setError] = useState(""); // Lưu trữ lỗi khi gọi API
    const [showEditModal, setShowEditModal] = useState(false); // Modal chỉnh sửa
    const [editingShipping, setEditingShipping] = useState(null); // Shipping đang chỉnh sửa
    const [statusOptions] = useState(["Chờ lấy hàng", "Đang vận chuyển", "Đã vận chuyển"]); // Tùy chọn trạng thái

    // State cho form POST
    const [newShipping, setNewShipping] = useState({
        order_id: "",
        address: "",
        status: "Chờ lấy hàng",
        shipped_at: "",
        delivered_at: "",
    });

    // Gọi API để lấy thông tin vận chuyển
    const fetchShipping = async () => {
        if (!orderId) {
            setError("Vui lòng nhập Order ID.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`https://testbe-1.onrender.com/shippings/${orderId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 404) {
                setError("Không tìm thấy thông tin vận chuyển cho Order ID này.");
                return;
            }

            if (!response.ok) throw new Error("Không thể lấy thông tin vận chuyển.");
            const data = await response.json();
            setShipping(data); // Lưu trữ dữ liệu shipping
        } catch (err) {
            console.error("Error fetching shipping:", err);
            setError("Đã xảy ra lỗi khi lấy thông tin vận chuyển.");
        } finally {
            setLoading(false);
        }
    };

    // Gửi yêu cầu POST để tạo mới vận chuyển
    const createShipping = async () => {
        setLoading(true);
        setError("");

        // Kiểm tra dữ liệu đầu vào trước khi gửi
        console.log("Shipping Data to be sent:", {
            order_id: Number(newShipping.order_id),
            address: newShipping.address,
            status: newShipping.status,
            shipped_at: newShipping.shipped_at,
            delivered_at: newShipping.delivered_at,
        });

        try {
            const response = await fetch("https://testbe-1.onrender.com/shippings/", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    order_id: Number(newShipping.order_id),
                    address: newShipping.address,
                    status: newShipping.status,
                    shipped_at: newShipping.shipped_at,
                    delivered_at: newShipping.delivered_at,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();  // Lấy chi tiết lỗi
                console.error("Error from API:", errorData);  // Hiển thị lỗi chi tiết
                throw new Error("Không thể tạo mới thông tin vận chuyển.");
            }

            const data = await response.json();

            // Cập nhật trạng thái đơn hàng sau khi tạo mới vận chuyển
            const orderResponse = await fetch(
                `https://testbe-1.onrender.com/orders/${newShipping.order_id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newShipping.status }),
                }
            );

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                console.error("Lỗi khi cập nhật đơn hàng:", errorData);
                throw new Error("Cập nhật đơn hàng thất bại.");
            }

            alert("Tạo mới thông tin vận chuyển thành công!");
            setNewShipping({
                order_id: 0,
                address: "",
                status: "Chờ lấy hàng",
                shipped_at: "",
                delivered_at: "",
            });
        } catch (err) {
            console.error("Lỗi khi tạo mới thông tin vận chuyển:", err);
            setError("Đã xảy ra lỗi khi tạo mới thông tin vận chuyển.");
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật thông tin vận chuyển
// Cập nhật thông tin vận chuyển và đồng thời cập nhật trạng thái đơn hàng
    const handleSaveEdit = async () => {
        if (!editingShipping) return;

        // Kiểm tra các trường bắt buộc
        if (!editingShipping.address || !editingShipping.status) {
            alert("Địa chỉ và trạng thái là các trường bắt buộc.");
            return;
        }
        if (!editingShipping.shipped_at || !editingShipping.delivered_at) {
            alert("Cả hai trường Ngày giao và Ngày hoàn thành đều là bắt buộc.");
            return;
        }

        try {
            // Log payload để kiểm tra dữ liệu gửi lên
            console.log("Payload chỉnh sửa Shipping:", editingShipping);

            // Cập nhật thông tin vận chuyển
            const shippingResponse = await fetch(
                `https://testbe-1.onrender.com/shippings/${editingShipping.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editingShipping),
                }
            );

            if (!shippingResponse.ok) {
                const errorData = await shippingResponse.json();
                console.error("Lỗi khi cập nhật shipping:", errorData);
                throw new Error(`Cập nhật vận chuyển thất bại: ${errorData.detail || "Có lỗi xảy ra"}`);
            }

            // Cập nhật trạng thái đơn hàng liên quan
            const orderResponse = await fetch(
                `https://testbe-1.onrender.com/orders/${editingShipping.order_id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: editingShipping.status }), // Cập nhật trạng thái của order
                }
            );

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                console.error("Lỗi khi cập nhật đơn hàng:", errorData);
                throw new Error(`Cập nhật đơn hàng thất bại: ${errorData.detail || "Có lỗi xảy ra"}`);
            }

            const updatedShipping = await shippingResponse.json();
            setShipping(updatedShipping); // Cập nhật thông tin shipping trong giao diện
            setShowEditModal(false);
            setEditingShipping(null);
            alert("Cập nhật thành công!");
        } catch (err) {
            console.error("Lỗi khi cập nhật thông tin:", err);
            alert(`Cập nhật thất bại: ${err.message}`);
        }
    };

    const handleShippedAtChange = (e) => {
        const datetime = e.target.value;
        const formattedDatetime = new Date(datetime).toISOString(); // Chuyển đổi thành định dạng ISO 8601 đầy đủ
        setNewShipping((prev) => ({ ...prev, shipped_at: formattedDatetime }));
    };
    const handleDeliveredAtChange = (e) => {
        const datetime = e.target.value;
        const formattedDatetime = new Date(datetime).toISOString(); // Chuyển đổi thành định dạng ISO 8601 đầy đủ
        setNewShipping((prev) => ({ ...prev, delivered_at: formattedDatetime }));
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 w-full sm:w-auto mb-8 mt-6">Quản lý vận chuyển</h1>

                {/* Nhập Order ID */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nhập Order ID..."
                        className="border rounded-lg px-4 py-2 mr-2"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick={fetchShipping}
                    >
                        Tìm kiếm
                    </button>
                </div>

                {/* Thông báo lỗi */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Loading */}
                {loading && <p>Đang tải...</p>}

                {/* Hiển thị thông tin vận chuyển */}
                {shipping && (
                    <div className="bg-white rounded-lg shadow-lg p-4">
                        <h2 className="text-xl font-bold mb-4">Thông tin vận chuyển</h2>
                        <p><strong>ID:</strong> {shipping.id}</p>
                        <p><strong>Order ID:</strong> {shipping.order_id}</p>
                        <p><strong>Địa chỉ:</strong> {shipping.address}</p>
                        <p><strong>Trạng thái:</strong> {shipping.status}</p>
                        <p>
                            <strong>Ngày giao:</strong>{" "}
                            {new Date(shipping.shipped_at).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Ngày hoàn thành:</strong>{" "}
                            {new Date(shipping.delivered_at).toLocaleDateString()}
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={() => {
                                setEditingShipping(shipping);
                                setShowEditModal(true);
                            }}
                        >
                            Sửa thông tin
                        </button>
                    </div>
                )}

                {/* Form tạo mới thông tin vận chuyển */}
                <div className="bg-white rounded-lg shadow-lg p-4 mt-6">
                    <h2 className="text-xl font-bold mb-4">Tạo mới thông tin vận chuyển</h2>
                    <div className="mb-4">
                        <label className="block mb-2">Order ID</label>
                        <input
                            type="text"
                            value={newShipping.order_id}
                            onChange={(e) =>
                                setNewShipping((prev) => ({ ...prev, order_id: e.target.value }))
                            }
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Địa chỉ</label>
                        <input
                            type="text"
                            value={newShipping.address}
                            onChange={(e) =>
                                setNewShipping((prev) => ({ ...prev, address: e.target.value }))
                            }
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Trạng thái</label>
                        <select
                            value={newShipping.status}
                            onChange={(e) =>
                                setNewShipping((prev) => ({ ...prev, status: e.target.value }))
                            }
                            className="border rounded w-full p-2"
                        >
                            {statusOptions.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Ngày giao</label>
                        <input
                            type="datetime-local"
                            value={newShipping.shipped_at ? new Date(newShipping.shipped_at).toISOString().slice(0, 16) : ""} // Chuyển đổi về dạng YYYY-MM-DDTHH:MM
                            onChange={handleShippedAtChange}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Ngày hoàn thành</label>
                        <input
                            type="datetime-local"
                            value={newShipping.delivered_at ? new Date(newShipping.delivered_at).toISOString().slice(0, 16) : ""} // Chuyển đổi về dạng YYYY-MM-DDTHH:MM
                            onChange={handleDeliveredAtChange}
                            className="border rounded w-full p-2"
                        />
                    </div>
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={createShipping}
                    >
                        Tạo mới
                    </button>
                </div>

                {/* Edit Modal */}
                {showEditModal && editingShipping && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                            <h3 className="text-xl font-bold mb-4">Chỉnh sửa vận chuyển</h3>

                            {/* Address Field */}
                            <div className="mb-4">
                                <label className="block mb-2">Địa chỉ</label>
                                <input
                                    type="text"
                                    value={editingShipping.address ?? ""}
                                    onChange={(e) =>
                                        setEditingShipping((prev) => ({
                                            ...prev,
                                            address: e.target.value,
                                        }))
                                    }
                                    className="border rounded w-full p-2"
                                />
                            </div>

                            {/* Shipped At Field */}
                            <div className="mb-4">
                                <label className="block mb-2">Ngày giao</label>
                                <input
                                    type="datetime-local"
                                    value={editingShipping.shipped_at ? editingShipping.shipped_at.slice(0, 16) : ""}
                                    onChange={(e) =>
                                        setEditingShipping((prev) => ({
                                            ...prev,
                                            shipped_at: e.target.value,
                                        }))
                                    }
                                    className="border rounded w-full p-2"
                                />
                            </div>

                            {/* Delivered At Field */}
                            <div className="mb-4">
                                <label className="block mb-2">Ngày hoàn thành</label>
                                <input
                                    type="datetime-local"
                                    value={editingShipping.delivered_at ? editingShipping.delivered_at.slice(0, 16) : ""}
                                    onChange={(e) =>
                                        setEditingShipping((prev) => ({
                                            ...prev,
                                            delivered_at: e.target.value,
                                        }))
                                    }
                                    className="border rounded w-full p-2"
                                />
                            </div>

                            {/* Status Field */}
                            <div className="mb-4">
                                <label className="block mb-2">Trạng thái</label>
                                <select
                                    value={editingShipping.status}
                                    onChange={(e) =>
                                        setEditingShipping((prev) => ({
                                            ...prev,
                                            status: e.target.value,
                                        }))
                                    }
                                    className="border rounded w-full p-2"
                                >
                                    <option value="Chờ lấy hàng">Chờ lấy hàng</option>
                                    <option value="Đang vận chuyển">Đang vận chuyển</option>
                                    <option value="Đã vận chuyển">Đã vận chuyển</option>
                                </select>
                            </div>

                            {/* Save and Cancel Buttons */}
                            <div className="flex justify-between gap-2">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={handleSaveEdit}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </AdminLayout>
    );
};

export default ShippingPage;
