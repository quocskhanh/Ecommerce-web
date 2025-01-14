from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.schemas.order import OrderCreate, OrderUpdate, OrderResponse
from app.db.crud.order import (
    create_order, get_order_by_id, update_order, delete_order, get_orders_by_account,get_orders
)
from app.api.authentication import get_current_user,get_current_admin_user
from app.db.database import SessionLocal
from app.models.account import Account
from app.models.order import Order
from sqlalchemy.sql import func
router = APIRouter(prefix="/orders", tags=["orders"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API: Lấy danh sách tài khoản
@router.get("/", response_model=list[OrderResponse])
def list_all_orders(db: Session = Depends(get_db), current_user: dict = Depends(get_current_admin_user)):
    """
    Chỉ Admin mới có thể lấy danh sách tài khoản.
    """
    return get_orders(db)

# Lấy danh sách đơn hàng của người dùng hiện tại
@router.get("/me", response_model=List[OrderResponse])
def get_my_orders(
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_user)
):
    orders = get_orders_by_account(db, current_user.id)
    return orders

# Tạo đơn hàng mới
@router.post("/", response_model=OrderResponse)
def create_new_order(
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_user)
):
    try:
        new_order = create_order(db, account_id=current_user.id)
        return new_order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/revenue", summary="Get total revenue")
def get_total_revenue(
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_user)
):
    """
    Tính tổng doanh thu từ tất cả các đơn hàng đã thanh toán.
    """
    # Chỉ admin mới được xem doanh thu
    if not current_user.role:  # Giả sử `role=True` là admin
        raise HTTPException(status_code=403, detail="Permission denied")

    # Lấy tổng doanh thu từ các đơn hàng đã thanh toán
    total_revenue = db.query(func.sum(Order.total_price)).filter(Order.status == "Đã thanh toán").scalar()

    return {"total_revenue": total_revenue or 0.0}

# Lấy thông tin đơn hàng theo ID
@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_user)
):
    order = get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Chỉ chủ sở hữu hoặc admin mới có thể xem
    if order.account_id != current_user.id and not current_user.role:
        raise HTTPException(status_code=403, detail="Permission denied")

    return order

# Cập nhật đơn hàng
@router.put("/{order_id}", response_model=OrderResponse)
def update_existing_order(
    order_id: int,
    order_update: OrderUpdate,
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_user)
):
    order = get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Chỉ chủ sở hữu hoặc admin mới có thể cập nhật
    if order.account_id != current_user.id and not current_user.role:
        raise HTTPException(status_code=403, detail="Permission denied")

    try:
        updated_order = update_order(db, order_id, order_update)
        return updated_order
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# Xóa đơn hàng
@router.delete("/{order_id}", response_model=dict)
def delete_existing_order(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: Account = Depends(get_current_user)
):
    order = get_order_by_id(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    # Chỉ chủ sở hữu hoặc admin mới có thể xóa
    if order.account_id != current_user.id and not current_user.role:
        raise HTTPException(status_code=403, detail="Permission denied")

    delete_order(db, order_id)
    return {"message": "Order deleted successfully"}

