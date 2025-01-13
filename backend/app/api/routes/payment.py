from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models.account import Account
from app.schemas.payment import PaymentCreate, PaymentResponse, PaymentUpdate
from app.db.crud.payment import (
    create_payment,
    get_payment_by_id,
    get_payment_by_order_id,
    update_payment,
    delete_payment,
)
from app.api.authentication import get_current_user

router = APIRouter(prefix="/payments", tags=["payments"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=PaymentResponse)
def create_new_payment(payment: PaymentCreate, db: Session = Depends(get_db), current_user: Account = Depends(get_current_user)):
    """
    Tạo thanh toán mới.
    """
    try:
        new_payment = create_payment(db, payment)
        return new_payment
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/{payment_id}", response_model=PaymentResponse)
def get_payment(payment_id: int, db: Session = Depends(get_db), current_user: Account = Depends(get_current_user)):
    """
    Lấy thông tin thanh toán theo ID.
    """
    payment = get_payment_by_id(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment


@router.put("/{payment_id}", response_model=PaymentResponse)
def update_existing_payment(payment_id: int, payment_update: PaymentUpdate, db: Session = Depends(get_db), current_user: Account = Depends(get_current_user)):
    """
    Cập nhật thông tin thanh toán.
    """
    payment = update_payment(db, payment_id, payment_update)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return payment


@router.delete("/{payment_id}")
def delete_payment(payment_id: int, db: Session = Depends(get_db), current_user: Account = Depends(get_current_user)):
    """
    Xóa thanh toán.
    """
    payment = delete_payment(db, payment_id)
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment deleted successfully"}
