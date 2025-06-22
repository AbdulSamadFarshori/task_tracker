from flask import jsonify
from datetime import datetime
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from google.oauth2 import id_token
from google.auth.transport import requests
from passlib.hash import pbkdf2_sha256
from src.models.users import UserModel, UserRoleModel
from src.schemas.login_schema import LoginOutputSchema, LoginUserSchema
from src.schemas.auth_schema import AuthSchema, AuthResponseSchema
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity
from config import GOOGLE_CLIENT_ID


bp = Blueprint('google-auth', __name__, url_prefix='/api/google-auth', description="google auth sso login operations")

class GoogleAuthApiView(MethodView):

    @bp.arguments(AuthSchema) 
    @bp.response(200, LoginOutputSchema(many=False))
    def post(self, reqs):
        try:
            roles = []
            token = reqs['token']
            try:
                id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
            except ValueError:
                return jsonify({"error": "Invalid token"}), 400
            google_email = id_info.get('email')
            data = UserModel.query.filter(UserModel.email == google_email).first()
            if data:
                user_role = UserRoleModel.query.filter(UserRoleModel.user_id == data.id).all()
                roles = [obj.role.name for obj in user_role]
            else:
                return jsonify({"status":"error", "msg":"Invalid User !!"}), 401
            user = LoginUserSchema().dump(data)
            token = create_access_token(identity=data.username)
            result = {
                            "user":user,
                            "token":token,
                            "roles": roles
                        }
            return result, 200 
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500
        
sso_view = GoogleAuthApiView.as_view('sso')
bp.add_url_rule('/', view_func=sso_view, methods=['POST'])