import re
from typing import List, Dict
from datetime import datetime

from marshmallow import Schema, fields, validates, ValidationError


class GetUserSchema(Schema):

    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    is_staff = fields.Bool()
    is_admin = fields.Bool()

class UpdateUserSchema(Schema):

    username = fields.Str()
    password = fields.Str(load_only=True)
    is_staff = fields.Bool()
    is_admin = fields.Bool()


class PostUserSchema(Schema):

    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)
    is_staff = fields.Bool()
    is_admin = fields.Bool()

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


class TokensSchema(Schema):
    id = fields.Int(required=True)


class AuthSchema(Schema):
    token = fields.Str(required=True)
    


