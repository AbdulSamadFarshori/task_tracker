from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import decode_token
from src.models.users import UserModel

def permission():
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            auth_header = request.headers.get("Authorization", "")
            token = auth_header.replace("Bearer ", "") if auth_header.startswith("Bearer ") else auth_header
            try:
                decoded = decode_token(token)
                username = decoded.get('sub')
                userdata = UserModel.query.filter(UserModel.username == username).first()
                if userdata.role.value == "ADMIN":
                    return fn(*args, **kwargs)
                else:
                    return jsonify({"error": "Permission denied"}), 403    
            except Exception as e:
                return jsonify({"error": f"Permission denied: {str(e)}"}), 403
        return wrapper
    return decorator