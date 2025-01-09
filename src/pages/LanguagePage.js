import React from "react";
import LayoutDashboard from "../layout/LayoutDashboard";

const languages = [
    { code: "zh", name: "中文 (Trung Quốc)", image: "/china.png" },
    { code: "ru", name: "Русский (Nga)", image: "/nga.jpeg" },
    { code: "en", name: "English (Anh)", image: "/anh.jpg" },
    { code: "vi", name: "Tiếng Việt (Việt Nam)", image: "/VN.png" },
    { code: "es", name: "Español (Tây Ban Nha)", image: "/tbn.png" },
    { code: "pt", name: "Português (Bồ Đào Nha)", image: "/bdn.png" },
    { code: "fr", name: "Français (Pháp)", image: "/phap.jpg" },
];

const LanguagePage = () => {
    const handleLanguageSelect = (language) => {
        alert(`Bạn đã chọn ngôn ngữ: ${language.name}`);
    };

    return (
        <LayoutDashboard>
            <div className="min-h-screen bg-gray-50 py-10 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-8 text-gray-800">Chọn Ngôn Ngữ</h1>
                    <p className="text-gray-600 mb-12 text-lg">
                        Vui lòng chọn một ngôn ngữ phù hợp để trải nghiệm ứng dụng.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {languages.map((language) => (
                            <div
                                key={language.code}
                                className="group flex flex-col items-center bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition-all duration-300 hover:bg-blue-500"
                                onClick={() => handleLanguageSelect(language)}
                            >
                                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-gray-200 group-hover:border-white">
                                    <img
                                        src={language.image}
                                        alt={language.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <span className="text-base font-medium text-gray-700 group-hover:text-white">
                  {language.name}
                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default LanguagePage;
