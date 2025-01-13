import fastapi
from app.api.routes.account import router as account_router
from app.api.routes.auth import router as auth_router
from app.api.routes.category import router as category_router
from app.api.routes.product import router as product_router
from app.api.routes.cart import router as cart_router
from app.api.routes.cart_item import router as item_router
from app.api.routes.order import router as order_router
from app.api.routes.shipping import router as shipping_router
router = fastapi.APIRouter()

# Tích hợp các router từ account.py và auth.py
router.include_router(account_router)
router.include_router(auth_router)  # Import router từ auth.py
router.include_router(category_router)
router.include_router(product_router)
router.include_router(cart_router)
router.include_router(item_router)
router.include_router(order_router)
router.include_router(shipping_router)