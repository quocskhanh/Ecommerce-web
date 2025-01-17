import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AccountPageUser = () => {
  const [userInfo, setUserInfo] = useState({});
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null); // Lưu trữ chi tiết sản phẩm trong đơn hàng
  const [loading, setLoading] = useState(false);

  // Lấy thông tin người dùng và danh sách đơn hàng khi trang được tải
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await axios.get("https://testbe-1.onrender.com/accounts/me", {
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
        const response = await axios.get("https://testbe-1.onrender.com/orders/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        console.log("Orders Data:", response.data); // Gỡ lỗi
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    

    fetchUserInfo();
    fetchUserOrders();
  }, []);

  // Lấy chi tiết đơn hàng theo `cart_id`
  const fetchOrderDetails = async (orderId, cartId) => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
  
    setOrderDetails(null); // Xóa dữ liệu cũ trước khi gọi API mới
    setLoading(true);
  
    try {
      console.log(`Fetching cart items for order ID: ${orderId}, cart ID: ${cartId}`); // Gỡ lỗi
  
      // Kiểm tra nếu `cartId` bị undefined
      if (!cartId) {
        console.error("Cart ID is undefined.");
        setLoading(false);
        return;
      }
  
      const cartItemsResponse = await axios.get(
        `https://testbe-1.onrender.com/cart_items/me?cart_id=${cartId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      let cartItems = cartItemsResponse.data;
  
      // Lọc các sản phẩm được chọn
      cartItems = cartItems.filter(
        (item) => item.is_chosen && item.order_id === orderId
      );
  
      if (cartItems.length === 0) {
        console.log("No chosen items found in this cart for the given order.");
        setOrderDetails([]);
        setLoading(false);
        return;
      }
  
      console.log("Filtered Cart Items:", cartItems);
  
      const productDetails = [];
  
      // Lấy thông tin chi tiết sản phẩm từ product_id
      for (let item of cartItems) {
        const productResponse = await axios.get(
          `https://testbe-1.onrender.com/products/${item.product_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        productDetails.push({
          ...productResponse.data,
          quantity: item.quantity,
          price_per_item: item.price_per_item,
        });
      }
  
      // Cập nhật chi tiết sản phẩm
      setOrderDetails(productDetails);
    } catch (error) {
      console.error("Error fetching cart items or product details:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Xử lý khi nhấn "View Details"
  const handleOrderClick = (order) => {
    if (!order.cart_id) {
      console.error(`Cart ID is undefined for order ID: ${order.id}`);
      return;
    }
    fetchOrderDetails(order.id, order.cart_id);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload(); // Tải lại trang
  };

  return (
    <div className="account-page">
      <h1>Thông tin cá nhân</h1>
      <p>Name: {userInfo.last_name || "N/A"}</p>
      <p>Email: {userInfo.email || "N/A"}</p>
      <p>Phone Number: {userInfo.phone_number || "N/A"}</p>
      <button onClick={handleLogout} className="logout-button">
      <Link to = "/">Logout</Link>
      </button>

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
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>{order.total_price.toLocaleString()} VND</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleOrderClick(order)}>View Details</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {loading && <p>Loading...</p>}

      {orderDetails && orderDetails.length > 0 ? (
        <div>
          <h3>Order Details</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price per Item</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>
                    <img
                      src={product.image || "placeholder.jpg"}
                      alt={product.name || "No Image"}
                      width="50"
                    />
                  </td>
                  <td>{product.quantity}</td>
                  <td>{product.price_per_item.toLocaleString()} VND</td>
                  <td>{(product.price_per_item * product.quantity).toLocaleString()} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No products found in this order.</p>
      )}
    </div>
  );
};

export default AccountPageUser;