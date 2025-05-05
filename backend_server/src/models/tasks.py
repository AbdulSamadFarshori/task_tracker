from db import db
from src.models.base import BaseModel
from sqlalchemy import Enum as SQLAlchemyEnum
from datetime import datetime
from enum import Enum

class Status(Enum):

    NEW = "new"
    IN_PROGRESS = "in-progress"
    COMPLETED = "completed"
    BLOCKED = "blocked"
    NOT_STARTED = "not-started"


class TaskModel(BaseModel):
    __tablename__ = "tasks"

    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(SQLAlchemyEnum(Status), default=Status.NEW)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False, nullable=False)
    user = db.relationship("UserModel", back_populates='tasks')
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), unique=False, nullable=False)
    project = db.relationship("ProjectModel", back_populates='tasks')






