from sqlalchemy import Column, Integer, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.models.base import Base

class OrderItem(Base):
    __tablename__ = "order_item"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("order.id", ondelete="CASCADE"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    price_per_item = Column(Float, nullable=False)

    order = relationship("Order", back_populates="items")
    product = relationship("Product")
