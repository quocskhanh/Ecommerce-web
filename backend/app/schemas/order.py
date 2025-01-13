from pydantic import BaseModel
from typing import Optional




# Schema cho Order Request (khi tạo hoặc cập nhật đơn hàng)
class OrderCreate(BaseModel):
    status: Optional[str] = "Chưa thanh toán"


class OrderUpdate(BaseModel):
    status: Optional[str] = None
    


# Schema cho Order Response
class OrderResponse(BaseModel):
    id: int
    account_id: int
    cart_id: int
    total_price: float
    status: str
    #shipping_id: int   # Thêm thông tin vận chuyển

    class Config:
        from_attributes = True
