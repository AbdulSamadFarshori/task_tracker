from flask import jsonify, request
from datetime import datetime
from flask_jwt_extended import decode_token
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended.exceptions import JWTDecodeError
from logger import logger
from src.models.users import UserModel
from src.models.tokens import TokensModel
from src.schemas.schema import LoginSchema, LoginOutputSchema
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity

bp = Blueprint('login', __name__, url_prefix='/api/login', description="Handle login operations")

class LoginViewApi(MethodView):

    @bp.arguments(LoginSchema)
    @bp.response(200, LoginOutputSchema(many=False))
    def post(self, reqs):
        print(reqs)
        try:
            username = reqs["username"]
            password = reqs["password"]
            data = UserModel.query.filter(UserModel.username == username).first()
            if data and  pbkdf2_sha256.verify(password, data.password):
                access_token = create_access_token(identity=data.username)
                refresh_token = create_refresh_token(identity=data.username)
                check_record = TokensModel.query.filter(TokensModel.user_id == data.id).first()
                if not check_record:
                    token_data = TokensModel(user_id=data.id, access_token=access_token, refresh_token=refresh_token)
                    token_data.save()
                else:
                    check_record.updated_at = datetime.utcnow()
                    check_record.access_token = access_token
                    check_record.refresh_token = refresh_token
                    check_record.save()
                    result = {
                        "status": "ok",
                        "username": data.username, 
                        "user_id": data.id, 
                        "role": data.role,
                        "access_token": access_token
                        }
                return result, 200 
            return jsonify({"status": "error", "msg":"username or password invalid"}), 200
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500
        
class TokenVerifyAPIView(MethodView):

    def get(self):
        auth_header = request.headers.get("Authorization", "")
        encoded_token = auth_header.replace("Bearer ", "") if auth_header.startswith("Bearer ") else auth_header
        try:
            decoded = decode_token(encoded_token)
            exp_timestamp = decoded.get("exp")
            if exp_timestamp and datetime.utcnow().timestamp() > exp_timestamp:
                return jsonify({"token_valid" : False}), 200
            return jsonify({"token_valid" : True}), 200
        except JWTDecodeError:
            return jsonify({"token_valid" : False}), 200

login_view = LoginViewApi.as_view('login')
token_verify_view = TokenVerifyAPIView.as_view('token_verification')
bp.add_url_rule('/', view_func=login_view, methods=['POST'])
bp.add_url_rule('/token-verification/', view_func=token_verify_view, methods=['GET'])

            

