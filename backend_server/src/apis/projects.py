from flask import jsonify, request
from flask_smorest import Blueprint, abort
from src.models.projects import ProjectModel
from src.models.users import UserModel
from flask.views import MethodView
from flask_jwt_extended import jwt_required
from src.schemas.schema import GetProjectSchema, PostProjectSchema, UpdateProjectSchema, ProjectNameListSchema

bp = Blueprint("project", __name__, url_prefix="/api/projects", description="operate all operation related projects.")


class ProjectApiView(MethodView):

    @jwt_required()
    def get(self, project_id: int = None):
        if project_id:
            try:
                data = ProjectModel.query.filter(ProjectModel.id==project_id).first()
                return GetProjectSchema(many=False).dump(data), 200
            except Exception as e:
                return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        else:
            data = ProjectModel.query.all()
            return GetProjectSchema(many=True).dump(data), 200
        
    @jwt_required()
    @bp.arguments(PostProjectSchema)
    def post(self, reqs):
        try:
            user_data = UserModel.query.filter(UserModel.username == reqs['user']).first()
            reqs.pop('user')
            reqs['user_id'] = user_data.id
            reqs['users'] = user_data
            data = ProjectModel(**reqs)
            data.save()
            return jsonify({"status":"ok", "msg": "successfully added new project"}), 200
        except Exception as e:
            print(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
    @jwt_required()
    @bp.arguments(UpdateProjectSchema)
    def put(self, reqs):
        try:
            id = reqs["id"]
            data = ProjectModel.query.filter(ProjectModel.id == id).first()
            if data:
                data.name = reqs['project_name'] if reqs['project_name'] != "" and reqs['project_name'] != data.project_name else data.project_name
                data.description = reqs['description'] if reqs['description'] != "" and reqs['description'] != data.description else data.description
                data.start_date = reqs['start_date'] if reqs['start_date'] != "" and reqs['start_date'] != data.start_date else data.start_date
                data.end_date = reqs['end_date'] if reqs['end_date'] != "" and reqs['end_date'] != data.end_date else data.end_date
                data.status = reqs['status'] if reqs['status'] != data.status else data.status
                username = reqs.pop('owner')
                user_details = UserModel.query.filter(UserModel.username == username).first()
                print(user_details.username)
                if user_details:
                    if user_details.username != data.users.username:
                        data.user_id = user_details.id
                        data.users = user_details
                
                data.save()
                return jsonify({"status":"ok", "msg": "successfully project has been edidted."}), 200
            else:
                return abort(404, message="Project is not available in the database.")
        except Exception as e:
            print(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

    @jwt_required()
    def delete(self, project_id : int):
        try:
            data = ProjectModel.query.filter(ProjectModel.id == project_id).first()
            if data:
                data.delete()
                return jsonify({"status":"ok", "msg": "successfully deleted the project"}), 200
            else:
                return abort(404, message="Project is not available in the database.")
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


class ProjectNameListApiView(MethodView):

    @jwt_required()
    def get(self):
        try:
            data = ProjectModel.query.all()
            return ProjectNameListSchema(many=True).dump(data)
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


class GetProjectByUserId(MethodView):

    @jwt_required()
    def get(self, user_id):
        try:
            if user_id:
                data = ProjectModel.query.filter(ProjectModel.user_id == user_id).all()
                return GetProjectSchema(many=True).dump(data)
            return abort(404, message="user id is none.")
        except Exception as e:
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500



proj_view = ProjectApiView.as_view('project')
proj_name_view = ProjectNameListApiView.as_view('project_name_list')
proj_user_view = GetProjectByUserId.as_view('project_user')

bp.add_url_rule("/", view_func=proj_view, methods=["GET", "POST", "PUT"])
bp.add_url_rule("/<int:project_id>", view_func=proj_view, methods=["GET", "DELETE"])

bp.add_url_rule("/project-name/", view_func=proj_name_view, methods=["GET"])
bp.add_url_rule("/user-project/<int:user_id>", view_func=proj_user_view, methods=["GET"])