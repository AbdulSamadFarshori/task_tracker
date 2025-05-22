import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from "./pages/Home"
import LoginPage from './pages/Login';
import ProjectPage from './pages/Project';
import ProjectAddPage from './pages/ProjectAddPage';
import TaskPage from './pages/Task';
import TaskAddPage from './pages/TaskAddPage';
import ProjectEditPage from './pages/ProjectEdit';
import TaskEditPage from './pages/TaskEdit';
import UserPage from './pages/User';
import UserAddPage from './pages/UserAddPage';
import UserEditPage from './pages/UserEdit';


const router = createBrowserRouter([
  {path: '/', element: <HomePage/>},
  {path: '/login', element: <LoginPage />},
  {path: '/project', element: <ProjectPage />},
  {path: '/task', element: <TaskPage />},
  {path: '/create-project', element: <ProjectAddPage />},
  {path: '/create-task', element: <TaskAddPage />},
  {path: '/edit-project/:id', element: <ProjectEditPage />},
  {path: '/edit-task/:id', element: <TaskEditPage />},
  {path: '/task/:id', element: <TaskPage />},
  {path: '/user-task/:userId', element: <TaskPage />},
  {path: '/user-project/:userId', element: <ProjectPage />},
  {path: '/user', element: <UserPage />},
  {path: '/create-user', element: <UserAddPage />},
  {path: '/edit-user/:userId', element: <UserEditPage />}

  

]);


function App() {
  return <RouterProvider router={router}/>
}

export default App;
