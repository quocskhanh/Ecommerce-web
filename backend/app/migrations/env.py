import os
import sys
from logging.config import fileConfig
from decouple import config as env_config

from sqlalchemy import engine_from_config, pool
from alembic import context

# Thêm thư mục gốc vào sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))

# Import Base
from app.models.base import Base  # Đảm bảo 'Base' chứa tất cả metadata của các models
from app.models.account import Account
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.category import Category
from app.models.order import Order
from app.models.payment import Payment
from app.models.shipping import Shipping
from app.models.product import Product
    
# Cấu hình từ alembic.ini
config = context.config

# Lấy URL từ biến môi trường (nếu có)
config.set_main_option("sqlalchemy.url", env_config("DB_URL"))

# Thiết lập logging
fileConfig(config.config_file_name)

# Metadata từ Base
target_metadata = Base.metadata

def run_migrations_online():
    """Chạy migration ở chế độ 'online'."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

# Chạy migration
run_migrations_online()
