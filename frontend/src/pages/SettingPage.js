import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";

const SettingPage = () => {
    const [activeTab, setActiveTab] = useState("giới thiệu");

    // State cho đổi mật khẩu
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Gọi API đổi mật khẩu
    const handleChangePassword = async () => {
        setLoading(true);
        setMessage(""); // Xóa thông báo cũ
        try {
            const response = await fetch("http://localhost:5000/passwordChange", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    new_password: newPassword,
                }),
            });

            if (response.ok) {
                setMessage("Đổi mật khẩu thành công!");
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || "Đổi mật khẩu thất bại.");
            }
        } catch (error) {
            setMessage("Lỗi kết nối đến server.");
        } finally {
            setLoading(false);
        }
    };
    const renderNotificationSettingsTab = () => (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Cài đặt thông báo</h2>
            <p className="text-gray-700 mb-4">
                Quản lý các loại thông báo bạn muốn nhận từ <span className="font-bold text-blue-600">FASCO Store</span>.
            </p>
            <div className="space-y-4">
                <div>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Thông báo khuyến mãi.
                    </label>
                </div>
                <div>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Cập nhật sản phẩm mới.
                    </label>
                </div>
                <div>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Tin tức và xu hướng thời trang.
                    </label>
                </div>
            </div>
        </div>
    );

    const renderLoginActivityTab = () => (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Hoạt động đăng nhập</h2>
            <ul className="text-gray-700 space-y-4">
                {/* Ví dụ dữ liệu tĩnh */}
                <li>
                    <p><strong>Thời gian:</strong> 2025-01-14 08:30</p>
                    <p><strong>IP:</strong> 192.168.1.1</p>
                    <p><strong>Thiết bị:</strong> Chrome trên Windows</p>
                </li>
                <li>
                    <p><strong>Thời gian:</strong> 2025-01-13 12:45</p>
                    <p><strong>IP:</strong> 192.168.1.2</p>
                    <p><strong>Thiết bị:</strong> Firefox trên macOS</p>
                </li>
            </ul>
        </div>
    );
    const renderIntroductionTab = () => (
        <div className="bg-white shadow-md rounded-lg p-6 overflow-hidden">
            <div className="relative">
                <img
                    src="/rcm.jpg" // Replace with your cover image
                    alt="Cover"
                    className="w-full h-80 object-cover rounded-t-lg" // Tăng chiều cao lên h-60
                />
            </div>
            <div className="text-gray-700">
                <h2 className="text-xl font-semibold text-gray-700 mb-6 mt-6">Giới thiệu</h2>
                <p className="mb-4">
                    Chào mừng bạn đến với <span className="font-bold text-blue-600">FASCO Store</span> - nơi khơi nguồn cảm hứng thời trang.
                </p>
                <p className="mb-4">
                    Với mong muốn mang đến những thiết kế hiện đại, đẳng cấp và phù hợp với mọi phong cách, chúng tôi tự hào là điểm đến lý tưởng cho những tín đồ thời trang.
                </p>
                <p className="mb-4">
                    Tại <span className="font-bold text-blue-600">FASCO Store</span>, bạn sẽ tìm thấy những sản phẩm từ quần áo, giày dép, đến phụ kiện, được chọn lọc kỹ lưỡng để đảm bảo chất lượng cao nhất.
                </p>
                <p>
                    Hãy khám phá và nâng tầm phong cách của bạn với chúng tôi ngay hôm nay!
                </p>
            </div>
        </div>
    );


    // Nội dung tab "Đổi mật khẩu"
    const renderChangePasswordTab = () => (
        <div className=" bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Đổi mật khẩu</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Mật khẩu cũ</label>
                <input
                    type="password"
                    className="border w-full p-2 rounded"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Mật khẩu mới</label>
                <input
                    type="password"
                    className="border w-full p-2 rounded"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleChangePassword}
                disabled={loading}
            >
                {loading ? "Đang xử lý..." : "Xác nhận"}
            </button>
            {message && <p className="text-red-500 mt-4">{message}</p>}
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case "giới thiệu":
                return renderIntroductionTab();
            case "cài đặt thông báo":
                return renderNotificationSettingsTab();
            case "hoạt động đăng nhập":
                return renderLoginActivityTab();
            case "đổi mật khẩu":
                return renderChangePasswordTab();
            default:
                return null;
        }
    };


    return (
        <AdminLayout>
            <div className="settings-page flex bg-gray-100 min-h-screen">
                <div className="sidebar w-1/4 bg-white shadow-md rounded-lg p-4">
                    <ul className="space-y-6">
                        <li
                            className={`font-semibold flex items-center gap-2 cursor-pointer ${
                                activeTab === "giới thiệu"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("giới thiệu")}
                        >
                            <i className="fas fa-user"></i>
                            <span>Giới thiệu</span>
                        </li>
                        <li
                            className={`font-semibold flex items-center gap-2 cursor-pointer ${
                                activeTab === "cài đặt thông báo"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("cài đặt thông báo")}
                        >
                            <i className="fas fa-bell"></i>
                            <span>Cài đặt thông báo</span>
                        </li>
                        <li
                            className={`font-semibold flex items-center gap-2 cursor-pointer ${
                                activeTab === "hoạt động đăng nhập"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("hoạt động đăng nhập")}
                        >
                            <i className="fas fa-clock"></i>
                            <span>Hoạt động đăng nhập</span>
                        </li>
                        <li
                            className={`font-semibold flex items-center gap-2 cursor-pointer ${
                                activeTab === "đổi mật khẩu"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("đổi mật khẩu")}
                        >
                            <i className="fas fa-lock"></i>
                            <span>Đổi mật khẩu</span>
                        </li>
                    </ul>
                </div>
                <div className="content w-3/4 p-6">{renderContent()}</div>
            </div>
        </AdminLayout>
    );
};

export default SettingPage;
