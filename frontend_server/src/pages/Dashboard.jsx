import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faScrewdriverWrench, faSquareCheck, faSquarePlus, faKey, faUsers, faFolderOpen, faFileSignature } from '@fortawesome/free-solid-svg-icons';


const Dashboard = () => {
  const { user, roles } = useSelector((state) => state.auth);

  const hasRole = (roleName) => roles.includes(roleName);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.username || 'User'}</h2>
      <p className="subtitle">You are logged in as: {roles.join(', ')}</p>

      <div className="dashboard-links">

        {!hasRole('Admin') && !hasRole('Task-Creator') && hasRole('Read-Only') ? (
          <Link to="/tasks" className="dash-card">
            <h3><FontAwesomeIcon icon={faFileSignature} /> Manage Task</h3>
            <p>View and update tasks.</p>
          </Link>):<></>
        }

        {!hasRole('Admin') && hasRole('Task-Creator') ? (
          <Link to="/projects" className="dash-card">
            <h3> <FontAwesomeIcon icon={faFolderOpen} /> Manage Project</h3>
            <p>View projects.</p>
          </Link>):<></>
        }

        {hasRole('Admin') && (
          <>
            <Link to="/projects" className="dash-card">
              <h3><FontAwesomeIcon icon={faFolderOpen} /> Project Management</h3>
              <p>View, edit, or delete projects.</p>
            </Link>

            <Link to="/users" className="dash-card">
              <h3><FontAwesomeIcon icon={faUsers} /> User Management</h3>
              <p>View, edit, or delete users.</p>
            </Link>

            <Link to="/unauthorized" className="dash-card">
              <h3><FontAwesomeIcon icon={faKey} /> Role Management</h3>
              <p>Assign roles to users.</p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
