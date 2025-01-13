from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PaymentBase(BaseModel):
    method: str
    status: Optional[str] = "Chưa thanh toán"


class PaymentCreate(PaymentBase):
    order_id: int


class PaymentUpdate(BaseModel):
    status: Optional[str] = None



class PaymentResponse(PaymentBase):
    id: int
    order_id: int
    paid_at: Optional[datetime]

    class Config:
        from_attributes = True
