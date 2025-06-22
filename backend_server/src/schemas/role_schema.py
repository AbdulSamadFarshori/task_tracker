from marshmallow import Schema, fields, validates, ValidationError

class RoleSchema(Schema):
    id = fields.Int(load_only=True)
    name = fields.Str(required=True)

class RoleChangeSchema(Schema):
    id = fields.Int()
    roles = fields.List(fields.Str())

class UserRoleSchema(Schema):
    role_id = fields.Int()