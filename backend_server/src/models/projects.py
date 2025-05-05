from src.models.base import BaseModel
from datetime import datetime
from db import db


class ProjectModel(BaseModel):
    
    __tablename__ = "projects"

    project_name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False, nullable=False)
    users = db.relationship("UserModel", back_populates="projects")
    tasks = db.relationship("TaskModel", back_populates="project", lazy="dynamic")




