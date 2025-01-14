from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.models.base import Base


class Shipping(Base):
    __tablename__ = "shipping"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"), unique=True, nullable=False)
    address = Column(String, nullable=False)
    status = Column(String, nullable=False, default="Chờ lấy hàng")  # 'Chờ lấy hàng', 'Đang vận chuyển', 'Đã vận chuyển'
    shipped_at = Column(DateTime, nullable=True) # bắt đầu ship
    delivered_at = Column(DateTime, nullable=True) # vận chuyển tới

    # Relationship
    order = relationship("Order", back_populates="shipping")
