from flask import Flask, jsonify
from flask_smorest import Api
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

from db import db
from src import models
from src.admins.admins import UserAdmin, ProjectAdmin, TaskAdmin 
from src.apis.users import bp as UserBlueprint
from src.apis.login import bp as LoginBlueprint
from src.apis.google_auth import bp as SSOBlueprint

app = Flask("__name___")

CORS(app, resources={r"/*":{"origins": "http://localhost:8000"}})


admin = Admin(app, url='/api/admin' name='My Admin Panel', template_mode='bootstrap4')


# configs
app.config["JWT_SCERET_KEY"] = "123421342"
app.config["PROPAGATE_EXCEPTIONS"] = True
app.config["API_TITLE"] = "TASK TRACKER"
app.config["API_VERSION"] = "V1"
app.config["OPENAPI_VERSION"] ="3.0.3"
app.config["OPENAPI_URL_PREFIX"] = "/"
app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
app.config["SECRET_KEY"] = "assdfga453@"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

db.init_app(app)


api = Api(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)


@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({"message": "the token has expired", "error":"expired token"})

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"massege":"signature validation failed.", "error":"invalid token"})

@jwt.unauthorized_loader
def missing_token_loader(error):
    return jsonify({"message":"Request does not contain an access token.", "error":"authorization required"})

with app.app_context():
    db.create_all()


# Register Blueprints Here
api.register_blueprint(UserBlueprint)
api.register_blueprint(LoginBlueprint)
api.register_blueprint(SSOBlueprint)


# Register models with flask-admin
admin.add_view(UserAdmin(models.UserModel, db.session))
admin.add_view(ProjectAdmin(models.ProjectModel, db.session))
admin.add_view(TaskAdmin(models.TaskModel, db.session))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)