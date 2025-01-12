from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON,DateTime,Float
from sqlalchemy.orm import relationship
from app.db.database import Base
class CartItem(Base):
    __tablename__ = "cart_item"

    id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(Integer, ForeignKey("cart.id"), nullable=False)  # Liên kết với Cart
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)  # Liên kết với Product
    quantity = Column(Integer, nullable=False, default=1)  # Số lượng sản phẩm
    price_per_item = Column(Integer, nullable=False)  # Giá tại thời điểm thêm vào giỏ

    # Relationships
    cart = relationship("Cart", back_populates="cart_items")  # Quan hệ với Cart
    product = relationship("Product")  # Quan hệ với Product
