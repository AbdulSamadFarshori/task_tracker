from marshmallow import Schema, fields, validates, ValidationError


class LoginSchema(Schema):
    username = fields.Str(required=True)
    password = fields.Str(required=True, load_only=True)

class LoginUserSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Str()

class LoginOutputSchema(Schema):
    user = fields.Nested(LoginUserSchema, many=False)
    token =  fields.Str()
    roles = fields.List(fields.Str())

    
