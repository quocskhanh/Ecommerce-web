from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON,DateTime,Float
from sqlalchemy.orm import relationship
from app.db.database import Base
class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)  # Liên kết với Order
    method = Column(String, nullable=False)  # Phương thức thanh toán (Credit Card, PayPal, Cash, etc.)
    amount = Column(Float, nullable=False)  # Số tiền đã thanh toán
    status = Column(String, nullable=False, default="Đang chờ")  # Trạng thái thanh toán (Pending, Completed, Failed)
    transaction_id = Column(String, unique=True, nullable=True)  # ID giao dịch thanh toán
    paid_at = Column(DateTime, nullable=True)  # Thời gian thanh toán

    # Relationships
    order = relationship("Order", back_populates="payments")  # Liên kết với Order

