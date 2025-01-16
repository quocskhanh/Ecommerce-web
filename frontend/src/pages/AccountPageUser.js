import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../components/ShopPage/ListProducts/CartContext";
import axios from "axios";

const AccountPageUser = () => {
    const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null); // Dùng để lưu trữ chi tiết sản phẩm trong đơn hàng
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await axios.get("https://testbe-1.onrender.com/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    const fetchUserOrders = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const ordersResponse = await axios.get("https://testbe-1.onrender.com/orders/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchUserInfo();
    fetchUserOrders();
  }, []);

  const fetchOrderDetails = async (cartId) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    setLoading(true); // Khi gọi API thì bắt đầu loading

    try {
      // Lấy tất cả cart items dựa trên cart_id
      const cartItemsResponse = await axios.get(`https://testbe-1.onrender.com/cart_items/me?cart_id=${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const cartItems = cartItemsResponse.data;
      const productDetails = [];

      // Duyệt qua các cart items và lấy chi tiết sản phẩm nếu is_chosen là true
      for (let item of cartItems) {
        if (item.is_chosen) {
          const productResponse = await axios.get(`https://testbe-1.onrender.com/products/${item.product_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          productDetails.push({ ...productResponse.data, quantity: item.quantity });
        }
      }

      // Lưu chi tiết sản phẩm vào state
      setOrderDetails(productDetails);
      setLoading(false); // Kết thúc loading
    } catch (error) {
      console.error("Error fetching order details:", error);
      setLoading(false); // Kết thúc loading nếu có lỗi
    }
  };

  const handleOrderClick = (order) => {
    fetchOrderDetails(order.cart_id); // Khi nhấn "View Details", lấy chi tiết đơn hàng theo cart_id
  };

  return (
    <div className="account-page">
      <h1>Thông tin cá nhân</h1>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Phone Number: {userInfo.phone_number}</p>

      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{new Date(order.created_at).toLocaleDateString()}</td>
              <td>{order.total_price.toLocaleString()} VND</td>
              <td>{order.status}</td>
              <td>
                <button onClick={() => handleOrderClick(order)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orderDetails && !loading && (
        <div>
          <h3>Order Details</h3>
          {orderDetails.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>
                      <img src={product.image || "placeholder.jpg"} alt={product.name} width="50" />
                    </td>
                    <td>{product.quantity}</td>
                    <td>{(product.price * product.quantity).toLocaleString()} VND</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products found in this order.</p>
          )}
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default AccountPageUser;
