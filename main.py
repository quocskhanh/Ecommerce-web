from db.database import get_db_connection, close_db_connection

def fetch_products():
    """
    Lấy danh sách sản phẩm từ cơ sở dữ liệu.
    """
    # Kết nối đến cơ sở dữ liệu
    connection = get_db_connection()
    if connection is None:
        return []

    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM product")  # Truy vấn lấy tất cả sản phẩm
        products = cursor.fetchall()
        return products
    except Exception as e:
        print(f"Error fetching products: {e}")
        return []
    finally:
        # Đóng kết nối sau khi hoàn thành
        close_db_connection(connection)

# Sử dụng hàm fetch_products để lấy sản phẩm
if __name__ == "__main__":
    products = fetch_products()
    for product in products:
        print(product)
