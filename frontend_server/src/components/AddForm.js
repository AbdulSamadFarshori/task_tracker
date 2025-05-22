import './AddForm.css'

export default function AddForm({project, task, user}){
    const projectAddForm = <div class="create-project-container">
        <h2>Create New Project</h2>
        <form id="create-project-form">
            <label for="project-name">Project Name</label>
            <input type="text" id="project-name" required />
            
            <label for="project-description">Description</label>
            <textarea id="project-description" required></textarea>
            
            <label for="project-start-date">Start Date</label>
            <input type="date" id="project-start-date" required />
            
            <label for="project-end-date">End Date</label>
            <input type="date" id="project-end-date" required />
            
            <label for="project-status">Status</label>
            <select id="project-status" required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>

            <label for="project-status">Owner</label>
            <select id="project-status" required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>

            <button type="submit">Create Project</button>
        </form>
    </div>;


const taskAddForm = <div class="create-project-container">
        <h2>Create New Task</h2>
        <form id="create-project-form">
            <label for="project-name">Task Name</label>
            <input type="text" id="project-name" required />
            
            <label for="project-description">Description</label>
            <textarea id="project-description" required></textarea>
            
            <label for="project-start-date">Due Date</label>
            <input type="date" id="project-start-date" required />
            
            <label for="project-status">Owner</label>
            <select id="project-status" required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>
            
            <label for="project-status">Status</label>
            <select id="project-status" required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>

            <label for="project-status">Project</label>
            <select id="project-status" required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>

            <button type="submit">Create Task</button>
    </form>
    </div>;


const userAddForm = <div class="create-project-container">
        <h2>Create New User</h2>
        <form id="create-project-form">
            <label for="project-name">Username</label>
            <input type="text" id="project-name" required />

            <label for="project-name">Email</label>
            <input type="text" id="project-name" required />

            <label for="project-name">Password</label>
            <input type="password" id="project-name" required />

            <label for="project-status">Role</label>
            <select id="project-status" required>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
            </select>
            <button type="submit">Create User</button>
        </form>
        </div>;

let AddForm = <p></p>;

if (project){
    AddForm = projectAddForm;

}
else if (task){
    AddForm = taskAddForm;
}

else if (user){
    AddForm = userAddForm;
}

return AddForm
}