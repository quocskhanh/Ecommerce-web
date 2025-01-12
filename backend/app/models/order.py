from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON,DateTime,Float
from sqlalchemy.orm import relationship
from app.db.database import Base
class Order(Base):
    __tablename__ = "order"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("account.id"), nullable=False)
    status = Column(String, nullable=False, default="Đang chờ")
    total_price = Column(Float, nullable=False)
    payment_method = Column(String, nullable=False)

    user = relationship("Account", back_populates="orders")
    order_items = relationship("OrderItem", back_populates="order")
