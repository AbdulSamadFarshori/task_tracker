import re
from typing import List, Dict
from datetime import datetime
from pydantic import BaseModel, field_validator, ConfigDict

class UserIdSchema(BaseModel):
    id : int

class UserRequestSchema(BaseModel):
    id : int
    username : str
    password : str
    is_admin : bool
    is_staff : bool

    model_config = ConfigDict(from_attributes=True)


    @field_validator('password')
    @classmethod
    def password_validation(cls, value):
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
    
class ProjectRequestSchema(BaseModel):
    id : int
    project_name : str
    description : str
    start_date : datetime
    end_date : datetime
    user_id : int

    model_config = ConfigDict(from_attributes=True)

class TaskRequestSchema(BaseModel):
    id : int
    task_name : str
    description : str
    due_date : datetime
    status : str
    user_id : int
    project_id : int

    model_config = ConfigDict(from_attributes=True)

    



