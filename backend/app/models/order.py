from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float,func
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.base import Base

class Order(Base):
    __tablename__ = "order"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("account.id"), nullable=False)  # Liên kết với Account
    cart_id = Column(Integer, ForeignKey("cart.id"), nullable=False)  # Liên kết với Cart
    total_price = Column(Integer, nullable=False)  # Tổng giá trị đơn hàng
    status = Column(String, nullable=False, default="Chờ giao hàng")  # Trạng thái đơn hàng (Pending, Paid, Shipped, Delivered, etc.)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)

    # Relationships
    account = relationship("Account", back_populates="orders")  # Liên kết với Account
    cart = relationship("Cart")  # Liên kết với Cart
    payment = relationship("Payment", back_populates="order")  # Liên kết với Payment
    shipping = relationship("Shipping", back_populates="order")  # Liên kết với Shipping
    items = relationship("OrderItem", back_populates="order")
