import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './TaskManager.css'
import { fetchUserNames } from '../projects/projectSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faScrewdriverWrench, faSquareCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

import {
  fetchProjectAllTasks,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask
} from './taskSlice';


const ProjectTaskManager = () => {
  

  const { userName} = useSelector((state) => state.projects);
  const { roles, user } = useSelector((state) => state.auth);
    
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  
useEffect(() => {
  if (error) {
    toast.error(error);
    }
}, [error]);

  const [addMode, setAddMode] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    due_date: '',
    assignee: ''


  });


  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState({
    name: '',
    description: '',
    due_date: '',
    assignee: ''


  });


  useEffect(() => {
    dispatch(fetchProjectAllTasks(projectId));
    dispatch(fetchUserNames());
  }, [dispatch]);


  const handleAddClick = ()=>{
    setAddMode(true);
  }

  const handleEditClick = (task) => {
    setEditMode(true)
    setEditTask({id: task.id,
                name: task.name,
                  description: task.description,
                  due_date:task.due_date,
                  assignee: task.assignments[0].assignee.username
    })
    console.log(editTask)
  }

  const handleEditChange = (e) => {
    setEditTask({...editTask, [e.target.name]: e.target.value});
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const update= editTask;
    dispatch(updateTask(update));
  }

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({name: newTask.name, 
        description: newTask.description, 
        due_date: newTask.due_date, 
        assignee: newTask.assignee, 
        project_id: projectId, 
        created_by :user.id}));
  };

  const handleStatusUpdate = (taskId, newStatus) => {
    const update = {status: newStatus, changed_by: user.id} 
    dispatch(updateTaskStatus({taskId : taskId, updates: update}))
  };

  return (
    <div>
        {addMode && 
      (<div style={{ marginTop: '20px' }}>
        <h3>Add-Task</h3>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <label>Description</label>
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <label>Due-Date</label>
        <input name="due_date" type="date" onChange={handleChange} />
        <label>Owner</label>
        <select name="assignee" onChange={handleChange} required>
            <option value="">Select...</option>
                {userName.map((data, idx)=>(
                        <option key={idx} value={data.id}>{data.username}</option>
                ))}
        </select>

        <button type="submit">Create Task</button>
        <button type="submit" onClick={()=>{setAddMode(false)}}>Cancel</button>
      </form>
      </div>)
    }


    {editMode && 
      (<div style={{ marginTop: '20px' }}>
        <h3>Edit-Task</h3>
      <form onSubmit={handleEditSubmit}>
        <label>Name</label>
        <input name="name" placeholder="Name" value={editTask.name} onChange={handleEditChange} required />
        <label>Description</label>
        <textarea name="description" placeholder="Description" value={editTask.description} onChange={handleEditChange} />
        <label>Due-Date</label>
        <input name="due_date" type="date" value={editTask.due_date} onChange={handleEditChange} />
        <label>Owner</label>
        <select name="assignee" value={editTask.assignee} onChange={handleEditChange} required>
            <option value="">Select...</option>
                {userName.map((data, idx)=>(
                        <option key={idx} value={data.id}>{data.username}</option>
                ))}
        </select>

        <button type="submit" >Edit Task</button>
        <button type="submit" onClick={()=>{setEditMode(false)}}>Cancel</button>
      </form>
      </div>)
    }
      
        {addMode? <></> :<button type="button" onClick={() => handleAddClick()}><FontAwesomeIcon icon={faSquarePlus} /> Task </button>}
      <h2>Task Manager</h2>
      {loading ? <p>Loading...</p> : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Assigner</th>
              <th>Assignee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.due_date}</td>
                <td>
                    {task.status === "IN_PROGRESS"?"In-Progress":task.status === "NEW"?"New":task.status === "COMPLETED"? "Completed": "-"}
                </td>
                <td>{task.creator?.username}</td>
                <td>{task.assignments[0].assignee.username}</td>
                <td>
                    {task.status === 'IN_PROGRESS' && (
                    <button onClick={() => handleStatusUpdate(task.id, 'COMPLETED')}>
                      <FontAwesomeIcon icon={faSquareCheck} /> Completed 
                    </button>
                  )}
                  {
                    task.status === 'NEW' && (
                    <button onClick={() => handleStatusUpdate(task.id, 'IN_PROGRESS')}>
                     <FontAwesomeIcon icon={faSquareCheck} /> In-Progress 
                    </button>
                  )
                  }
                  <Link onClick={() => handleEditClick(task)}><FontAwesomeIcon icon={faScrewdriverWrench} /></Link>
                  <Link type='button' onClick={()=>{dispatch(deleteTask(task.id))}}><FontAwesomeIcon icon={faTrash}/></Link> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectTaskManager;
