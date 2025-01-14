from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.models.base import Base

class Category(Base):
    __tablename__ = "category"  # Tên bảng trong cơ sở dữ liệu

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    is_deleted = Column(Boolean, default=False)
    image = Column(String, nullable=True)  # URL hoặc path của ảnh

    
    products = relationship("Product", back_populates="category")
