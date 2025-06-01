from db import db
from src.models.base import BaseModel
from sqlalchemy import Enum as SQLAlchemyEnum
from datetime import date
from src.schemas.schema import TaskStatus


class TaskModel(BaseModel):
    __tablename__ = "tasks"

    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.Date, default=date.today)
    status = db.Column(db.Enum(TaskStatus), default=TaskStatus.IN_PROGRESS)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False, nullable=False)
    user = db.relationship("UserModel", back_populates='tasks')
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), unique=False, nullable=False)
    project = db.relationship("ProjectModel", back_populates='tasks')






