from functools import wraps
from flask import request, jsonify
from src.models.users import UserModel
from flask_jwt_extended import get_jwt_identity


def permission(*roles):  
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            username = get_jwt_identity()
            user = UserModel.query.filter(UserModel.username == username).first()
            user_roles = [r.role.name for r in user.roles]
            if not any(role in user_roles for role in roles):
                return jsonify({"msg": "Access Denied"}), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator
