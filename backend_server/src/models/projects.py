from src.models.base import BaseModel
from sqlalchemy import Enum as SQLAlchemyEnum
from src.schemas.schema import ProjectStatus
from datetime import date
from db import db


class ProjectModel(BaseModel):
    
    __tablename__ = "projects"

    project_name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Date, default=date.today)
    end_date = db.Column(db.Date, default=date.today)
    status = db.Column(db.Enum(ProjectStatus), default=ProjectStatus.NEW)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False, nullable=False)
    users = db.relationship("UserModel", back_populates="projects")
    tasks = db.relationship("TaskModel", back_populates="project", lazy="dynamic")




