from flask import jsonify, Blueprint
from flask_restful.reqparse import request
from flask.views import MethodView
from db import db
from src.models.users import UserModel
from src.schemas.schema import UserRequestSchema
from flask_pydantic import validate, ValidationError

bp = Blueprint('user', __name__, url_prefix='/users')

class UsersApiViews(MethodView):

    def get(self, user_id=None):
        if user_id:
            user = db.session.query(UserModel).filter(id==user_id).first()
            user = UserRequestSchema.from_orm(user)
            return jsonify({'data': user}), 200
        else:
            users = db.session.query(UserModel).all()
            all_user_schema = [UserRequestSchema.from_orm(user) for user in users]
            users = [user_schema.dict() for user_schema in all_user_schema]
            return jsonify({"data":users}), 200

    @validate()
    def post(self, UserRequest : UserRequestSchema):
        try:
            data = UserModel(**UserRequest)
            data.save()
            return jsonify({"data":UserRequest}), 201
        except ValidationError as e:
            return jsonify({"errors": e.errors()}), 400
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

    @validate()
    def put(self, user_id : int):
        user_data = request.get_json()
        if user_data:
            data = db.session.query(UserModel).filter_by(id==user_id).first()
            if data:
                try:
                    user_request = UserRequestSchema(**user_data)
                    data.username = user_request.username
                    data.password = user_request.password
                    data.is_admin = user_request.is_admin
                    data.is_staff = user_request.is_staff
                    data.save()
                except ValidationError as e:
                    return jsonify({"errors": e.errors()}), 400
                except Exception as e:
                    return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
            else:
                return jsonify({"data": user_request}), 200
        else:
            return jsonify({"error": f"this {user_id} does not exist"}), 404

    def delete(self, user_id : int):
        try:
            data = db.session.query(UserModel).filter_by(id==user_id).first()
            if not data:
                return jsonify({'error': 'user is not present in database'}), 404
            else:
                data.delete()
                return jsonify({'error': 'user has been removed from database'}), 201
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        


user_view = UsersApiViews.as_view("user")

bp.add_url_rule('/', view_func=user_view, methods=["POST", "GET"])
bp.add_url_rule('/<int:user_id>', view_func=user_view, methods=["GET", "PUT", "DELETE"])