from src.models.base import BaseModel
from sqlalchemy import Enum as SQLAlchemyEnum
from enum import Enum
from datetime import date
from db import db

class ProjectStatus(Enum):
    NEW = "NEW"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    NOT_STARTED = "NOT_STARTED"
    BLOCKED = "BLOCKED"

class ProjectModel(BaseModel):    
    __tablename__ = "projects"

    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Date, default=date.today)
    end_date = db.Column(db.Date, default=date.today)
    status = db.Column(db.Enum(ProjectStatus), default=ProjectStatus.NEW)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    users = db.relationship("UserModel", backref="projects")
    tasks = db.relationship("TaskModel", back_populates="project", lazy="dynamic", cascade="all, delete, delete-orphan")