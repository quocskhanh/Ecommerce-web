from sqlalchemy.orm import Session
from app.models.cart_item import CartItem
from app.schemas.cart_item import *
from app.db.crud.cart import *
from app.db.crud.product import get_product_by_id
def get_cart_items(db:Session, cart_id:int):
    cart = db.query(Cart).filter(Cart.id == cart_id).first()
    if not cart:
        raise ValueError("Cart does not exist.")
    return db.query(CartItem).filter(CartItem.cart_id == cart_id).all()

def create_cart_items(db: Session, cart_id: int,  product_id : int):
    product = get_product_by_id(db, product_id)
    existing_cart_item = db.query(CartItem).filter(
        CartItem.cart_id == cart_id, CartItem.product_id == product_id
    ).first()
    if existing_cart_item:
        raise ValueError("This product already exists in the cart.")
    new_item = CartItem(cart_id = cart_id, product_id = product_id, price_per_item = product.price)
    db.add(new_item)
    db.commit()
    db.refresh(new_item)
    return new_item

def get_cart_item_by_id(db:Session, id: int):
    return db.query(CartItem).filter(CartItem.id == id).first()

def update_cart_item(db:Session, id:int, cart_item_update : CartItemUpdate):
    cart_item = get_cart_item_by_id(db,id)
    if not cart_item:
        raise ValueError("Cart item not found.")
    update_data = cart_item_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(cart_item, key, value)

    db.commit()
    db.refresh(cart_item)
    return cart_item

def delete_cart_item(db:Session, id:int):
    cart_item = get_cart_item_by_id(db,id)
    if not cart_item:
        raise ValueError("Cart item not found.")
    db.delete(cart_item)
    db.commit()
    return cart_item