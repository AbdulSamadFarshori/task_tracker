from src.models.users import UserModel
from run import app, db

userData = {
            "username":"Admin",
            "email": "Admin@gmail.com",
            "password": "Admin@1234",
            "role": "ADMIN"
            }

def create_superuser():
    with app.app_context():
        data = UserModel(**userData)
        print(data.username)
        db.session.add(data)
        db.session.commit()
        
    print("superuser has been added..")
    return True


if __name__ == "__main__":
    create_superuser()