import React, { useState, useContext } from "react";
import { CartContext } from "../ShopPage/ListProducts/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./FloatingCart.css";

const FloatingCart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate(); // Dùng để chuyển hướng

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  // Tính tổng giá tiền
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Hàm xử lý khi nhấn nút Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add some products.");
      return;
    }
    navigate("/checkout"); // Chuyển hướng đến trang Checkout
  };

  return (
    <div className="floating-cart-container">
      <button className="floating-cart-icon" onClick={toggleCart}>
        🛒
        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
      </button>
      {showCart && (
        <div className="cart-popup">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    <img src={item.image} alt={item.name} width="50" />
                    <p>{item.name}</p>
                    <p>Price: {item.price.toLocaleString()} VND</p>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    />
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <p>Total Price: {calculateTotalPrice().toLocaleString()} VND</p>
              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingCart;
