from sqlalchemy.orm import Session
from app.models.cart import Cart
from app.schemas.cart import CartCreate, CartUpdate


def get_cart_by_account(db: Session, account_id: int):
    return db.query(Cart).filter(Cart.account_id == account_id).first()


def create_cart(db: Session, account_id: int):
    # Kiểm tra nếu tài khoản đã có giỏ hàng
    existing_cart = db.query(Cart).filter(Cart.account_id == account_id).first()
    if existing_cart:
        raise ValueError("This account already has a cart.")
    
    # Tạo giỏ hàng mới
    new_cart = Cart(account_id=account_id)
    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)
    return new_cart





def delete_cart(db: Session, account_id: int):
    cart = db.query(Cart).filter(Cart.account_id == account_id).first()
    if not cart:
        raise ValueError("Cart not found.")
    db.delete(cart)
    db.commit()
