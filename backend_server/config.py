import os
from dotenv import load_dotenv

load_dotenv("./.env")

JWT_SECRET_KEY = os.getenv("JWT_SECRETKEY")
SECRET_KEY = os.getenv("SECRET_KEY")
DB_CONNECTION = os.getenv("DB_CONNECTION")
GOOGLE_CLIENT_ID = os.getenv("client_id")
AWS_DB_CONNECTION = os.getenv("AWS_DB_CONNECTION")