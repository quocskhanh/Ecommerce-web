from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from app.models.account import Account
from app.db.database import SessionLocal
from app.core.security import verify_password, hash_password, create_access_token

# Cấu hình OAuth2 scheme
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency: Lấy session cơ sở dữ liệu
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dependency: Lấy thông tin người dùng hiện tại từ token
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Lấy thông tin người dùng hiện tại từ JWT token.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user = db.query(Account).filter(Account.email == email).first()
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )

# Dependency: Kiểm tra quyền Admin
def get_current_admin_user(current_user: Account = Depends(get_current_user)):
    """
    Kiểm tra xem người dùng hiện tại có quyền Admin không.
    """
    if not current_user.role:  # Nếu role là False => không phải Admin
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action",
        )
    return current_user

# Hàm xác thực người dùng
def authenticate_user(db: Session, email: str, password: str):
    """
    Xác thực thông tin đăng nhập của người dùng.
    """
    user = db.query(Account).filter(Account.email == email).first()
    if not user or not verify_password(password, user.password):
        return None
    return user

# Endpoint để xử lý login và tạo token
def login_for_access_token(db: Session, username: str, password: str):
    """
    Xử lý xác thực và tạo JWT token.
    """
    user = authenticate_user(db, username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
