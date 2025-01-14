import React, { useContext } from "react";
import CheckoutForm from "../components/CheckOut/MainCheckOut";
import { CartContext } from "../components/ShopPage/ListProducts/CartContext"; // Đảm bảo import đúng
import "../components/CheckOut/CheckOutPage.css";
import Header from "../components/ShopPage/Header/Header";
import Subscribe from "../components/ShopPage/Subscribe/Subscribe";
import Footer from "../components/ShopPage/Footer/Footer";

function CheckOutPage() {
  const { cart } = useContext(CartContext); // Lấy giỏ hàng từ context

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="checkout-page-container">

      <Header />
        <div className="checkout-main-content">
        <div className="checkout-form-container">
        <CheckoutForm />
      </div>

      <div className="checkout-cart-summary">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="cart-summary-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-summary-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <p>{item.name}</p>
                  <p>
                    {item.quantity} x {item.price.toLocaleString()} VND
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-summary-total">
          <p>Total:</p>
          <p>{calculateTotalPrice().toLocaleString()} VND</p>
        </div>
      </div>
        </div>
      
        <Subscribe />
        <hr></hr>
        <Footer />

    </div>
  );
}

export default CheckOutPage;
