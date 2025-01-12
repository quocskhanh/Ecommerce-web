from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON,DateTime,Float
from sqlalchemy.orm import relationship
from app.db.database import Base
class Payment(Base):
    __tablename__ = "payment"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)
    payment_status = Column(String, nullable=False, default="pending")
    payment_method = Column(String, nullable=False)
    amount = Column(Float, nullable=False)

    order = relationship("Order", back_populates="payment")
