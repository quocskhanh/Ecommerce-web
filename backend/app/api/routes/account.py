from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.account import AccountCreate, AccountResponse, AccountUpdate
from app.db.crud.account import (
    create_account,
    get_accounts,
    get_account_by_id,
    update_account,
    delete_account,
)
from app.db.database import SessionLocal

router = APIRouter(prefix="/accounts", tags=["accounts"])  # Đặt tags nhất quán (chữ cái đầu viết hoa)

# Dependency để lấy session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# API: Tạo tài khoản mới
@router.post("/", response_model=AccountResponse)
def create_new_account(account: AccountCreate, db: Session = Depends(get_db)):
    try:
        new_account = create_account(db, account)
        return new_account
    except ValueError as e:  # Bắt lỗi trùng lặp từ hàm CRUD
        raise HTTPException(status_code=400, detail=str(e))


# API: Lấy danh sách tài khoản
@router.get("/", response_model=list[AccountResponse])
def list_all_accounts(db: Session = Depends(get_db)):
    return get_accounts(db)


# API: Lấy thông tin tài khoản theo ID
@router.get("/{account_id}", response_model=AccountResponse)
def retrieve_account(account_id: int, db: Session = Depends(get_db)):
    account = get_account_by_id(db, account_id)
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    return account


# API: Cập nhật tài khoản
@router.put("/{account_id}", response_model=AccountResponse)
def update_existing_account(account_id: int, account_update: AccountUpdate, db: Session = Depends(get_db)):
    try:
        updated_account = update_account(db, account_id, account_update)
        return updated_account
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

# API: Xóa tài khoản
@router.delete("/{account_id}")
def delete_existing_account(account_id: int, db: Session = Depends(get_db)):
    deleted_account = delete_account(db, account_id)
    if not deleted_account:
        raise HTTPException(status_code=404, detail="Account not found")
    return {"message": "Account deleted successfully"}
