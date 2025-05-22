from flask import jsonify
from datetime import datetime
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from google.oauth2 import id_token
from google.auth.transport import requests
from passlib.hash import pbkdf2_sha256
from db import db
from src.models.users import UserModel
from src.models.tokens import TokensModel
from src.schemas.schema import AuthSchema
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity
from config import GOOGLE_CLIENT_ID


bp = Blueprint('google-auth', __name__, url_prefix='/google-auth', description="google auth sso login operations")

class GoogleAuthApiView(MethodView):

    @bp.arguments(AuthSchema) 
    def post(self, reqs):
        try:
            token = reqs['token']
            print(token)
            try:
                id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
            except ValueError:
                return jsonify({"error": "Invalid token"}), 400
            google_email = id_info.get('email')
            user = UserModel.query.filter(UserModel.email == google_email).first()

            # if not user:
            #     user = create_user(email=google_email)

            jwt_token = create_access_token(identity=user.id)

            return jsonify({"success": True, "token": jwt_token})

        except Exception as e:
            return jsonify({"error": str(e)}), 500
        
sso_view = GoogleAuthApiView.as_view('sso')
bp.add_url_rule('/', view_func=sso_view, methods=['POST'])