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
            userrole = userSchema.pop('role')
            data = UserModel(**userSchema)
            data.save()
            default_role = RoleModel.query.filter(RoleModel.name==userrole).first()
            user_role = UserRoleModel(user_id=data.id, role_id=default_role.id)
            user_role.save()
            return data, 200
        except Exception as e:
            logger.error(e)
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
                        if key != 'role':
                            if value != "" and getattr(data, key) != value:
                                setattr(data, key, value)
                        else:
                            roleuserdata = UserRoleModel.query.filter(UserRoleModel.user_id==user_id).first()
                            roleId = RoleModel.query.filter(RoleModel.name == value).first()
                            roleuserdata.role_id = roleId.id
                            roleuserdata.save()
                    data.save()
                    return data, 200 
                else:
                    return jsonify({"status":"error", "msg": f"this {user_id} does not exist"}), 404
            else:
                return jsonify({"status":"error", "msg":"user data is missing"}), 404
        except Exception as e:
            logger.error(e)
            print(e)
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
            print(e)
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

class CreateSuperUserApiView(MethodView):

    @bp.arguments(PostUserSchema)
    @bp.response(200, GetUserSchema(many=False))
    def post(self, userSchema):
        try:
            user_db = UserModel.query.all()
            if len(user_db) == 0:
                data = UserModel(**userSchema)
                data.save()
                role = RoleModel(name="Admin")
                role.save()
                user_role = UserRoleModel(user_id=data.id, role_id=role.id)
                user_role.save()
                return data, 200
            return jsonify({"status":"error", "msg": "user already presents in DB"}), 403
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"status":"error", "msg": f"{str(e)}"}), 500


user_view = UsersCRUDApiViews.as_view("user")
superuser_view = CreateSuperUserApiView.as_view("superuser")

bp.add_url_rule('/superuser/', view_func=superuser_view, methods=["POST"])
bp.add_url_rule('/', view_func=user_view, methods=["POST", "GET"])
bp.add_url_rule('/<int:user_id>', view_func=user_view, methods=["GET", "DELETE", "PUT"])


username_view = GetUserNameAPIView.as_view("username")
bp.add_url_rule('/username/', view_func=username_view, methods=["GET"])

