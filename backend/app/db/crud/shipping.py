from sqlalchemy.orm import Session
from app.models.shipping import Shipping
from app.schemas.shipping import *


def create_shipping(db: Session, shipping_data: ShippingCreate, address:str):
    new_shipping = Shipping(order_id = shipping_data.order_id, address = address)
    db.add(new_shipping)
    db.commit()
    db.refresh(new_shipping)
    return new_shipping


def get_shipping_by_order(db: Session, order_id: int):
    return db.query(Shipping).filter(Shipping.order_id == order_id).first()


def update_shipping(db: Session, shipping_id: int, shipping_update: ShippingUpdate):
    shipping = db.query(Shipping).filter(Shipping.id == shipping_id).first()
    if not shipping:
        return None
    update_data = shipping_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(shipping, key, value)
    db.commit()
    db.refresh(shipping)
    return shipping
