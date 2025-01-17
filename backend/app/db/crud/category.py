from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse

def create_category(db : Session, category: CategoryCreate):
    existing_category = db.query(Category).filter(Category.name == category.name).first()
    if existing_category:
        existing_category.is_deleted = False
        existing_category.image = category.image
        db.commit()  # Thêm commit
        db.refresh(existing_category)
        return existing_category
    new_category = Category(
        name = category.name,
        image = category.image
    )
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category

def get_categories(db: Session):
    return db.query(Category).filter(Category.is_deleted != True).all()

def get_category_by_id(db: Session, category_id: int):
    return db.query(Category).filter(Category.id == category_id).first()

def update_category(db: Session,category_id: int, category_update: CategoryUpdate):
    category = get_category_by_id(db, category_id)
    if not category:
        return None
    if category_update.name:
        existing_name = db.query(Category).filter(Category.name == category_update.name, Category.id != category_id).first()
        if existing_name:
            raise ValueError(f"Loại hàng đã tồn tại.")
    update_data = category_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(category, key, value)

    db.commit()
    db.refresh(category)
    return category

def delete_category(db: Session, category_id: int):
    category = get_category_by_id(db,category_id)
    if not category:
        return None
    category.is_deleted = True
    db.commit()
    return category