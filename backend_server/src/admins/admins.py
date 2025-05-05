from flask_admin.contrib.sqla import ModelView


class UserAdmin(ModelView):
    column_list = ('created_at', 'updated_at', 'username', 'password', 'is_admin', 'is_staff')
    # column_labels = {'username': 'Username', 'password': 'Password', 'is_admin': 'Is_Admin', 'is_staff': 'Is_staff'}
    # column_filters = ('username')

class ProjectAdmin(ModelView):
    column_list = ('id', 'created_at', 'updated_at', 'project_name', 'description', 'start_date', 'end_date', 'user')
    # column_labels = {'project_name': 'Project Name', 'description':'Description', 'start_date': 'Start Date', 'end_date': 'End Date'}
    # column_filters = ('project_name','start_date', 'end_date', 'users.username')

class TaskAdmin(ModelView):
    column_list = ('id', 'created_at', 'updated_at', 'name', 'description', 'due_date', 'status')
    # column_labels = {'task_name': 'Task Name', 'description':'Description', 'due_date': 'Due Date', 'status': 'Status'}
    # column_filters = ('task_name', 'due_date', 'status', 'users.username', 'projects.project_name')