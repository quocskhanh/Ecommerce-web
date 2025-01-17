import React from "react";
import "./CheckOutForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CheckoutForm({ chosenItems, totalPrice, cartId, onOrderSuccess }) {
  
  const navigate = useNavigate()
  
  const handlePayNow = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const headers = { Authorization: `Bearer ${token}` };

      // Gửi yêu cầu tạo đơn hàng
      const response = await axios.post(
        "https://testbe-1.onrender.com/orders/",
        {
          cart_id: cartId, 
          total_price: totalPrice,
          status: "Đã thanh toán", 
        },
        { headers }
      );

      console.log("Order created:", response.data);

      // Gọi callback khi đặt hàng thành công
      onOrderSuccess();

      alert("Order placed successfully!");

      navigate("/account")
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
      alert("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form">
        <h2>Contact</h2>
        <div className="form-group">
          <input type="email" placeholder="Email Address" />
        </div>

        <h2>Delivery</h2>
        <div className="form-group">
          <select>
            <option>Country / Region</option>
            <option>United States</option>
            <option>Canada</option>
            <option>Vietnam</option>
          </select>
          <div className="name-fields">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <input type="text" placeholder="Address" />
          <div className="city-postal">
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Postal Code" />
          </div>
        </div>

        <h2>Payment</h2>
        <div className="form-group">
          <select>
            <option>Credit Card</option>
            <option>PayPal</option>
          </select>
          <input type="text" placeholder="Card Number" />
          <div className="card-details">
            <input type="text" placeholder="Expiration Date" />
            <input type="text" placeholder="Security Code" />
          </div>
          <input type="text" placeholder="Card Holder Name" />
        </div>

        <button className="pay-now" onClick={handlePayNow}>
          Pay Now
        </button>
        <footer>
          <p>Copyright © 2022 FASCO. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default CheckoutForm;
