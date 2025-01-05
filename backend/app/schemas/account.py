from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date


class AccountBase(BaseModel):
    """
    Schema cơ bản cho tài khoản, chứa các trường chung.
    """
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: Optional[str]
    address: Optional[str]
    date_of_birth: Optional[date]
    gender: Optional[str]


class AccountCreate(AccountBase):
    """
    Schema được sử dụng khi tạo tài khoản mới.
    """
    pass


class AccountUpdate(AccountBase):
    """
    Schema được sử dụng khi cập nhật tài khoản.
    """
    pass


class AccountResponse(AccountBase):
    """
    Schema được sử dụng để trả về thông tin tài khoản cho client.
    """
    id: int

    class Config:
        orm_mode = True  # Cho phép chuyển đổi từ SQLAlchemy model sang Pydantic schema
