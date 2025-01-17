from sqlalchemy import Column, Integer, String, Date, Boolean,DateTime,func
from app.models.base import Base
from sqlalchemy.orm import relationship


class Account(Base):
    __tablename__ = "account"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone_number = Column(String(15), unique=True, nullable=True)
    address = Column(String(255), nullable=True)
    date_of_birth = Column(Date, nullable=True)
    gender = Column(String(10), nullable=True)
    password = Column(String(255), nullable=False)  
    role = Column(Boolean, nullable=False, default=False)  #False = user
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    total_spent = Column(Integer, default=0)  # Thêm trường mới
    
    cart = relationship("Cart", back_populates= "account")
    orders = relationship("Order", back_populates="account")