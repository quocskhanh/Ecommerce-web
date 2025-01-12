from pydantic import BaseModel
from typing import List, Optional


# Schema cho Cart (giỏ hàng)
class CartBase(BaseModel):
    user_id: int


class CartCreate(CartBase):
    pass


class CartUpdate(BaseModel):
    user_id: Optional[int]  # Có thể cho phép cập nhật `user_id` nếu cần


class CartResponse(BaseModel):
    id: int
    account_id: int
    

    class Config:
        from_attributes = True