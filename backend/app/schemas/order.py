from pydantic import BaseModel
from typing import Optional
from datetime import datetime




# Schema cho Order Request (khi tạo hoặc cập nhật đơn hàng)
class OrderCreate(BaseModel):
    pass


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    


# Schema cho Order Response
class OrderResponse(BaseModel):
    id: int
    account_id: int
    cart_id: int
    total_price: float
    status: str
    created_at:Optional[datetime]

    class Config:
        from_attributes = True
