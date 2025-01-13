from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ShippingBase(BaseModel):
    address: str
    status: Optional[str] = "Chờ lấy hàng"
    shipped_at: Optional[datetime] = None
    delivered_at: Optional[datetime] = None


class ShippingCreate(BaseModel):
    order_id: int


class ShippingUpdate(BaseModel):
    status: Optional[str] = None
    


class ShippingResponse(ShippingBase):
    id: int
    order_id: int

    class Config:
        from_attributes = True
