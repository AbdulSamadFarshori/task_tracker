import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsers,
  editUser,
  deleteUser,
  addUser
} from './userSlice';

import { toast } from 'react-toastify';
import './userManager.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faScrewdriverWrench, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const UserManager = () => {
  const dispatch = useDispatch();
  const { list: users, loading, error } = useSelector((state) => state.users);

  const [showModal, setShowModal] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [addData, setAddData] = useState({username: '', email: '', password : '', role: ''})
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ id: '', username: '', email: '', password : '', role: '' });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      }
  }, [error]);

  const handleAddClick = () =>{
    setAddMode(true);
    setShowModal(true);
  }

  const handleEditClick = (user) => {
    setEditMode(true);
    setShowModal(true);
    setEditData({ id: user.id, username: user.username, email: user.email, password: '', role: user.roles[0].role.name});
  };

  const handleAddChange = (e) => {
    setAddData({...addData, [e.target.name]: e.target.value })
  }

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser({username: addData.username, email: addData.email, password: addData.password, role: addData.role}));
    setAddMode(false);
    setShowModal(false);
  
  } 

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({ id: editData.id, updates: editData }));
    setEditMode(false);
    setShowModal(false);

  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
    setDeleteMode(true);
    };

  const handleSubmitDelete = ()=>{
    dispatch(deleteUser(deleteId));
    setDeleteId('');
    setDeleteMode(false);
    setShowModal(false);
  };

  return (
        <>
        {showModal && (<div className="modal-backdrop">
          <div className="modal">
        {addMode && (
          <>
          <h3>Add User</h3>
          <legend>
          <form className="modal-form">
            <label><h5>USERNAME</h5></label>
            <input name="username" value={addData.username} onChange={handleAddChange} placeholder="Username" required/>
            <label><h5>EMAIL</h5></label>
            <input name="email" type="email" value={addData.email} onChange={handleAddChange} placeholder="Email" required/>
            <label><h5>PASSWORD</h5></label>
            <input name="password" type="password" value={addData.password} onChange={handleAddChange} placeholder="Password" required/>
            <label><h5>ROLE</h5></label>
            <select name="role" onChange={handleAddChange} required>
                <option value="">Select...</option>
                <option value="Admin">Admin</option>
                <option value="Task-Creator">Task-Creator</option>
                <option value="Read-Only">Read-Only</option>
            </select>
            <button type="button" className="save-button" onClick={handleAddSubmit}>Save</button>
            <button type="button" className="close-button" onClick={() => {setAddMode(false); setShowModal(false)}}>Cancel</button>
          </form>
          </legend>
            </>
        )}

        {editMode && (
          <>
          <h3>Edit User</h3>
          <form className="modal-form">
            <label><h5>USERNAME</h5></label>
            <input name="username" value={editData.username} onChange={handleEditChange} placeholder="Username" required/>
            <label><h5>EMAIL</h5></label>
            <input name="email" type="email" value={editData.email} onChange={handleEditChange} placeholder="Email" required/>
            <label><h5>PASSWORD</h5></label>
            <input name="password" type="password" value={editData.password} onChange={handleEditChange} placeholder="Password" />
            <label><h5>ROLE</h5></label>
            <select name="role" value={editData.role} onChange={handleEditChange} required>
                <option value="">Select...</option>
                <option value="Admin">Admin</option>
                <option value="Task-Creator">Task-Creator</option>
                <option value="Read-Only">Read-Only</option>
                
            </select>
            <button className="save-button" type="button" onClick={handleEditSubmit}>Save</button>
            <button className="close-button" type="button" onClick={() => {setEditMode(false); setShowModal(false);} }>Cancel</button>
          </form>
            </>
      )}

      {deleteMode && (
          <>
          <p>Are you sure you want to delete this user?</p>
          <button type="button" className="close-button" onClick={handleSubmitDelete}> yes </button>
          <button type="button" className="save-button" style={{ marginLeft: '5px'}} onClick={()=>{setDeleteMode(false); setShowModal(false)}}> No </button>
          </>
      )}
        </div>
      </div>)}

    <button className="Add-button" type="button" onClick={() => handleAddClick()}><FontAwesomeIcon icon={faSquarePlus}/> User </button>
      
      <div>
      <h2>User Manager</h2>
      {loading ? <p>Loading users...</p> : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.roles?.map(r => r.role?.name).join(', ') || 'N/A'}</td>
                <td>
                  <Link onClick={() => handleEditClick(user)}><FontAwesomeIcon icon={faScrewdriverWrench} /></Link>
                  <Link onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px'}}><FontAwesomeIcon icon={faTrash} /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </>
)};

export default UserManager;
