from marshmallow import Schema, fields, validates, ValidationError


class AuthSchema(Schema):
    token = fields.Str(required=True)

class AuthResponseSchema(Schema):
    username =  fields.Str() 
    user_id =  fields.Int() 
    role = fields.Str()
    access_token =  fields.Str()
