from flask import jsonify, request
from flask.views import MethodView
from flask_jwt_extended import jwt_required
from flask_smorest import Blueprint, abort
from logger import logger
from src.models.tasks import TaskModel
from src.models.users import UserModel
from src.models.projects import ProjectModel
from src.schemas.schema import *


bp = Blueprint("tasks", __name__, url_prefix="/api/tasks/", description="task related operations")


class TaskAPIView(MethodView):

    @jwt_required()
    def get(self, task_id=None):
        try:
            if task_id:
                data = TaskModel.query.filter(TaskModel.id == task_id).first()
                return GetTaskSchema(many=False).dump(data), 200
            else:
                data = TaskModel.query.all()
                return GetTaskSchema(many=True).dump(data), 200
        except Exception as e:
            logger.error(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
    @jwt_required()
    @bp.arguments(PostTaskSchema)
    def post(self, reqs):
        try:
            username = reqs.pop('user')
            projectName = reqs.pop('project')
            user_data = UserModel.query.filter(UserModel.username == username).first()
            project_data = ProjectModel.query.filter(ProjectModel.project_name == projectName).first()
            reqs['project_id'] = project_data.id
            reqs['user_id'] = user_data.id
            reqs['user'] = user_data
            reqs['project'] = project_data 
            data = TaskModel(**reqs)
            data.save()
            return jsonify({"status":"ok", "msg": "successfully added the task"}), 200
        except Exception as e:
            logger.error(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
    
    @jwt_required()
    @bp.arguments(UpdateTaskSchema(many=False))
    def put(self, reqs):
        try:
            idx = reqs['id']
            data = TaskModel.query.filter(TaskModel.id == idx).first()

            if data and len(reqs) == 2:
                data.status = reqs.get('status') if reqs.get('status') != "" and reqs.get('status') != data.status else data.status
                data.save()
                return jsonify({"status":"ok", "msg": "successfully edited the task"}), 200

            elif data and len(reqs) > 2:
                data.name = reqs.get('name') if reqs.get('name') != "" and reqs.get('name') != data.name else data.name
                data.description = reqs.get('description') if reqs.get('description') != "" and reqs.get('description') != data.description else data.description
                data.due_date = reqs.get('due_date') if reqs.get('due_date') != "" and reqs.get('due_date') != data.due_date else data.due_date
                data.status = reqs.get('status') if reqs.get('status') != "" and reqs.get('status') != data.status else data.status
                user_data = UserModel.query.filter(UserModel.username == reqs.get('user')).first()
                project_data = ProjectModel.query.filter(ProjectModel.project_name == reqs.get('project')).first()
                if user_data != reqs.get('user') and reqs.get('user') != "":
                    data.user_id = user_data.id
                    data.user = user_data
                if project_data != reqs.get('project') and reqs.get('project') != "":
                    data.project_id = project_data.id
                    data.project = project_data
                data.save()
                return jsonify({"status":"ok", "msg": "successfully edited the task"}), 200
            else:
                return abort(404, message="Task is not available in the database.")
        except Exception as e:
            logger.error(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
    @jwt_required()
    def delete(self, task_id):
        try:
            data = TaskModel.query.filter(TaskModel.id == task_id).first()
            if data:
                data.delete()
                return jsonify({"status":"ok", "msg": "successfully deleted the task"}), 200
            else:
                return abort(404, message="Task is not available in the database.")
        
        except Exception as e:
            logger.error(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
    
class StaffTaskAPIView(MethodView):

    @jwt_required()
    def get(self, user_id):
        try:
            if user_id:
                data = TaskModel.query.filter(TaskModel.user_id == user_id).all()
                return GetTaskSchema(many=True).dump(data), 200
            else:
                return abort(404, message="user id is none.")
        
        except Exception as e:
            logger.error(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
    @jwt_required()
    @bp.arguments(UpdateTaskStatusSchema)
    def put(self, reqs):
        try:
            idx = reqs['id']
            data = TaskModel.query.filter(TaskModel.id == idx).first()
            if data:
                data.status = reqs['status']
                data.save()
                return jsonify({"status":"ok", "msg": "successfully edited the task"}), 200
            else:
                return abort(404, message="Task is not available in the database.")
        except Exception as e:
            logger.error(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
class ProjectTaskAPIView(MethodView):
    
    @jwt_required()
    def get(self, project_id):
        try:
            if project_id:
                data = TaskModel.query.filter(TaskModel.project_id == project_id).all()
                return GetTaskSchema(many=True).dump(data), 200
            else:
                return abort(404, message="project id is none.")
        except Exception as e:
            logger.error(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


TaskView = TaskAPIView.as_view('task')
StaffTaskView = StaffTaskAPIView.as_view('staff_task')
ProjectTaskView = ProjectTaskAPIView.as_view('project_task')

bp.add_url_rule('/', view_func=TaskView, methods=["POST", "GET", "PUT"])
bp.add_url_rule('/<int:task_id>', view_func=TaskView, methods=["GET", "DELETE"])

bp.add_url_rule('/staff/<int:user_id>', view_func=StaffTaskView, methods=["GET"])
bp.add_url_rule('/staff/', view_func=StaffTaskView, methods=["PUT"])

bp.add_url_rule('/project/<int:project_id>', view_func=ProjectTaskView, methods=["GET"])
