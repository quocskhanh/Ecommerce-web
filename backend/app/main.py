from fastapi import FastAPI
from app.api.endpoints import router as endpoints_router  # Import router từ api.routes.account

# Khởi tạo ứng dụng FastAPI
app = FastAPI()

# Tích hợp router cho Account API
app.include_router(
    endpoints_router
)


