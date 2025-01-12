from sqlalchemy.orm import Session
from app.models.order import Order
from app.schemas.order import OrderCreate, OrderUpdate
from app.db.crud.cart import get_cart_by_account
from app.models.cart_item import CartItem

def create_order(db: Session, order: OrderCreate, account_id: int):
    """
    Tạo đơn hàng mới cho tài khoản hiện tại.
    """
    if order.status not in ["Chưa thanh toán", "Đã thanh toán"]:
        raise ValueError("Trạng thái phải là 'Chưa thanh toán' hoặc 'Đã thanh toán'")
    
    cart = get_cart_by_account(db, account_id)
    chosen_items = [item for item in cart.cart_items]
    if not cart:
        raise ValueError("Không tìm thấy giỏ hàng cho tài khoản này")
    total_price = sum(item.quantity * item.price_per_item for item in chosen_items)

    new_order = Order(
        account_id=account_id,
        cart_id=cart.id,
        total_price=total_price,
        status=order.status,
        #shipping_id=order.shipping_id
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    # Reset trạng thái is_chosen về False sau khi tạo đơn hàng
    for item in chosen_items:
        item.is_chosen = False
    db.commit()

    return new_order

def get_order_by_id(db: Session, order_id: int):
    """
    Lấy đơn hàng theo ID.
    """
    return db.query(Order).filter(Order.id == order_id).first()


def get_orders_by_account(db: Session, account_id: int):
    """
    Lấy tất cả các đơn hàng của tài khoản.
    """
    return db.query(Order).filter(Order.account_id == account_id).all()


def update_order(db: Session, order_id: int, order_update: OrderUpdate):
    """
    Cập nhật thông tin đơn hàng.
    """
    order = get_order_by_id(db, order_id)
    if not order:
        raise ValueError("Không tìm thấy đơn hàng")
    
    update_data = order_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(order, key, value)
    
    db.commit()
    db.refresh(order)
    return order


def delete_order(db: Session, order_id: int):
    """
    Xóa đơn hàng theo ID.
    """
    order = get_order_by_id(db, order_id)
    if not order:
        raise ValueError("Không tìm thấy đơn hàng")
    
    db.delete(order)
    db.commit()
    return order
