from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.cart_item import *
from app.db.crud.cart_item import *
from app.api.authentication import get_current_user
from app.db.database import SessionLocal
from app.models.account import Account
from app.db.crud.cart import get_cart_by_account

router = APIRouter(prefix="/cart_items", tags=["cart_items"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.get("/me", response_model=list[CartItemResponse])
def get_user_cart_items(db: Session=Depends(get_db), current_user: Account = Depends(get_current_user)):
    cart = get_cart_by_account(db, account_id=current_user.id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found.")
    
    cart_items = get_cart_items(db, cart_id=cart.id)
    return cart_items if cart_items else []

@router.post("/me", response_model=CartItemResponse)
def create_new_cart_item(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_user),
):
    # Lấy giỏ hàng của người dùng
    cart = get_cart_by_account(db, account_id=current_user.id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found.")
    
    # Thêm sản phẩm vào giỏ hàng
    try:
        cart_item = create_cart_items(db, cart_id=cart.id, product_id=product_id)
        return cart_item
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
@router.put("/me/{item_id}", response_model=CartItemResponse)
def update_cart_item_quantity_or_choosing(
    item_id: int,
    cart_item_update: CartItemUpdate,
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_user),
):
    cart_item = get_cart_item_by_id(db, item_id)
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found.")
    
    cart = get_cart_by_account(db, account_id=current_user.id)
    if not cart or cart.id != cart_item.cart_id:
        raise HTTPException(status_code=403, detail="Permission denied.")
    
    try:
        updated_item = update_cart_item(db, id=item_id, cart_item_update=cart_item_update)
        return updated_item
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/me", response_model=dict)
def delete_cart_item_from_cart(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_user),
):
    cart_item = get_cart_item_by_id(db, item_id)
    if not cart_item:
        raise HTTPException(status_code=404, detail="Cart item not found.")
    
    cart = get_cart_by_account(db, account_id=current_user.id)
    if not cart or cart.id != cart_item.cart_id:
        raise HTTPException(status_code=403, detail="Permission denied.")
    
    try:
        delete_cart_item(db, id=item_id)
        return {"message": "Cart item deleted successfully."}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))