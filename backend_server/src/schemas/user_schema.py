# import re
# from typing import List, Dict
# from datetime import datetime
# from enum import Enum

from src.schemas.role_schema import RoleSchema
from marshmallow import Schema, fields, validates, ValidationError

class UserNameSchema(Schema):
    id = fields.Int()
    username = fields.Str()

class UserRoleSchema(Schema):
    role = fields.Nested(RoleSchema, many=False)

class GetUserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    roles = fields.List(fields.Nested(UserRoleSchema, many=False))

class UpdateUserSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str(load_only=True)

class PostUserSchema(Schema):
    id =fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
