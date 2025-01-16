import React, { useEffect, useState, useContext } from "react";
import "./DetailProduct.css";
import { CartContext } from "./CartContext";
import axios from "axios";

const ProductDetail = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://testbe-1.onrender.com/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value) || 1); // Đảm bảo quantity >= 1
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product);
    alert("Sản phẩm đã được thêm vào giỏ hàng.");
  };

  if (loading) return <p>Đang tải sản phẩm...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Sản phẩm không tồn tại</p>;

  return (
    <div className="detail-product-container">
      <div className="detail-product-img">
        <img src={product.image || "placeholder.jpg"} alt={product.name} />
      </div>
      <div className="detail-product-content">
        <h2>{product.name}</h2>
        <p>Giá: {product.price.toLocaleString()} VND</p>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
        />
        <button onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
};


export default ProductDetail;
