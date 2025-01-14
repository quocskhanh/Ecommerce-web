import React, { useState } from "react";
import AdminLayout from "../layout/AdminLayout";

const SettingPage = () => {
    // State để theo dõi mục sidebar đang được chọn
    const [activeTab, setActiveTab] = useState("giới thiệu");

    // Nội dung hiển thị dựa trên tab đang chọn
    const renderContent = () => {
        switch (activeTab) {
            case "giới thiệu":
                return (
                    <div className="bg-white shadow-lg rounded-lg p-6 overflow-hidden ">
                        <div className="relative">
                            <img
                                src="/Liv2007.jpg" // Replace with your cover image URL
                                alt="Cover"
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                        </div>
                        <div className="text-gray-700">
                            <h2 className="text-xl font-semibold text-gray-700 mb-6 mt-6">Giới thiệu</h2>
                            <p className="mb-4">
                                Chào mừng bạn đến với <span className="font-bold text-blue-600">FASCO Store</span>,
                                nơi mang đến cho bạn những bộ sưu tập thời trang đẳng cấp và hiện đại nhất.
                            </p>
                            <p className="mb-4">
                                Tại <span className="font-bold">FASCO Store</span>, chúng tôi luôn cập nhật những xu hướng mới nhất,
                                mang đến các sản phẩm chất lượng cao, từ quần áo, giày dép đến phụ kiện thời trang.
                            </p>
                            <p className="mb-4">
                                Đội ngũ của chúng tôi cam kết mang lại trải nghiệm mua sắm tuyệt vời nhất.
                            </p>
                            <p>
                                Hãy cùng khám phá và biến hóa phong cách thời trang của bạn tại <span className="font-bold">FASCO Store</span> ngay hôm nay!
                            </p>
                        </div>
                    </div>
                );
            case "phương thức thanh toán":
                return (
                    <div className=" bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Phương thức thanh toán</h2>
                        <p className="text-gray-700">
                            Chúng tôi hỗ trợ các phương thức thanh toán phổ biến như thẻ tín dụng, ví điện tử, và chuyển khoản ngân hàng.
                        </p>
                    </div>
                );
            case "cài đặt thông báo":
                return (
                    <div className=" bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Cài đặt thông báo</h2>
                        <p className="text-gray-700">
                            Bạn có thể quản lý và điều chỉnh các loại thông báo để không bỏ lỡ bất kỳ ưu đãi nào.
                        </p>
                    </div>
                );
            case "hoạt động đăng nhập":
                return (
                    <div className=" bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Hoạt động đăng nhập</h2>
                        <p className="text-gray-700">
                            Xem lại các lần đăng nhập gần đây của bạn để đảm bảo an toàn tài khoản.
                        </p>
                    </div>
                );
            case "đổi mật khẩu":
                return (
                    <div className=" bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Đổi mật khẩu</h2>
                        <p className="text-gray-700">
                            Bạn có thể đổi mật khẩu để tăng cường bảo mật cho tài khoản của mình.
                        </p>
                    </div>
                );
            case "kết nối mạng xã hội":
                return (
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Kết nối mạng xã hội</h2>
                        <p className="text-gray-700">
                            Kết nối tài khoản của bạn với mạng xã hội để dễ dàng chia sẻ và cập nhật thông tin.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AdminLayout>
            <div className="settings-page flex bg-gray-100 min-h-screen">
                {/* Sidebar */}
                <div className="sidebar w-1/4 bg-white shadow-md rounded-lg p-4">
                    <ul className="space-y-6">
                        <li
                            className={`font-semibold flex items-center text-center gap-2 cursor-pointer ${
                                activeTab === "giới thiệu"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("giới thiệu")}
                        >
                            <i className="fas fa-user"></i> Giới thiệu
                        </li>
                        <li
                            className={`font-semibold flex items-center text-center gap-2 cursor-pointer ${
                                activeTab === "phương thức thanh toán"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("phương thức thanh toán")}
                        >
                            <i className="fas fa-credit-card"></i> Phương thức thanh toán
                        </li>
                        <li
                            className={`font-semibold flex items-center text-center gap-2 cursor-pointer ${
                                activeTab === "cài đặt thông báo"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("cài đặt thông báo")}
                        >
                            <i className="fas fa-bell"></i> Cài đặt thông báo
                        </li>
                        <li
                            className={`font-semibold flex items-center text-center gap-2 cursor-pointer ${
                                activeTab === "hoạt động đăng nhập"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("hoạt động đăng nhập")}
                        >
                            <i className="fas fa-clock"></i> Hoạt động đăng nhập
                        </li>
                        <li
                            className={`font-semibold flex items-center text-center gap-2 cursor-pointer ${
                                activeTab === "đổi mật khẩu"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("đổi mật khẩu")}
                        >
                            <i className="fas fa-lock"></i> Đổi mật khẩu
                        </li>
                        <li
                            className={`font-semibold flex items-center text-center gap-2 cursor-pointer ${
                                activeTab === "kết nối mạng xã hội"
                                    ? "text-blue-400 border border-blue-400"
                                    : "text-gray-600 hover:text-blue-600"
                            }`}
                            onClick={() => setActiveTab("kết nối mạng xã hội")}
                        >
                            <i className="fas fa-share-alt"></i> Kết nối mạng xã hội
                        </li>
                    </ul>
                </div>

                {/* Content */}
                <div className="content w-3/4 p-6">{renderContent()}</div>
            </div>
        </AdminLayout>
    );
};

export default SettingPage;
