from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Float
from sqlalchemy.orm import relationship
from app.db.database import Base

class Payment(Base):
    __tablename__ = "payment"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"), nullable=False, unique=True)
    method = Column(String, nullable=False)  # Phương thức thanh toán: "cash", "credit_card", "bank_transfer"
    status = Column(String, nullable=False, default="Pending")  # Trạng thái thanh toán: "Pending", "Paid", "Failed"
    amount = Column(Integer, nullable=False)  # Số tiền thanh toán
    paid_at = Column(DateTime, nullable=True)  # Ngày thanh toán

    # Relationship
    order = relationship("Order", back_populates="payment")