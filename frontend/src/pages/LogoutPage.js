import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Thêm axios để gọi API
import AdminLayout from "../layout/AdminLayout";

const LogoutPage = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Gọi API đăng xuất tới localhost:5000
            const response = await axios.post(
                "http://localhost:8000/logout'", // Đường dẫn tới API giả lập
                {}, // Dữ liệu nếu cần, để trống ở đây
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Đính kèm token nếu cần
                    },
                }
            );

            // Kiểm tra phản hồi
            if (response.status === 200) {
                localStorage.removeItem("token"); // Xóa token khỏi localStorage
                alert("Bạn đã đăng xuất thành công!");
                navigate("/auth/sign-in"); // Chuyển hướng về trang đăng nhập
            } else {
                alert("Có lỗi xảy ra. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
            alert("Không thể đăng xuất. Vui lòng thử lại sau!");
        }
    };

    const handleCancel = () => {
        navigate(-1); // Quay lại trang trước đó
    };

    return (
        <AdminLayout>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">Xác nhận Đăng Xuất</h1>
                    <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn đăng xuất không?</p>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-all"
                        >
                            Hủy Bỏ
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                        >
                            Đăng Xuất
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default LogoutPage;
