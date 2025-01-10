import React from "react";
import LayoutDashboard from "../layout/LayoutDashboard";
import { useNavigate } from "react-router-dom";

const categories = [
    { id: "menclothes", name: "Men Clothes", items: 24, image: "https://360.com.vn/wp-content/uploads/2023/11/ANHTK407-APTTK403-QGNTK407-2-Custom.jpg" },
    { id: "womenclothes", name: "Women Clothes", items: 12, image: "https://media.istockphoto.com/id/916092484/photo/women-clothes-hanging-on-hangers-clothing-rails-fashion-design.jpg?s=612x612&w=0&k=20&c=fUpcbOITkQqitglZfgJkWO3py-jsbuhc8eZfb4sdrfE=" },
    { id: "accessories", name: "Accessories", items: 43, image: "https://product.hstatic.net/1000104930/product/n-30864m-10_02056484010148cabb6eb48eee20a82e.jpg" },
    { id: "cottonclothes", name: "Cotton Clothes", items: 31, image: "https://pomp.store/cdn/shop/articles/znz92h1hor8cdjtqx1cftqeriu6swbs95bqw0f968ck9ujbz_3.jpg?v=1676547961&width=1500" },
    { id: "summerclothes", name: "Summer Clothes", items: 26, image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyhqx3o2grs17b" },
    { id: "weddingclothes", name: "Wedding Clothes", items: 52, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwDYsyP0tv4Vf5RDDQKBGdahNXx1wzqpSoNA&s" },
    { id: "springcollect", name: "Spring Collection", items: 24, image: "https://hoaigiangshop.com/wp-content/uploads/2017/10/ao-dai-nu-mau-do-ve-hoa-tiet-mua-xuan.jpg" },
    { id: "casualclothes", name: "Casual Clothes", items: 52, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7N9lgie7KH1WPKZZocZwbchE89yOA4zg08w&s" },
    { id: "hats", name: "Hats", items: 26, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2YOC9gy9NhVPy8wm7dsGGzCzsA38ivngvhA&s" },
];

const CategoriesPage = () => {
    const navigate = useNavigate();

    return (
        <LayoutDashboard>
            <div className="p-6 overflow-y-auto h-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        + Add Category
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="relative bg-white shadow-md rounded-lg overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                        >
                            <div
                                className="h-40 bg-cover bg-center"
                                style={{ backgroundImage: `url(${category.image})` }}
                            ></div>
                            <div className="p-4">
                                <h2 className="text-lg font-medium text-gray-800">
                                    {category.name}
                                </h2>
                                <p className="text-gray-500">{category.items} items</p>
                            </div>
                            {/* Hiệu ứng nút Edit */}
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <div
                                    className="absolute inset-0 bg-black-400 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                    <button
                                        onClick={() => navigate(`/categories/${category.id}`)}
                                        className="flex items-center space-x-2 text-blue-600 bg-white px-4 py-2 rounded-md shadow-md hover:bg-blue-500 hover:text-white transition duration-300"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                                        </svg>
                                        <span>Edit</span>
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default CategoriesPage;
