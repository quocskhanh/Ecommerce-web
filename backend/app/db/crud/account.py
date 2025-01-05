from sqlalchemy.orm import Session
from app.models.account import Account
from app.schemas.account import AccountCreate, AccountUpdate


# Thêm tài khoản mới
def create_account(db: Session, account: AccountCreate):
    # Lấy ID cao nhất hiện tại
    existing_email = db.query(Account).filter(Account.email == account.email).first()
    if existing_email:
        raise ValueError(f"Email '{account.email}' đã tồn tại.")

    # Kiểm tra trùng lặp số điện thoại
    existing_phone = db.query(Account).filter(Account.phone_number == account.phone_number).first()
    if existing_phone:
        raise ValueError(f"Số điện thoại '{account.phone_number}' đã tồn tại.")
    max_id = db.query(Account.id).order_by(Account.id.desc()).first()
    new_id = max_id[0] + 1 if max_id else 1  # Nếu không có bản ghi nào, ID bắt đầu từ 1

    new_account = Account(
        id=new_id,  # Gán ID thủ công
        first_name=account.first_name,
        last_name=account.last_name,
        email=account.email,
        phone_number=account.phone_number,
        address=account.address,
        date_of_birth=account.date_of_birth,
        gender=account.gender,
    )
    db.add(new_account)
    db.commit()
    db.refresh(new_account)
    return new_account


# Lấy danh sách tài khoản
def get_accounts(db: Session):
    return db.query(Account).all()


# Lấy tài khoản theo ID
def get_account_by_id(db: Session, account_id: int):
    return db.query(Account).filter(Account.id == account_id).first()


# Cập nhật tài khoản
def update_account(db: Session, account_id: int, account_update: AccountUpdate):
    account = get_account_by_id(db, account_id)
    if not account:
        return None
    existing_email = db.query(Account).filter(Account.email == account_update.email).first()
    if existing_email:
        raise ValueError(f"Email '{account.email}' đã tồn tại.")

    # Kiểm tra trùng lặp số điện thoại
    existing_phone = db.query(Account).filter(Account.phone_number == account_update.phone_number).first()
    if existing_phone:
        raise ValueError(f"Số điện thoại '{account.phone_number}' đã tồn tại.")
    for key, value in account_update.dict(exclude_unset=True).items():
        setattr(account, key, value)
    db.commit()
    db.refresh(account)
    return account


# Xóa tài khoản
def delete_account(db: Session, account_id: int):
    account = get_account_by_id(db, account_id)
    if not account:
        return None
    db.delete(account)
    db.commit()
    return account
