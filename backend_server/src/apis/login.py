from flask import jsonify
from datetime import datetime
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from passlib.hash import pbkdf2_sha256
from db import db
from src.models.users import UserModel
from src.models.tokens import TokensModel
from src.schemas.schema import LoginSchema
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity

bp = Blueprint('login', __name__, url_prefix='/api/login', description="Handle login operations")

class LoginViewApi(MethodView):

    @bp.arguments(LoginSchema)
    def post(self, reqs):
        print(reqs)
        try:
            username = reqs["username"]
            password = reqs["password"]
            print(username)
            data = UserModel.query.filter(UserModel.username == username).first()
            print(data)
            if data.username == username and pbkdf2_sha256.verify(password, data.password):
                print('get to')
                access_token = create_access_token(identity=data.id, fresh=True)
                refresh_token = create_refresh_token(identity=data.id)
                check_record = TokensModel.query.filter(TokensModel.user_id == data.id).first()
                if not check_record:
                    token_data = TokensModel(user_id=data.id, access_token=access_token, refresh_token=refresh_token)
                    token_data.save()
                else:
                    check_record.updated_at = datetime.utcnow()
                    check_record.access_token = access_token
                    check_record.refresh_token = refresh_token
                    check_record.save()
                return jsonify({"data" : {"username": data.username, 
                                          "user_id": data.id, 
                                          "admin": data.is_admin, 
                                          "staff": data.is_staff, 
                                          "access_token": access_token}}), 200 
            return abort(409, message="username or password invalid.")
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
        
login_view = LoginViewApi.as_view('login')
bp.add_url_rule('/', view_func=login_view, methods=['POST'])

            

