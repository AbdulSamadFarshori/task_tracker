import re
from db import db
from src.models.base import BaseModel
from sqlalchemy import Enum as SQLAlchemyEnum
from src.schemas.schema import UserRole
from sqlalchemy.orm import validates
from passlib.hash import pbkdf2_sha256


class UserModel(BaseModel):
    __tablename__ = "users"

    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(225), nullable=False, default="sumir40@gmail.com")
    role = db.Column(db.Enum(UserRole), default=UserRole.STAFF)
    tokens = db.relationship("TokensModel", back_populates="users", lazy="dynamic")
    projects = db.relationship("ProjectModel", back_populates="users", lazy="dynamic", cascade="all, delete, delete-orphan")
    tasks = db.relationship("TaskModel", back_populates="user", lazy="dynamic", cascade="all, delete, delete-orphan")

    @validates('email')
    def validate_email(self, key: str, value: str):
        if not re.search(".com", value):
            raise Exception("invalid Email")
        if not re.search("@", value):
            raise Exception("invalid Email")
        return value
    
    @validates('password')
    def validate_password(self, key: str, value: str):
        if len(value) <= 5:
            raise Exception("Password should contain 5 or more than 5 characters")
        if not re.search(r"[a-z]", value):
            raise Exception("Password must contain at least one lowercase letter")
        if not re.search(r"[A-Z]", value):
            raise Exception("Password must contain at least one uppercase letter")
        if not re.search(r"\d", value):
            raise Exception("Password must contain at least one digit")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise Exception("Password must contain at least one special character")
        value = pbkdf2_sha256.hash(value)
        return value
     

    def __str__(self):
        return f"{self.username}"



    
