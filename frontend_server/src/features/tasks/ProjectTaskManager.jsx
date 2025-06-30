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

  const [showModal, setAddModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [addMode, setAddMode] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    due_date: '',
    assignee_id: ''
  });


  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState({
    name: '',
    description: '',
    due_date: '',
    assignee_id: '',
    status: ''

  });


  useEffect(() => {
    dispatch(fetchProjectAllTasks(projectId));
    dispatch(fetchUserNames());
  }, [dispatch]);


  const handleAddClick = ()=>{
    setAddMode(true);
    setAddModal(true);
  }

  const handleEditClick = (task) => {
    setEditMode(true);
    setAddModal(true);
    setEditTask({id: task.id,
                name: task.name,
                  description: task.description,
                  due_date:task.due_date,
                  assignee_id: task.assignee.id,
                  status: task.status
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
    setAddModal(false);
    setEditMode(false);
  }

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask({name: newTask.name, 
        description: newTask.description, 
        due_date: newTask.due_date, 
        assignee_id: newTask.assignee_id, 
        project_id: projectId, 
        created_by :user.id}));
    setAddMode(false);
    setAddModal(false);
  };

  const handleStatusUpdate = (taskId, newStatus) => {
    const update = {status: newStatus, changed_by: user.id} 
    dispatch(updateTaskStatus({taskId : taskId, updates: update}))
  };

  const handleDelete = (id) => {
      setDeleteId(id);
      setAddModal(true);
      setDeleteMode(true);
      };
  
    const handleSubmitDelete = ()=>{
      dispatch(deleteTask(deleteId));
      setDeleteId('');
      setDeleteMode(false);
      setAddModal(false);

    };

  return (
      <>
      {showModal && (
        <div className="modal-backdrop">
        <div className="modal">
        {addMode && (
          <>
        <h3>Add-Task</h3>
          <form className="modal-form">
            <label><h5>Task Name</h5></label>
            <input name="name" placeholder="Name" onChange={handleChange} required />
            <label><h5>Description</h5></label>
            <textarea name="description" placeholder="Description" onChange={handleChange} />
            <label><h5>Due-Date</h5></label>
            <input name="due_date" type="date" onChange={handleChange} />
            <label><h5>Owner</h5></label>
            <select name="assignee_id" onChange={handleChange} required>
                <option value="">Select...</option>
                    {userName.map((data, idx)=>(
                      data.roles[0].role.name === "Read-Only" ? <option key={idx} value={data.id}>{data.username}</option> : <></>
                    ))}
            </select>
            <button onClick={handleSubmit} className="save-button" type="button">Save</button>
            <button type="button" className="close-button" onClick={()=>{setAddMode(false); setAddModal(false)}}>Cancel</button>
          </form>
          </>
        )}

        {editMode &&(
      <> 
        <h3>Edit-Task</h3>
      <form className="modal-form">
        <label><h5>Task Name</h5></label>
        <input name="name" placeholder="Name" value={editTask.name} onChange={handleEditChange} required />
        <label><h5>Description</h5></label>
        <textarea name="description" placeholder="Description" value={editTask.description} onChange={handleEditChange} />
        <label><h5>Due-Date</h5></label>
        <input name="due_date" type="date" value={editTask.due_date} onChange={handleEditChange} />
        <label><h5>Owner</h5></label>
        <select name="assignee" value={editTask.assignee} onChange={handleEditChange} required>
            <option value="">Select...</option>
                {userName.map((data, idx)=>(
                        <option key={idx} value={data.id}>{data.username}</option>
                ))}
        </select>
        <label><h5>Status</h5></label>
            <select name="status" value={editTask.status} onChange={handleEditChange} required>
                <option value="">Select...</option>
                <option value="NEW">New</option>
                <option value="IN_PROGRESS">In-Progress</option>
                <option value="COMPLETED">Completed</option>
            </select>
        <button type="button" className="save-button" onClick={handleEditSubmit}>Edit Task</button>
        <button type="button" className="close-button" onClick={()=>{setEditMode(false); setAddModal(false)}}>Cancel</button>
      </form>
      </>
      )}

      {deleteMode && (
          <>
          <p>Are you sure you want to delete this task?</p>
          <button type="button" className="close-button" onClick={handleSubmitDelete}> yes </button>
          <button type="button" className="save-button" style={{ marginLeft: '5px'}} onClick={()=>{setDeleteMode(false); setAddModal(false)}}> No </button>
          </>
      )}


      </div>
      </div>
      )}

        <button className="Add-button" type="button" onClick={() => handleAddClick()}><FontAwesomeIcon icon={faSquarePlus} /> Task </button>
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
                <td>{task.assignee.username}</td>
                <td>
                    {task.status === 'IN_PROGRESS' && (
                    <button className="status-button" onClick={() => handleStatusUpdate(task.id, 'COMPLETED')}>
                      <FontAwesomeIcon icon={faSquareCheck} /> Completed 
                    </button>
                  )}
                  {
                    task.status === 'NEW' && (
                    <button className="status-button" onClick={() => handleStatusUpdate(task.id, 'IN_PROGRESS')}>
                     <FontAwesomeIcon icon={faSquareCheck} /> In-Progress 
                    </button>
                  )
                  }
                  <Link onClick={() => handleEditClick(task)}><FontAwesomeIcon icon={faScrewdriverWrench} /></Link>
                  <Link type='button' onClick={() => handleDelete(task.id)} style={{ marginLeft: '10px'}}><FontAwesomeIcon icon={faTrash}/></Link> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </>
  )};

export default ProjectTaskManager;
