from pydantic import BaseModel
from typing import Optional

class CategoryBase(BaseModel):
    name: str
    

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass
    
class CategoryResponse(CategoryBase):
    id: int
    
    class Config:
        from_attributes = True  # Cho phép chuyển đổi từ SQLAlchemy model sang Pydantic schema