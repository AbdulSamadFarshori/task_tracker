from flask import jsonify, request
from flask.views import MethodView
from flask_jwt_extended import jwt_required
from flask_smorest import Blueprint, abort
from logger import logger
from src.models.tasks import TaskModel, TaskLogModel
from src.models.users import UserModel
from src.models.projects import ProjectModel
from src.schemas.task_schema import *
from src.utils.helper import permission


bp = Blueprint("tasks", __name__, url_prefix="/api/tasks", description="task related operations")

class TaskAPIView(MethodView):

    @jwt_required()
    @permission('Admin', 'Task-Creator')
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
    @permission('Admin', 'Task-Creator')
    @bp.arguments(PostTaskSchema)
    @bp.response(200, GetTaskSchema)
    def post(self, reqs):
        try: 
            data = TaskModel(**reqs)
            data.save()
            return data, 200
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"status":"error",  "msg":f"An unexpected error occurred: {str(e)}"}), 500
        
    @jwt_required()
    @permission('Admin', 'Task-Creator')
    @bp.arguments(UpdateTaskSchema)
    @bp.response(200, GetTaskSchema)
    def put(self, reqs, task_id):
        try:
            data = TaskModel.query.filter(TaskModel.id == task_id).first()
            if data:
                for key, value in reqs.items():
                    if key != 'assignee':
                        if value != '' and getattr(data, key) != value :
                            setattr(data, key, value) 
                data.save()
                return data, 200
            else:
                return jsonify({"status":"error", "msg": "Task not found"}), 404
        except Exception as e:
            logger.error(e)
            return jsonify({"status":"error", "msg": {str(e)}}), 500
        
    @jwt_required()
    @permission('Admin', 'Task-Creator')
    def delete(self, task_id):
        try:
            data = TaskModel.query.filter(TaskModel.id == task_id).first()
            if data:
                idx = data.id
                data.delete()
                return jsonify({"id":idx}), 200
            else:
                return abort(404, message="Task is not available in the database.")
        
        except Exception as e:
            print(e)
            logger.error(e)
            return jsonify({"status":"error", "msg":f"An unexpected error occurred: {str(e)}"}), 500
        
    
class StaffTaskAPIView(MethodView):
    @jwt_required()
    @permission('Admin', 'Task-Creator', 'Read-Only')
    def get(self, user_id):
        try:
            if user_id:
                temp = TaskModel.query.filter(TaskModel.user_id == user_id).all()
                data = [t.task for t in temp]
                return GetTaskSchema(many=True).dump(data), 200
            else:
                return abort(404, message="user id is none.")
        
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"status": "error", "msg": f"An unexpected error occurred: {str(e)}"}), 500
        
    @jwt_required()
    @permission('Admin', 'Task-Creator', 'Read-Only')
    @bp.arguments(TaskLogSchema)
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
            return jsonify({"status": "error", "msg": f"An unexpected error occurred: {str(e)}"}), 500
        
class ProjectTaskAPIView(MethodView):
    
    @jwt_required()
    @permission('Admin', 'Task-Creator')
    def get(self, project_id):
        try:
            if project_id:
                data = TaskModel.query.filter(TaskModel.project_id == project_id).all()
                return GetTaskSchema(many=True).dump(data), 200
            else:
                return abort(404, message="project id is none.")
        except Exception as e:
            logger.error(e)
            print(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


class TaskStatusChangeApiView(MethodView):

    @jwt_required()
    @permission('Admin', 'Task-Creator', 'Read-Only')
    @bp.arguments(UpdateTaskStatus)
    @bp.response(200, GetTaskSchema(many=False))
    def put(self, reqs, task_id):
        try:
            new_status = reqs.get('status')
            changed_by = reqs.get('changed_by')
            data = TaskModel.query.filter(TaskModel.id == task_id).first()
            old_status = data.status
            data.status = new_status
            status_log = TaskLogModel(task_id=task_id, 
                                      old_status=old_status, 
                                      new_status=new_status, 
                                      changed_by=changed_by
                                      )
            status_log.save()
            return data
        except Exception as e:
            logger.error(e)
            return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500
        
TaskView = TaskAPIView.as_view('task')
StaffTaskView = StaffTaskAPIView.as_view('staff_task')
ProjectTaskView = ProjectTaskAPIView.as_view('project_task')
TaskStatusview = TaskStatusChangeApiView.as_view('task_status')

bp.add_url_rule('/', view_func=TaskView, methods=["POST", "GET"])
bp.add_url_rule('/<int:task_id>', view_func=TaskView, methods=["GET", "DELETE", "PUT"])

bp.add_url_rule('/staff/<int:user_id>', view_func=StaffTaskView, methods=["GET"])
bp.add_url_rule('/staff/', view_func=StaffTaskView, methods=["PUT"])

bp.add_url_rule('/project/<int:project_id>', view_func=ProjectTaskView, methods=["GET"])
bp.add_url_rule('/<int:task_id>/status', view_func=TaskStatusview, methods=["PUT"])
