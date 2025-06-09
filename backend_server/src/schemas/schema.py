import re
from typing import List, Dict
from datetime import datetime
from enum import Enum

from marshmallow import Schema, fields, validates, ValidationError

class UserRole(Enum):

    ADMIN = "ADMIN"
    STAFF = "STAFF"

class UserNameSchema(Schema):
    username = fields.Str()

class GetUserSchema(Schema):

    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    role = fields.Enum(UserRole)

class UpdateUserSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str(load_only=True)
    role = fields.Enum(UserRole)

class PostUserSchema(Schema):

    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    role = fields.Enum(UserRole)
    
    @validates('password')
    def validate_password(self, value: str, data_key: str):
        if len(value) <= 5:
            raise Exception("Password should contain 12 or more than 12 characters")
        if not re.search(r"[a-z]", value):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"\d", value):
            raise ValueError("Password must contain at least one digit")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise ValueError("Password must contain at least one special character")
        return value
     
class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)

class LoginOutputSchema(Schema):
    username =  fields.Str() 
    user_id =  fields.Int() 
    role = fields.Enum(UserRole)
    access_token =  fields.Str()


class TokensSchema(Schema):
    id = fields.Int(required=True)


class AuthSchema(Schema):
    token = fields.Str(required=True)

class AuthResponseSchema(Schema):
    username =  fields.Str() 
    user_id =  fields.Int() 
    role = fields.Enum(UserRole)
    access_token =  fields.Str()


class ProjectStatus(Enum):
    NEW = "NEW"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    NOT_STARTED = "NOT_STARTED"

class GetProjectSchema(Schema):
    id = fields.Int()
    project_name = fields.Str(required=True)
    description = fields.Str(required=True)
    start_date = fields.Date()
    end_date = fields.Date()
    status = fields.Enum(ProjectStatus)
    users = fields.Nested(GetUserSchema, many=False)

class PostProjectSchema(Schema):
    id = fields.Int()
    project_name = fields.Str(required=True)
    description = fields.Str(required=True)
    start_date = fields.Date()
    end_date = fields.Date()
    status = fields.Enum(ProjectStatus)
    user = fields.Str()


class UpdateProjectSchema(Schema):
    id = fields.Int()
    project_name = fields.Str(required=True)
    description = fields.Str(required=True)
    start_date = fields.Date()
    end_date = fields.Date()
    status = fields.Enum(ProjectStatus)
    owner = fields.Str()

class ProjectNameListSchema(Schema):
    project_name = fields.Str()


class TaskStatus(Enum):
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"

class GetTaskSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    description = fields.Str()
    due_date = fields.Date()
    status = fields.Enum(TaskStatus)
    user = fields.Nested(GetUserSchema, many=False)
    project =  fields.Nested(GetProjectSchema, many=False)

class PostTaskSchema(Schema):
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    due_date = fields.Date()
    status = fields.Enum(TaskStatus)
    user = fields.Str()
    project = fields.Str()
    # users = fields.Nested(GetUserSchema, many=False)
    # projects =  fields.Nested(GetProjectSchema, many=False) 

class UpdateTaskSchema(Schema):
    id = fields.Int() 
    name = fields.Str()
    description = fields.Str()
    due_date = fields.Date()
    status = fields.Enum(TaskStatus)
    user = fields.Str()
    project = fields.Str()

class UpdateTaskStatusSchema(Schema):
    id = fields.Int()
    status = fields.Enum(TaskStatus)