from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate
from app.db.crud.category import get_category_by_id
# Tạo sản phẩm mới
def create_product(db: Session, product: ProductCreate):
    if product.status not in ["Còn hàng", "Hết hàng"]:
        raise ValueError("Status phải là 'còn hàng' hoặc 'hết hàng'")
    category = get_category_by_id(db, product.category_id)
    if not category:
        raise ValueError(status_code=400, detail="Category not found")
    new_product = Product(
        name=product.name,
        price=product.price,
        description=product.description,
        category_id=product.category_id,
        status=product.status,
        colors=product.colors,
        sizes=product.sizes,
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

# Lấy tất cả sản phẩm
def get_all_products(db: Session):
    return db.query(Product).all()

# Lấy sản phẩm theo ID
def get_product_by_id(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()

def get_filtered_products(db: Session, category_id: int = None, min_price: int = None, max_price: int = None):
    """
    Lấy sản phẩm theo nhiều tiêu chí lọc: loại, khoảng giá.
    """
    query = db.query(Product)

    # Lọc theo loại sản phẩm (category_id)
    if category_id is not None:
        query = query.filter(Product.category_id == category_id)

    # Lọc theo khoảng giá
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    return query.all()

# Cập nhật sản phẩm
def update_product(db: Session, product_id: int, product_update: ProductUpdate):
    if product_update.status and product_update.status not in ["Còn hàng", "Hết hàng"]:
        raise ValueError("Status phải là 'còn hàng' hoặc 'hết hàng'")
    
    product = get_product_by_id(db, product_id)
    if not product:
        return None

    update_data = product_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product

# Xóa sản phẩm
def delete_product(db: Session, product_id: int):
    product = get_product_by_id(db, product_id)
    if not product:
        return None
    db.delete(product)
    db.commit()
    return product
