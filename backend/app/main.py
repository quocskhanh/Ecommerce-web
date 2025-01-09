from fastapi import FastAPI
from app.api.endpoints import router as endpoints_router  # Import router từ api.routes.account
from fastapi.security import OAuth2PasswordBearer


# Khởi tạo ứng dụng FastAPI
app = FastAPI()

oath2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# Tích hợp router cho Account API
app.include_router(
    endpoints_router
)


