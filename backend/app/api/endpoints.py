import fastapi
from app.api.routes.account import router as account_router

router = fastapi.APIRouter()
router.include_router(account_router)