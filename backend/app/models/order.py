from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Order(Base):
    __tablename__ = "order"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("account.id"), nullable=False)  # Liên kết với Account
    cart_id = Column(Integer, ForeignKey("cart.id"), nullable=False)  # Liên kết với Cart
    total_price = Column(Integer, nullable=False)  # Tổng giá trị đơn hàng
    status = Column(String, nullable=False, default="Chưa thanh toán")  # Trạng thái đơn hàng (Pending, Paid, Shipped, Delivered, etc.)


    # Relationships
    account = relationship("Account", back_populates="orders")  # Liên kết với Account
    cart = relationship("Cart")  # Liên kết với Cart
    payment = relationship("Payment", back_populates="order")  # Liên kết với Payment
    shipping = relationship("Shipping", back_populates="order")  # Liên kết với Shipping
