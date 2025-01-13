from pydantic import BaseModel
from typing import List, Optional

# Base schema
class ProductBase(BaseModel):
    name: str
    price: int  
    description: str
    category_id: int
    status: str
    colors: List[str]
    sizes: List[str]
    image: Optional[str] = None

# Schema để tạo sản phẩm mới
class ProductCreate(ProductBase):
    pass

# Schema để cập nhật sản phẩm
class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    description: Optional[str] = None
    category_id: Optional[int] = None
    status: Optional[str] = None
    colors: Optional[List[str]] = None
    sizes: Optional[List[str]] = None
    image: Optional[str] = None

# Schema để trả về thông tin sản phẩm
class ProductResponse(ProductBase):
    id: int
    

    class Config:
        from_attributes = True  # Để chuyển đổi từ SQLAlchemy model sang Pydantic schema
