from db import db
from src.models.base import BaseModel
from sqlalchemy import Enum as SQLAlchemyEnum
from src.schemas.schema import UserRole


class UserModel(BaseModel):
    __tablename__ = "users"

    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(225), nullable=False, default="sumir40@gmail.com")
    role = db.Column(db.Enum(UserRole), default=UserRole.STAFF)
    tokens = db.relationship("TokensModel", back_populates="users", lazy="dynamic")
    projects = db.relationship("ProjectModel", back_populates="users", lazy="dynamic", cascade="all, delete, delete-orphan")
    tasks = db.relationship("TaskModel", back_populates="user", lazy="dynamic", cascade="all, delete, delete-orphan")


    def __str__(self):
        return f"{self.username}"



    
