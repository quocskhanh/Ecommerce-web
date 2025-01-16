from sqlalchemy.orm import Session
from app.models.payment import Payment
from app.schemas.payment import PaymentCreate, PaymentUpdate
from datetime import datetime   
from app.models.order import Order
from app.models.account import Account
from app.db.crud.order import get_order_by_id
def create_payment(db: Session, payment_data: PaymentCreate):
    """
    Tạo một thanh toán mới.
    """
    order = get_order_by_id(db, payment_data.order_id)
    if not order:
        raise ValueError("Order không tồn tại.")

    # Kiểm tra xem đã có thanh toán nào cho đơn hàng này chưa
    existing_payment = db.query(Payment).filter(Payment.order_id == payment_data.order_id).first()
    if existing_payment:
        raise ValueError("Đơn hàng đã có thanh toán.")
    new_payment = Payment(
        order_id=payment_data.order_id,
        method=payment_data.method,
        status=payment_data.status,
        amount=order.total_price,
    )
    if payment_data.status == "Đã thanh toán":
        new_payment.paid_at = datetime.utcnow()
        order.status = "Đã thanh toán"
        order.account.total_spent += order.total_price
    db.add(new_payment)
    db.commit()
    db.refresh(new_payment)
    return new_payment


def get_payment_by_id(db: Session, payment_id: int):
    """
    Lấy thông tin thanh toán theo ID.
    """
    return db.query(Payment).filter(Payment.id == payment_id).first()


def get_payment_by_order_id(db: Session, order_id: int):
    """
    Lấy thông tin thanh toán theo Order ID.
    """
    return db.query(Payment).filter(Payment.order_id == order_id).first()


def update_payment(db: Session, payment_id: int, payment_update: PaymentUpdate):
    """
    Cập nhật thông tin thanh toán.
    """
    payment = get_payment_by_id(db, payment_id)
    if not payment:
        return None

    update_data = payment_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(payment, key, value)

    if payment_update.status == "Đã thanh toán" and not payment.paid_at:
        payment.paid_at = datetime.utcnow()
        order = payment.order
        order.status = "Đã thanh toán"
        order.account.total_spent += order.total_price

    db.commit()
    db.refresh(payment)
    return payment


def delete_payment(db: Session, payment_id: int):
    """
    Xóa thanh toán.
    """
    payment = get_payment_by_id(db, payment_id)
    if not payment:
        return None

    db.delete(payment)
    db.commit()
    return payment
