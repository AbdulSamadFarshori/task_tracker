from flask import jsonify, request
from passlib.hash import pbkdf2_sha256
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from logger import logger 
from src.models.users import UserModel, RoleModel, UserRoleModel
from src.utils.helper import permission
from src.schemas.user_schema import GetUserSchema, PostUserSchema, UpdateUserSchema, UserNameSchema
from marshmallow import ValidationError

from flask_jwt_extended import jwt_required

bp = Blueprint('user', __name__, url_prefix='/api/users', description="users related operations")

class UsersCRUDApiViews(MethodView):

    @jwt_required()
    @permission('Admin')
    def get(self, user_id=None):
        try:
            if user_id:
                user = UserModel.query.filter(UserModel.id == user_id).first()
                return GetUserSchema().dump(user), 200
            else:
                users = UserModel.query.all()
                return GetUserSchema(many=True).dump(users), 200
        except Exception as e:
            logger.error(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500
    
    @jwt_required()
    @permission('Admin')
    @bp.arguments(PostUserSchema)
    @bp.response(200, GetUserSchema(many=False))
    def post(self, userSchema):
        try:
            print(userSchema)
            data = UserModel(**userSchema)
            data.save()
            default_role = RoleModel.query.filter(RoleModel.name=='Read-Only').first()
            user_role = UserRoleModel(user_id=data.id, role_id=default_role.id)
            user_role.save()
            return data, 200
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"status":"error", "msg": f"{str(e)}"}), 500

    @jwt_required()
    @permission('Admin') 
    @bp.arguments(UpdateUserSchema)
    @bp.response(200, GetUserSchema(many=False))
    def put(self, reqs, user_id):
        try:
            if reqs:
                user_id = user_id
                data = UserModel.query.filter(UserModel.id==user_id).first()
                if data:
                    for key, value in reqs.items():
                        if value != "" and getattr(data, key) != value:
                            setattr(data, key, value)
                    data.save()
                    return data, 200 
                else:
                    return jsonify({"status":"error", "msg": f"this {user_id} does not exist"}), 404
            else:
                return jsonify({"status":"error", "msg":"user data is missing"}), 404
        except Exception as e:
            logger.error(e)
            return jsonify({"status":"error", "msg" : f"An unexpected error occurred: {str(e)}"}), 500

    @jwt_required()
    @permission('Admin')
    def delete(self, user_id : int):
        try:
            data = UserModel.query.filter(UserModel.id==user_id).first()
            if not data:
                return jsonify({"status":"error", "msg": "user is not present in database"}), 404
            else:
                idx = data.id
                data.delete()
                return jsonify({"id":idx}), 201
        except Exception as e:
            logger.error(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500
        

class GetUserNameAPIView(MethodView):
    @jwt_required()
    @permission('Admin', 'Task-Creator')
    def get(self):
        try:
            data = UserModel.query.all()
            user_schema = UserNameSchema(many=True)
            result = user_schema.dump(data)
            return result, 200
        except Exception as e:
            logger.error(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500

user_view = UsersCRUDApiViews.as_view("user")

bp.add_url_rule('/', view_func=user_view, methods=["POST", "GET"])
bp.add_url_rule('/<int:user_id>', view_func=user_view, methods=["GET", "DELETE", "PUT"])


username_view = GetUserNameAPIView.as_view("username")
bp.add_url_rule('/username/', view_func=username_view, methods=["GET"])

