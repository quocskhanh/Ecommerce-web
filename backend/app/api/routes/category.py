from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.category import CategoryCreate,CategoryUpdate,CategoryResponse
from app.db.crud.category import get_categories,get_category_by_id,create_category,update_category,delete_category
from app.db.database import SessionLocal
from app.api.authentication import get_current_user, get_current_admin_user

router = APIRouter(prefix="/categories", tags=["categories"])

# Dependency để lấy session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.get("/", response_model=list[CategoryResponse])
def list_all_accounts(db: Session = Depends(get_db)):
    
    return get_categories(db)

@router.post("/add", response_model=CategoryResponse)
def add_new_category(category: CategoryCreate,db: Session = Depends(get_db),current_user: dict = Depends(get_current_admin_user)):
    try:
        new_category = create_category(db,category)
        return new_category
    except ValueError as e:
        raise HTTPException(status_code=400,detail=str(e))

@router.put("/change", response_model=CategoryUpdate)
def change_existing_category(category_id: int, category:CategoryUpdate, db:Session = Depends(get_db), current_user: dict = Depends(get_current_admin_user)):
    try:
        updated_category = update_category(db, category_id,category)
        return updated_category
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
@router.delete("/delete")
def delete_existing_category(category_id: int, db: Session = Depends(get_db),current_user: dict = Depends(get_current_admin_user)):
    deleted_category = delete_category(db,category_id)
    if not deleted_category:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}