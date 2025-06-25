from src.models.users import UserModel, RoleModel, UserRoleModel
from run import app, db

roleData = [
    {'name': 'Admin'},
    {'name':'Task-Creator'}, 
    {'name':'Read-Only'}
    ]

userData = {"username":"Admin", "email":"Admin@gmail.com", "password":"Admin@1234"}

def create_roles():
    with app.app_context():
        for role in roleData:
            data = RoleModel(**role)
            print(data.name)
            db.session.add(data)
            db.session.commit() 
    print("Roles have been added..")
    return True

def create_superuser():
    with app.app_context():
        data = UserModel(**userData)
        roles = RoleModel.query.filter(RoleModel.name == 'Admin').first()
        print(roles)
        
        db.session.add(data)
        roleUserData = UserRoleModel(user_id=1, role_id=roles.id)
        db.session.add(roleUserData)
        db.session.commit() 
    print("user has been added..")

if __name__ == "__main__":
    create_roles()
    create_superuser()