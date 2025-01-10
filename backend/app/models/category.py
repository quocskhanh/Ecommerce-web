from sqlalchemy import Column, Integer, String, Date, Boolean
from app.db.database import Base

class Category(Base):
    __tablename__ = "category"
    
    id = Column(Integer, primary_key= True, index= True)
    name = Column(String(255), nullable=False)
    is_deleted = Column(Boolean, default=False, nullable=False)