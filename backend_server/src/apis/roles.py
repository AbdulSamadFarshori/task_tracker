from flask import jsonify, request
from flask_smorest import Blueprint, abort
from flask.views import MethodView
from flask_jwt_extended import jwt_required
from src.utils.helper import permission
from src.models.users import RoleModel, UserRoleModel, UserModel
from src.schemas.role_schema import RoleSchema, RoleChangeSchema, UserRoleSchema

bp = Blueprint("roles", __name__, url_prefix="/api/roles", description="handle role related operations.")

class RoleApiView(MethodView):

    @jwt_required()
    @permission('Admin')
    @bp.response(200, RoleSchema(many=True))
    def get(self):
        try:
            roles = RoleModel.query.all()
            return roles, 200
        except Exception as e:
            return jsonify({"status":"error", "msg":str(e)}), 500 

    @jwt_required()
    @permission('Admin')
    @bp.arguments(RoleSchema())
    def put(self, reqs, role_id):
        try:
            new_name = reqs.get('name')
            if role_id:
                role = RoleModel.query.filter(RoleModel.id == role_id)
                role.name = new_name
                role.save()
                return jsonify({"status":"ok", "msg":"Successfully updated !!"}), 200
            return jsonify({"status":"error", "msg":"Role not found"}), 404
        except Exception as e:
            return jsonify({"status":"error", "msg": str(e)}), 500
    
    @jwt_required()
    @permission('Admin')
    @bp.arguments(RoleSchema())
    def post(self, reqs):
        try:
            new_name = reqs.get('name')
            role = RoleModel(name=new_name)
            role.save()
            return jsonify({"status":"ok", "msg":"Successfully new role created !!"}), 200
        except Exception as e:
            return jsonify({"status":"error", "msg": str(e)}), 500
    
    @jwt_required()
    @permission('Admin')
    def delete(self, role_id):
        pass

class UserRoleApiVeiw(MethodView):
    
    @jwt_required()
    @permission('Admin')
    def get(self, user_id):
        try:
            if user_id:
                data = UserRoleModel.query.filter(UserRoleModel.user_id == user_id).all() 
                role_list = [role.role.name for role in data]
                return jsonify({"status":"ok", "roles": role_list})
            return jsonify({"status":"error", "msg":"user_id not present."}), 404
        except Exception as e:
            return jsonify({"status":"error", "msg":str(e)}), 500 
    
    @jwt_required()
    @permission('Admin')
    @bp.arguments(RoleChangeSchema())
    def put(self, reqs, user_id):
        try:
            user_id = user_id
            new_roles = reqs.get('roles')
            if not user_id:
                return jsonify({"status": "error", "msg": "User ID not provided."}), 400
            deleted_count = UserRoleModel.query.filter_by(user_id=user_id).delete()
            role_objs = RoleModel.query.filter(RoleModel.name.in_(new_roles)).all()
            if len(role_objs) != len(new_roles):
                existing_role_names = {r.name for r in role_objs}
                missing_roles = [r for r in new_roles if r not in existing_role_names]
                return jsonify({"status": "error", "msg": f"Roles not found: {', '.join(missing_roles)}"}), 404
            new_user_roles = [UserRoleModel(user_id=user_id, role_id=role.id) for role in role_objs]
            UserRoleModel.bulk_save(new_user_roles)
            return jsonify({"status": "ok", "msg": "Roles successfully updated."}), 200
        except Exception as e:
            print(e)
            UserRoleModel.roll_back()
            return jsonify({"status": "error", "msg": str(e)}), 500

    @jwt_required()
    @permission('Admin')
    @bp.arguments(UserRoleSchema)
    def delete(self, reqs, user_id):
        try:
            role_id = reqs.get('role_id')
            if user_id:
                user_objs = UserRoleModel.query.filter(UserRoleModel.user_id == user_id and UserRoleModel.role_id == role_id).all()
                for user in user_objs:
                    user.delete()
                return jsonify({"status":"ok", "msg":"Successfully roles deleted"}), 200
            return jsonify({"status":"error", "msg":"user_id not present."}), 404
        except Exception as e:
            return jsonify({"status":"error", "msg":str(e)}), 500
        
RoleView = RoleApiView.as_view('role')
UserRoleView = UserRoleApiVeiw.as_view('user_role')

bp.add_url_rule('/', view_func=RoleApiView, methods=["GET", "POST"])
bp.add_url_rule('/<int:role_id>', view_func=RoleApiView, methods=["PUT", "DELETE"])


bp.add_url_rule('/user/<int:user_id>', view_func=UserRoleView, methods=["GET", "PUT", "DELETE"])



        








