from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.models.base import Base

class Product(Base):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True, index=True,server_default="nextval('product_id_seq'::regclass')")
    name = Column(String(255), nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(Text, nullable=True)
    category_id = Column(Integer, ForeignKey("category.id"), nullable=False)
    status = Column(String, nullable=False)
    colors = Column(JSON, nullable=False)  # Lưu danh sách các màu
    sizes = Column(JSON, nullable=False)   # Lưu danh sách các kích thước
    image = Column(String, nullable=True)  # URL hoặc path của ảnh

    
    # Thiết lập mối quan hệ với bảng Category
    category = relationship("Category", back_populates="products")
