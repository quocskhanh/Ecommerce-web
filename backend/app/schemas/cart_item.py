from pydantic import BaseModel
from typing import List, Optional


# Schema cho Cart (giỏ hàng)
class CartItemBase(BaseModel):
    cart_id: int
    product_id: int
    quantity: int
    price_per_item: int


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    quantity: int


class CartItemResponse(CartItemBase):
    id: int
    
    class Config:
        from_attributes = True