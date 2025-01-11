from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse
from app.db.crud.product import (
    get_all_products,
    get_product_by_id,
    get_filtered_products,
    create_product,
    update_product,
    delete_product
)
from app.api.authentication import get_current_user, get_current_admin_user
from app.db.database import SessionLocal
from app.models.account import Account

router = APIRouter(prefix="/products", tags=["products"])

# Dependency để lấy session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API: Lấy tất cả sản phẩm
@router.get("/", response_model=list[ProductResponse])
def list_products(
    db: Session = Depends(get_db),
    category_id: int = Query(None, description="Lọc sản phẩm theo loại"),
    min_price: int = Query(0, description="Lọc sản phẩm theo giá tối thiểu"),
    max_price: int = Query(None, description="Lọc sản phẩm theo giá tối đa"),
    current_user: Account = Depends(get_current_user)
):
    """
    Lấy danh sách sản phẩm với các tùy chọn lọc: loại, khoảng giá.
    """
    # Gọi hàm get_filtered_products với tất cả tiêu chí lọc
    products = get_filtered_products(
        db=db,
        category_id=category_id,
        min_price=min_price,
        max_price=max_price,
    )
    if not current_user.role:  # Nếu user không phải admin
        products = [product for product in products if product.status == "Còn hàng"]
    return products

# API: Lấy thông tin sản phẩm theo ID
@router.get("/{product_id}", response_model=ProductResponse)
def retrieve_product(product_id: int, db: Session = Depends(get_db)):
    """
    Lấy thông tin sản phẩm theo ID.
    """
    product = get_product_by_id(db, product_id)
    if not product :
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# API: Thêm sản phẩm mới
@router.post("/", response_model=ProductResponse)
def create_new_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_admin_user)
):
    """
    Chỉ Admin mới được thêm sản phẩm mới.
    """
    try:
        new_product = create_product(db, product)
        return new_product
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# API: Cập nhật thông tin sản phẩm
@router.put("/{product_id}", response_model=ProductResponse)
def update_existing_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_admin_user)
):
    """
    Chỉ Admin mới được sửa thông tin sản phẩm.
    """
    updated_product = update_product(db, product_id, product_update)
    if not updated_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product

# API: Xóa sản phẩm
@router.delete("/{product_id}")
def delete_existing_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_admin_user)
):
    """
    Chỉ Admin mới được xóa sản phẩm.
    """
    deleted_product = delete_product(db, product_id)
    if not deleted_product:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"message": "Product deleted successfully"}
