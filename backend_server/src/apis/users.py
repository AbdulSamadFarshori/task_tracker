from flask import jsonify, request
from passlib.hash import pbkdf2_sha256
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from db import db
from src.models.users import UserModel
from src.schemas.schema import GetUserSchema, PostUserSchema, UpdateUserSchema
from marshmallow import ValidationError

from flask_jwt_extended import jwt_required

bp = Blueprint('user', __name__, url_prefix='/users', description="users related operations")

class UsersCRUDApiViews(MethodView):

    @jwt_required()
    @bp.response(200, GetUserSchema(many=True))
    def get(self, user_id=None):
        if user_id:
            user = UserModel.query.filter(UserModel.id == user_id).first()
            return user
        else:
            users = UserModel.query.all()
            return users

    @jwt_required()
    @bp.arguments(PostUserSchema)
    @bp.response(200, GetUserSchema)
    def post(self, userSchema):
        try:
            userSchema["password"] = pbkdf2_sha256.hash(userSchema["password"])
            data = UserModel(**userSchema.dict())
            data.save()
            return data, 201
        except ValidationError as e:
            return jsonify({"errors": e.errors()}), 400
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

    @jwt_required()
    @bp.arguments(UpdateUserSchema) 
    def put(self, user_id : int, reqs):
        if reqs:
            data = UserModel.query.filter(UserModel.id==user_id).first()
            if data:
                try:
                    data.username = reqs.username if reqs else data.username
                    data.password = reqs.password if reqs else data.password
                    data.is_admin = reqs.is_admin if reqs else data.is_admin
                    data.is_staff = reqs.is_staff if reqs else data.is_staff
                    data.save()
                    return jsonify({"data":reqs.dict()}), 201 
                except ValidationError as e:
                    return jsonify({"errors": e.errors()}), 400
                except Exception as e:
                    return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
            else:
                return jsonify({"error": f"this {user_id} does not exist"}), 404
        else:
            return jsonify({"error": f"user data is missing"}), 404

    @jwt_required()
    def delete(self, user_id : int):
        try:
            data = UserModel.query.filter(UserModel.id==user_id).first()
            if not data:
                return jsonify({'error': 'user is not present in database'}), 404
            else:
                data.delete()
                return jsonify({'error': 'user has been removed from database'}), 201
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        


user_view = UsersCRUDApiViews.as_view("user")

bp.add_url_rule('/', view_func=user_view, methods=["POST", "GET"])
bp.add_url_rule('/<int:user_id>', view_func=user_view, methods=["GET", "PUT", "DELETE"])