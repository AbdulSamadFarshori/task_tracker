from db import db
from src.models.base import BaseModel

class UserModel(BaseModel):
    __tablename__ = "users"

    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    is_staff = db.Column(db.Boolean, default=False)
    tokens = db.relationship("TokensModel", back_populates="users", lazy="dynamic")
    projects = db.relationship("ProjectModel", back_populates="users", lazy="dynamic")
    tasks = db.relationship("TaskModel", back_populates="user", lazy="dynamic")


    def __str__(self):
        return f"{self.username}"



    
