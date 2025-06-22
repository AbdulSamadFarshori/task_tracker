import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserAllTasks,
  updateTaskStatus,
} from './taskSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faScrewdriverWrench, faSquareCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons';


import { toast } from 'react-toastify';


const TaskManager = () => {
  const { roles, user } = useSelector((state) => state.auth);
  
  console.log(user.id)
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);


  useEffect(() => {
    dispatch(fetchUserAllTasks(user.id));
  }, [dispatch]);


  useEffect(() => {
    if (error) {
      toast.error(error);
      }
  }, [error]);


  // const handleAddClick = ()=>{
  //   setAddMode(true);
  // }

  // const handleChange = (e) => {
  //   setNewTask({ ...newTask, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(createTask({name: newTask.name, 
  //       description: newTask.description, 
  //       due_date: newTask.due_date, 
  //       assignee: newTask.assignee, 
  //       project_id: projectId, 
  //       created_by :user.id}));
  // };

  const handleStatusUpdate = (taskId, newStatus) => {
    const update = {status: newStatus, changed_by: user.id}
    dispatch(updateTaskStatus({taskId: taskId, updates:update} ))
  };

  return (<div>
      <h2>Task Manager</h2>
      {loading ? <p>Loading...</p> : (
        <table>
          <thead>
            <tr>
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
                      <FontAwesomeIcon icon={faSquareCheck}/> Completed
                    </button>
                  )}
                  {
                    task.status === 'NEW' && (
                    <button onClick={() => handleStatusUpdate(task.id, 'IN_PROGRESS')}>
                      <FontAwesomeIcon icon={faSquareCheck}/> In-Progress
                    </button>
                  )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TaskManager;
