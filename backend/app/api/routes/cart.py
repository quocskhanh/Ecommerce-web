from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.cart import CartCreate, CartUpdate, CartResponse
from app.db.crud.cart import (
    get_cart_by_account,
    create_cart,
    delete_cart,
)
from app.api.authentication import get_current_user
from app.db.database import SessionLocal
from app.models.account import Account
router = APIRouter(prefix="/carts", tags=["carts"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/me", response_model=CartResponse)
def get_user_cart(
    db: Session = Depends(get_db),
    current_user: Account=Depends(get_current_user)
):
    cart = get_cart_by_account(db, account_id=current_user.id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
    return cart



@router.post("/me", response_model=CartResponse)
def create_user_cart(
    db: Session = Depends(get_db),
    current_user: Account=Depends(get_current_user)
):
    try:
        cart = create_cart(db, account_id=current_user.id)
        return cart
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/me")
def delete_user_cart(
    db: Session = Depends(get_db),
    current_user: Account=Depends(get_current_user)
):
    try:
        delete_cart(db, account_id=current_user.id)
        return {"message": "Cart deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
