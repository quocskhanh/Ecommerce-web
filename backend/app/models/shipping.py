from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON,DateTime,Float
from sqlalchemy.orm import relationship
from app.db.database import Base
class Shipping(Base):
    __tablename__ = "shipping"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id"), nullable=False)
    shipping_address = Column(String, nullable=False)
    shipping_status = Column(String, nullable=False, default="processing")
    shipping_method = Column(String, nullable=False)

    order = relationship("Order", back_populates="shipping")
