from flask import jsonify
from datetime import datetime
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from google.oauth2 import id_token
from google.auth.transport import requests
from passlib.hash import pbkdf2_sha256
from src.models.users import UserModel
from src.models.tokens import TokensModel
from src.schemas.schema import AuthSchema, AuthResponseSchema, UserRole
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity
from config import GOOGLE_CLIENT_ID


bp = Blueprint('google-auth', __name__, url_prefix='/api/google-auth', description="google auth sso login operations")

class GoogleAuthApiView(MethodView):

    @bp.arguments(AuthSchema) 
    @bp.response(200, AuthResponseSchema(many=False))
    def post(self, reqs):
        try:
            token = reqs['token']
            try:
                id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
            except ValueError:
                return jsonify({"error": "Invalid token"}), 400
            google_email = id_info.get('email')
            name = id_info.get('name')
            user = UserModel.query.filter(UserModel.email == google_email).first()
            if not user:
                password = pbkdf2_sha256.hash("Hello@1234")
                user = UserModel(username=name, email=google_email, password=password, role=UserRole.STAFF)
                user.save()
            access_token = create_access_token(identity=user.username)
            result = {
                        "username": user.username, 
                        "user_id": user.id, 
                        "role": user.role,
                        "access_token": access_token
                        }

            return result

        except Exception as e:
            print(e)
            return jsonify({"error": str(e)}), 500
        
sso_view = GoogleAuthApiView.as_view('sso')
bp.add_url_rule('/', view_func=sso_view, methods=['POST'])