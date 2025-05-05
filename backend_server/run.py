from flask import Flask
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

from db import db
from src import models
from src.admins.admins import UserAdmin, ProjectAdmin, TaskAdmin 
from src.apis.users import bp as UserBlueprint




app = Flask("__name___")
CORS(app)

admin = Admin(app, name='My Admin Panel', template_mode='bootstrap4')


# configs
app.config["SECRET_KEY"] = "assdfga453@"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"

db.init_app(app)


with app.app_context():
    db.create_all()


# Register Blueprints Here
app.register_blueprint(UserBlueprint)


# Register models with flask-admin
admin.add_view(UserAdmin(models.UserModel, db.session))
admin.add_view(ProjectAdmin(models.ProjectModel, db.session))
admin.add_view(TaskAdmin(models.TaskModel, db.session))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)