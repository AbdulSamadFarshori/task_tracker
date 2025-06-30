from db import db
from enum import Enum
from src.models.base import BaseModel
from sqlalchemy import Enum as SQLAlchemyEnum
from datetime import date

class TaskStatus(Enum):
    NEW = "NEW"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class TaskModel(BaseModel):
    __tablename__ = "tasks"

    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.Date, default=date.today)
    status = db.Column(db.Enum(TaskStatus), default=TaskStatus.NEW)
    created_by = db.Column(db.Integer, db.ForeignKey("users.id"), unique=False, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey("projects.id"), unique=False, nullable=False)
    assignee_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    creator = db.relationship("UserModel", back_populates='created_tasks', foreign_keys=[created_by])
    project = db.relationship("ProjectModel", back_populates='tasks')
    assignee = db.relationship('UserModel', back_populates='assigned_tasks', foreign_keys=[assignee_id])


# class TaskAssignmentModel(BaseModel):
#     __tablename__ = 'task_assignments'
    
#     task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     task = db.relationship('TaskModel', back_populates='assignments')
#     assignee = db.relationship('UserModel', back_populates='assigned_tasks', foreign_keys=[user_id])

class TaskLogModel(BaseModel):
    __tablename__ = 'task_logs'
    
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id', ondelete='CASCADE'), nullable=False)
    old_status = db.Column(db.Enum(TaskStatus))
    new_status = db.Column(db.Enum(TaskStatus))
    changed_by = db.Column(db.Integer, db.ForeignKey('users.id'))




