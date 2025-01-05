import React from "react";
import { useCart } from "./CartContext";

const Cart = () => {
    const { cart, removeFromCart, calculateTotal } = useCart();

    return (
        <div className="cart">
            <h2>Giỏ hàng</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.quantity} x {item.price.toLocaleString()} VND
                        <button onClick={() => removeFromCart(item.id)}>Xóa</button>
                    </li>
                ))}
            </ul>
            <p>Tổng tiền: {calculateTotal().toLocaleString()} VND</p>
        </div>
    );
};

export default Cart;
