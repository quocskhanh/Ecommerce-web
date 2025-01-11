from sqlalchemy import Column, Integer, String, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.db.database import Base

class Product(Base):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(Text, nullable=True)
    category_id = Column(Integer, ForeignKey("category.id"), nullable=False)
    status = Column(String, nullable=False)
    colors = Column(JSON, nullable=False)  # Lưu danh sách các màu
    sizes = Column(JSON, nullable=False)   # Lưu danh sách các kích thước
    
    # Thiết lập mối quan hệ với bảng Category
    category = relationship("Category", back_populates="products")
