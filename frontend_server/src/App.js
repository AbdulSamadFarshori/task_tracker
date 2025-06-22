import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './features/auth/LoginPage';
import Dashboard from './pages/Dashboard';
import RoleManager from './features/roles/RoleManager';
import ProjectTaskManager from './features/tasks/ProjectTaskManager';
import TaskManager from './features/tasks/TaskManager';
import ProjectManager from './features/projects/ProjectManager';
import UserManager from './features/users/UserManager';

import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Router>
      <Navbar />

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      <div className="main-content" style={{ padding: '20px' }}>

        <Routes>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={['Admin','Task-Creator', 'Read-Only']}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
      
          <Route
            path="/projects/:projectId/tasks"
            element={
              <ProtectedRoute allowedRoles={['Admin', 'Task-Creator']}>
                <ProjectTaskManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute allowedRoles={['Read-Only']}>
                <TaskManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute roles={['Admin','Task-Creator']}>
                <ProjectManager />
              </ProtectedRoute>
            }
          />


          <Route
            path="/users"
            element={
              <ProtectedRoute roles={['Admin']}>
                <UserManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/roles"
            element={
              <ProtectedRoute roles={['Admin']}>
                <RoleManager />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
