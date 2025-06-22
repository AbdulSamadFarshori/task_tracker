import re
from db import db
from src.models.base import BaseModel
from enum import Enum
from sqlalchemy import Enum as SQLAlchemyEnum
from sqlalchemy.orm import validates
from passlib.hash import pbkdf2_sha256


class UserModel(BaseModel):
    __tablename__ = "users"

    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(225), nullable=False)
    roles = db.relationship('UserRoleModel', back_populates='user', cascade='all, delete')
    created_tasks = db.relationship('TaskModel', back_populates ='creator', foreign_keys='TaskModel.created_by')
    assigned_tasks = db.relationship('TaskAssignmentModel', back_populates='assignee', foreign_keys='TaskAssignmentModel.user_id')

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


class RoleModel(BaseModel):
    __tablename__= "roles"
    name = db.Column(db.String(80), nullable=False)
    users = db.relationship('UserRoleModel', back_populates='role', cascade='all, delete')


class UserRoleModel(BaseModel):
    __tablename__ = 'User_Roles'
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    user = db.relationship('UserModel', back_populates='roles')
    role = db.relationship('RoleModel', back_populates='users')


    
