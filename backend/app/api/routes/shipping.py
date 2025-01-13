from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.schemas.shipping import *
from app.db.crud.shipping import *
from app.api.authentication import get_current_user
from app.models.account import Account

router = APIRouter(prefix="/shippings", tags=["shippings"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/", response_model=ShippingResponse)
def create_new_shipping(shipping_data: ShippingCreate, db: Session = Depends(get_db), current_user: Account = Depends(get_current_user)):
    try:
        shipping = create_shipping(db, shipping_data, current_user.address)
        return shipping
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{order_id}", response_model=ShippingResponse)
def get_shipping(order_id: int, db: Session = Depends(get_db), current_user: Account = Depends(get_current_user)):
    shipping = get_shipping_by_order(db, order_id)
    if not shipping:
        raise HTTPException(status_code=404, detail="Shipping not found")
    return shipping


@router.put("/{shipping_id}", response_model=ShippingResponse)
def update_shipping_status(shipping_id: int, shipping_update: ShippingUpdate, db: Session = Depends(get_db), current_user: Account = Depends(get_current_user)):
    try:
        updated_shipping = update_shipping(db, shipping_id, shipping_update)
        if not updated_shipping:
            raise HTTPException(status_code=404, detail="Shipping not found")
        return updated_shipping
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))