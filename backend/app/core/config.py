import os
from dotenv import load_dotenv
import fastapi

# Tải thông tin từ file .env
load_dotenv()

# Lấy thông tin cấu hình từ biến môi trường
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')


