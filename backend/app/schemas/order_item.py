from pydantic import BaseModel

class OrderItemResponse(BaseModel):
    id: int
    order_id: int
    product_id: int
    quantity: int
    price_per_item: float

    class Config:
        orm_mode = True
