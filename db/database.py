import mysql.connector
from core.config import DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

def get_db_connection():
    """
    Kết nối đến cơ sở dữ liệu MySQL và trả về đối tượng kết nối.
    """
    try:
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASSWORD,
            database=DB_NAME
        )
        print("Connection to database established successfully.")
        return conn
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

def close_db_connection(connection):
    """
    Đóng kết nối đến cơ sở dữ liệu.
    """
    if connection:
        connection.close()
        print("Database connection closed.")
