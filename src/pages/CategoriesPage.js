import React from "react";
import LayoutDashboard from "../layout/LayoutDashboard";

const categories = [
    { id: 1, name: "Men Clothes", items: 24, image: "https://360.com.vn/wp-content/uploads/2023/11/ANHTK407-APTTK403-QGNTK407-2-Custom.jpg" },
    { id: 2, name: "Women Clothes", items: 12, image: "https://media.istockphoto.com/id/916092484/photo/women-clothes-hanging-on-hangers-clothing-rails-fashion-design.jpg?s=612x612&w=0&k=20&c=fUpcbOITkQqitglZfgJkWO3py-jsbuhc8eZfb4sdrfE=" },
    { id: 3, name: "Accessories", items: 43, image: "https://product.hstatic.net/1000104930/product/n-30864m-10_02056484010148cabb6eb48eee20a82e.jpg" },
    { id: 4, name: "Cotton Clothes", items: 31, image: "https://pomp.store/cdn/shop/articles/znz92h1hor8cdjtqx1cftqeriu6swbs95bqw0f968ck9ujbz_3.jpg?v=1676547961&width=1500" },
    { id: 5, name: "Summer Clothes", items: 26, image: "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lyhqx3o2grs17b" },
    { id: 6, name: "Wedding Clothes", items: 52, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwDYsyP0tv4Vf5RDDQKBGdahNXx1wzqpSoNA&s" },
    { id: 7, name: "Spring Collection", items: 24, image: "https://hoaigiangshop.com/wp-content/uploads/2017/10/ao-dai-nu-mau-do-ve-hoa-tiet-mua-xuan.jpg" },
    { id: 8, name: "Casual Clothes", items: 52, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7N9lgie7KH1WPKZZocZwbchE89yOA4zg08w&s" },
    { id: 9, name: "Hats", items: 26, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2YOC9gy9NhVPy8wm7dsGGzCzsA38ivngvhA&s" },
];

const CategoriesPage = () => {
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
                            className="bg-white shadow-md rounded-lg overflow-hidden"
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
                        </div>
                    ))}
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default CategoriesPage;
