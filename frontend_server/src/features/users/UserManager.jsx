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

  const [addMode, setAddMode] = useState(false);
  const [addData, setAddData] = useState({username: '', email: '', password : ''})

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ id: '', username: '', email: '', password : '' });

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
  }

  const handleEditClick = (user) => {
    setEditMode(true);
    setEditData({ id: user.id, username: user.username, email: user.email, password: '' });
  };

  const handleAddChange = (e) => {
    setAddData({...addData, [e.target.name]: e.target.value })
  }

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = (e) => {
    console.log(addData)
    e.preventDefault();
    dispatch(addUser({username: addData.username, email: addData.email, password: addData.password}));
    setAddMode(false);
  } 

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({ id: editData.id, updates: editData }));
    setEditMode(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div>
      {addMode && (
        <div style={{ marginTop: '20px' }}>
          <h3>Add User</h3>
          <form onSubmit={handleAddSubmit}>
            <input
              name="username"
              value={addData.username}
              onChange={handleAddChange}
              placeholder="Username"
              required
            />
            <input
              name="email"
              type="email"
              value={addData.email}
              onChange={handleAddChange}
              placeholder="Email"
              required
            />
            <input
              name="password"
              type="password"
              value={addData.password}
              onChange={handleAddChange}
              placeholder="Password"
              require
              />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setAddMode(false)} style={{ marginLeft: '10px' }}>Cancel</button>
          </form>
        </div>
      )}
      {addMode || editMode? <></> :<button type="button" onClick={() => handleAddClick()}><FontAwesomeIcon icon={faSquarePlus}/> User </button>}
      {editMode && (
        <div style={{ marginTop: '20px' }}>
          <h3>Edit User</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              name="username"
              value={editData.username}
              onChange={handleEditChange}
              placeholder="Username"
              required
            />
            <input
              name="email"
              type="email"
              value={editData.email}
              onChange={handleEditChange}
              placeholder="Email"
              required
            />
            <input
              name="password"
              type="password"
              value={editData.password}
              onChange={handleEditChange}
              placeholder="Password"
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>Cancel</button>
          </form>
        </div>
      )}

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
  );
};

export default UserManager;
