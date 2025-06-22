from flask import jsonify, request
from flask_smorest import Blueprint, abort
from src.models.projects import ProjectModel
from src.models.users import UserModel
from flask.views import MethodView
from logger import logger
from flask_jwt_extended import jwt_required
from src.utils.helper import permission
from src.schemas.project_schema import ProjectSchema, ProjectNameListSchema, StatusChangeSchema

bp = Blueprint("project", __name__, url_prefix="/api/projects", description="operate all operation related projects.")


class ProjectApiView(MethodView):

    @jwt_required()
    @permission('Admin', 'Task-Creator')
    def get(self, project_id: int = None):
        
        try:
            if project_id:
                data = ProjectModel.query.filter(ProjectModel.id==project_id).first()
                return ProjectSchema(many=False).dump(data), 200
            else:
                data = ProjectModel.query.all()
                return ProjectSchema(many=True).dump(data), 200
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500
        
        
    @jwt_required()
    @permission('Admin', 'Task-Creator')
    @bp.arguments(ProjectSchema)
    @bp.response(200, ProjectSchema)
    def post(self, reqs):
        try:
            user_data = UserModel.query.filter(UserModel.id == reqs['created_by']).first()
            reqs['users'] = user_data
            data = ProjectModel(**reqs)
            data.save()
            return data, 200
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500
    
    @jwt_required()
    @permission('Admin', 'Task-Creator')
    @bp.arguments(ProjectSchema)
    @bp.response(200, ProjectSchema)
    def put(self, reqs, project_id):
        try:
            if reqs:
                idx = project_id
                data = ProjectModel.query.filter(ProjectModel.id == idx).first()
                if data:
                   for key, value in reqs.items():
                       if value != "" and getattr(data, key) != value:
                           setattr(data, key, value) 
                data.save()
                return data, 200
            else:
                return abort(404, message="Project is not available in the database.")
        except Exception as e:
            logger.error(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500

    @jwt_required()
    @permission('Admin', 'Task-Creator')
    def delete(self, project_id : int):
        try:
            data = ProjectModel.query.filter(ProjectModel.id == project_id).first()
            idx = data.id
            if data:
                data.delete()
                return jsonify({"id":idx}), 201
            else:
                return abort(404, message="Project is not available in the database.")
        except Exception as e:
            logger.error(e)
            return jsonify({"status":"error", "msg": f"An unexpected error occurred: {str(e)}"}), 500


class ProjectNameListApiView(MethodView):

    @jwt_required()
    # @permission()
    def get(self):
        try:
            data = ProjectModel.query.all()
            return ProjectNameListSchema(many=True).dump(data), 201
        except Exception as e:
            logger.error(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


class GetProjectByUserId(MethodView):

    @jwt_required()
    @permission('Admin', 'Task-Creator')
    def get(self, user_id):
        try:
            if user_id:
                data = ProjectModel.query.filter(ProjectModel.created_by == user_id).all()
                return ProjectSchema(many=True).dump(data)
            return abort(404, message="user id is none.")
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


class ChangeProjectStatusView(MethodView):
    
    @jwt_required()
    @permission('Admin', 'Task-Creator')
    @bp.arguments(StatusChangeSchema)
    @bp.response(200, ProjectSchema)
    def put(self, reqs,  project_id):
        try:
            status = reqs.get('status')
            data = ProjectModel.query.filter(ProjectModel.id == project_id).first()
            if data:
                data.status = status
                data.save()
                return data, 201
            return jsonify({'status':'error', 'msg':'data not found.'}), 404
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


proj_view = ProjectApiView.as_view('project')
proj_name_view = ProjectNameListApiView.as_view('project_name_list')
proj_user_view = GetProjectByUserId.as_view('project_user')

status_change_view = ChangeProjectStatusView.as_view('status_change')


bp.add_url_rule("/", view_func=proj_view, methods=["GET", "POST"])
bp.add_url_rule("/<int:project_id>", view_func=proj_view, methods=["GET", "DELETE", "PUT"])

bp.add_url_rule("/project-name/", view_func=proj_name_view, methods=["GET"])
bp.add_url_rule("/user/<int:user_id>", view_func=proj_user_view, methods=["GET"])
bp.add_url_rule("/status/<int:project_id>", view_func=status_change_view, methods=["PUT"])