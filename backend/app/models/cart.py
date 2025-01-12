from sqlalchemy import Column, Integer, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base

class Cart(Base):
    __tablename__ = "cart"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("account.id"), nullable=False, unique=True)
    
    account = relationship("Account", back_populates="cart")
    cart_items = relationship("CartItem", back_populates="cart")
