from src.models.projects import ProjectStatus
from marshmallow import Schema, fields, validates, ValidationError
from src.schemas.user_schema import GetUserSchema

class ProjectSchema(Schema):
    id = fields.Int()
    name = fields.Str(required=True)
    description = fields.Str(required=True)
    start_date = fields.Date()
    end_date = fields.Date()
    status = fields.Enum(ProjectStatus)
    created_by = fields.Int()
    users = fields.Nested(GetUserSchema, many=False)

class ProjectNameListSchema(Schema):
    project_name = fields.Str()

class StatusChangeSchema(Schema):
    status = fields.Enum(ProjectStatus)
 
