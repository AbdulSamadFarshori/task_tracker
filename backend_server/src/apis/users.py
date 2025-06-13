from flask import jsonify, request
from passlib.hash import pbkdf2_sha256
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from logger import logger 
from src.models.users import UserModel
from src.utils.helper import permission
from src.schemas.schema import GetUserSchema, PostUserSchema, UpdateUserSchema, UserNameSchema
from marshmallow import ValidationError

from flask_jwt_extended import jwt_required

bp = Blueprint('user', __name__, url_prefix='/api/users', description="users related operations")

class UsersCRUDApiViews(MethodView):

    @jwt_required()
    @permission()
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
    @permission()
    @bp.arguments(PostUserSchema)
    @bp.response(200, GetUserSchema)
    def post(self, userSchema):
        try:
            userSchema["password"] = pbkdf2_sha256.hash(userSchema["password"])
            data = UserModel(**userSchema)
            data.save()
            return jsonify({"status": "ok", "msg": "user has been successfully added"}), 201
        except ValidationError as e:
            return jsonify({"status":"error", "msg":e.errors()}), 400
        except Exception as e:
            logger.error(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500

    @jwt_required()
    @permission() 
    @bp.arguments(UpdateUserSchema)
    def put(self, reqs):
        print(reqs)
        if reqs:
            user_id = reqs['id']
            data = UserModel.query.filter(UserModel.id==user_id).first()
            if data:
                try:
                    data.username = reqs['username'] if reqs['username'] != "" and reqs['username'] != data.username else data.username
                    data.email = reqs['email'] if reqs['email'] != "" and reqs['email'] != data.email else data.email
                    hash_password = pbkdf2_sha256.hash(reqs['password']) if reqs['password'] or reqs['password'] != "" else None
                    data.password = hash_password if hash_password is not None and hash_password != data.password  else data.password
                    data.role = reqs['role'] if reqs['role'] != data.role else data.role
                    data.save()
                    return jsonify({"status": "ok", "msg": "user has been successfully edited"}), 201 
                except ValidationError as e:
                    return jsonify({"status":"error", "msg":e.errors()}), 400
                except Exception as e:
                    logger.error(e)
                    return jsonify({"status":"error", "msg" : f"An unexpected error occurred: {str(e)}"}), 500
            else:
                return jsonify({"status":"error", "msg": f"this {user_id} does not exist"}), 404
        else:
            return jsonify({"status":"error", "msg":"user data is missing"}), 404

    @jwt_required()
    @permission()
    def delete(self, user_id : int):
        try:
            data = UserModel.query.filter(UserModel.id==user_id).first()
            if not data:
                return jsonify({"status":"error", "msg": "user is not present in database"}), 404
            else:
                name = data.username
                data.delete()
                return jsonify({"status":"error", "msg": f"user {name} has been removed from database"}), 201
        except Exception as e:
            logger.error(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500
        

class GetUserNameAPIView(MethodView):

    @jwt_required()
    @permission()
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

bp.add_url_rule('/', view_func=user_view, methods=["POST", "GET", "PUT"])
bp.add_url_rule('/<int:user_id>', view_func=user_view, methods=["GET", "DELETE"])


username_view = GetUserNameAPIView.as_view("username")
bp.add_url_rule('/username/', view_func=username_view, methods=["GET"])

