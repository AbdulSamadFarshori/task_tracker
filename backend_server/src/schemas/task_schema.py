import re
from typing import List, Dict
from datetime import datetime
from src.models.tasks import TaskStatus
from src.schemas.user_schema import GetUserSchema
from src.schemas.project_schema import ProjectSchema
from marshmallow import Schema, fields, validates, ValidationError

class PostTaskSchema(Schema):
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    due_date = fields.Date()
    status = fields.Enum(TaskStatus)
    created_by = fields.Int()
    project_id = fields.Int()
    assignee_id = fields.Int()
    user_id = fields.Int()
    # creator = fields.Int()
    # project = fields.Int()

# class TaskAssignmentSchema(Schema):
#     task_id = fields.Int()
#     user_id = fields.Int()
#     user = fields.Nested(GetUserSchema, many=False)
#     assignee = fields.Nested(GetUserSchema, many=False)

class GetTaskSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    description = fields.Str()
    status = fields.Enum(TaskStatus)
    due_date = fields.Date()
    creator = fields.Nested(GetUserSchema, many=False)
    project =  fields.Nested(ProjectSchema, many=False)
    assignee = fields.Nested(GetUserSchema, many=False)
    
class UpdateTaskSchema(Schema):
    id = fields.Int() 
    name = fields.Str(required=False)
    description = fields.Str(required=False)
    due_date = fields.Date()
    assignee_id = fields.Int()
    status = fields.Str()

class UpdateTaskStatus(Schema):
    id = fields.Int()
    status = fields.Enum(TaskStatus)
    changed_by = fields.Int()


class TaskLogSchema(Schema):
    id = fields.Int()
    old_status = fields.Enum(TaskStatus)
    new_status = fields.Enum(TaskStatus)
    changed_by = fields.Int()




