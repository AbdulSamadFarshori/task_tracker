// src/features/roles/RoleManager.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRoles,
  assignRolesToUser,
  fetchUserRoles,
} from './roleSlice';
import { fetchUsers } from '../users/userSlice';
import './RoleManager.css';

import { toast } from 'react-toastify';


const RoleManager = () => {
  const dispatch = useDispatch();
  const { allRoles, error} = useSelector((state) => state.roles);
  const users = useSelector((state) => state.users.list || []);
  const [selectedRoles, setSelectedRoles] = useState({});

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchUsers());
  }, [dispatch]);

useEffect(() => {
  if (error) {
    toast.error(error);
  }
}, [error]);


  const handleChange = (userId, value) => {
    setSelectedRoles((prev) => ({ ...prev, [userId]: value }));
  };

  const handleSubmit = (userId) => {
    const roles = selectedRoles[userId];
    dispatch(assignRolesToUser({ userId, roles }));
  };

  return (
    <div>
      <h2>Role Manager</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Assign Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const userRoleNames = user.roles?.map((r) => r.role?.name) || [];
            return (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>
                  <select
                    multiple
                    value={selectedRoles[user.id] || userRoleNames}
                    onChange={(e) =>
                      handleChange(
                        user.id,
                        Array.from(e.target.selectedOptions, (opt) => opt.value)
                      )
                    }
                  >
                    {allRoles.map((role) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => handleSubmit(user.id)}>Update</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RoleManager;
