import React from "react";

const ProgressCard = ({ title, value, progress }) => {
    // Tính phần trăm từ progress nếu đúng định dạng "x/y"
    const [current, total] = progress.split("/").map(Number);
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return (
        <div className="p-6 bg-white rounded shadow flex justify-between items-center">
            <div>
                <h4 className="text-lg font-semibold mb-2">{title}</h4>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            <div className="relative w-20 h-20">
                {/* Background vòng tròn */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                {/* Vòng tròn progress (hiển thị tỷ lệ phần trăm) */}
                <div
                    className="absolute inset-0 rounded-full border-4 border-yellow-500"
                    style={{
                        clipPath: `polygon(50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${100 - percentage}%, 50% ${100 - percentage}%)`,
                    }}
                ></div>
                {/* Hiển thị text progress ở giữa */}
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                    {`${current}/${total}`}
                </div>
            </div>
        </div>
    );
};

export default ProgressCard;
