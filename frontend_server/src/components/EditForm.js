import './AddForm.css'

export default function EditForm({project, user, task, name, description, startDate, endDate, owner, dueDate, 
                                    status, projectName, userName, email, role}){
    
    const projectAddForm = <div class="create-project-container">
        <h2>Edit Project</h2>
        <form id="create-project-form">
            <label for="project-name">Project Name</label>
            <input type="text" id="project-name" value={name} required />
            
            <label for="project-description">Description</label>
            <textarea id="project-description" value={description} required></textarea>
            
            <label for="project-start-date">Start Date</label>
            <input type="date" id="project-start-date" value={startDate} required />
            
            <label for="project-end-date">End Date</label>
            <input type="date" id="project-end-date" value={endDate} required />

            
            <label for="project-status">Status</label>
            <select id="project-status" value={status} required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>

            <label for="project-status">Owner</label>
            <select id="project-status" value={owner} required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>

            <button type="submit">Edit</button>
        </form>
    </div>;


    const taskAddForm = <div class="create-project-container">
        <h2>Edit Task</h2>
        <form id="create-project-form">
            <label for="project-name">Task Name</label>
            <input type="text" id="project-name" value={name} required />
            
            <label for="project-description">Description</label>
            <textarea id="project-description" value={description} required></textarea>
            
            <label for="project-start-date">Due Date</label>
            <input type="date" id="project-start-date" value={dueDate} required />
            
            <label for="project-status">Owner</label>
            <select id="project-status" value={owner} required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>

            
            <label for="project-status">Status</label>
            <select id="project-status" value={status} required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>

            <label for="project-status">Project</label>
            <select id="project-status" value={projectName} required>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
            </select>

            <button type="submit">Edit</button>
    </form>
    </div>;

const userAddForm = <div class="create-project-container">
        <h2>Edit User</h2>
        <form id="create-project-form">
            <label for="project-name">Username</label>
            <input type="text" id="project-name" value={userName} required />

            <label for="project-name">Email</label>
            <input type="text" id="project-name" value={email} required />

            <label for="project-name">Password</label>
            <input type="password" id="project-name" required />

            <label for="project-status">Role</label>
            <select id="project-status" value={role} required>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
            </select>
            <button type="submit">Edit</button>
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