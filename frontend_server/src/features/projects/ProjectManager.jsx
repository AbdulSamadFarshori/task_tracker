import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faScrewdriverWrench, faSquarePlus } from '@fortawesome/free-solid-svg-icons';



import { 
    fetchAllProjects, 
    editProject, 
    addProject, 
    deleteProject, 
    fetchUserProjects,
    fetchUserNames,
    editProjectStatus
} from "./projectSlice";
import { Link } from "react-router-dom";

const ProjectManager = () => {
    const dispatch = useDispatch();
    const { allProjects, userName, loading, error } = useSelector((state) => state.projects);
    
    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const { roles, user } = useSelector((state) => state.auth);
    const hasRole = (role) => roles.includes(role);

    useEffect(() => {
        if (!user || !roles.length) return;

        if (hasRole('Admin')) {
            dispatch(fetchAllProjects());
            dispatch(fetchUserNames());
        } 
        else if (hasRole('Task-Creator') || hasRole('Read-Only')) {
            dispatch(fetchUserProjects(user.id));
        }
        }, [dispatch, roles, user]);

    const [statusData, setStatusData] = useState({status: ''})

    const [addData, setAddData] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        status: '',
        created_by: ''
    });
    
    const [addMode, setAddMode] = useState(false);

    const [editMode, setEditMode] = useState(false);

    
    const [editData, setEditData] = useState({
        name:'', 
        description: '', 
        start_date: '', 
        end_date: '', 
        created_by: ''
    });

    const handleAddClick = () => {
        setAddMode(true);
    };
    
    const handleEditClick = (project) => {
        setEditMode(true);
        setEditData({id: project.id, 
                    name: project.name, 
                    description: project.description, 
                    start_date: project.start_date, 
                    end_date: project.end_date, 
                    created_by: project.users.id,
                    });
    };

    const handleAddChange = (e) => {
        setAddData({...addData, [e.target.name]: e.target.value});
    };

    const handleEditChange = (e) => {
        setEditData({...editData, [e.target.name]: e.target.value});
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        dispatch(addProject({
                name: addData.name, 
                description: addData.description, 
                start_date: addData.start_date, 
                end_date: addData.end_date, 
                created_by: addData.created_by}));
        setAddMode(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(editProject({projectId: editData.id, update: editData}));
        setEditMode(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
          dispatch(deleteProject(id));
        }
    };

    const handleStatusChangeSubmit = (e) => {
        setStatusData({...statusData, [e.target.name]: e.target.value});
        console.log(statusData);
        
    };

    const handleStatusSubmit = (id) => {
        dispatch(editProjectStatus({projectId: id, update: statusData}));
    }

    return (
         <div>
            {addMode && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Add Project</h3>
                    <form onSubmit={handleAddSubmit}>
                        <label>Project Name</label>
                        <input name="name" value={addData.name} onChange={handleAddChange} placeholder="Name" required/>
                        <label>Description</label>
                        <textarea name="description" value={addData.description} onChange={handleAddChange} placeholder="Description" required />
                        <label>Start-Date</label>
                        <input name="start_date" type="date" value={addData.start_date} onChange={handleAddChange} placeholder="Start-Date" require />
                        <label>End-Date</label>
                        <input name="end_date" type="date" value={addData.end_date} onChange={handleAddChange} placeholder="End-Date" require />
                        <label>Owner</label>
                        <select name="created_by" value={addData.created_by} onChange={handleAddChange} required>
                            <option value="">Select...</option>
                            {userName.map((data, idx)=>(
                                <option key={idx} value={data.id}>{data.username}</option>
                            ))}
                        </select>
                        {/* <label>Status</label>
                        <input name="status" value={addData.status} onChange={handleAddChange} placeholder="Status" required/> */}
                        
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setAddMode(false)} style={{ marginLeft: '10px' }}>Cancel</button>
                    </form>
                </div>
            )}
            {addMode || editMode || !hasRole('Admin')? <></> :<button type="button" onClick={() => handleAddClick()}><FontAwesomeIcon icon={faSquarePlus}/> Project</button>}
            {editMode && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Edit Project</h3>
                        <form onSubmit={handleEditSubmit}>
                            <label>Project Name</label>
                            <input name="name" value={editData.name} onChange={handleEditChange} placeholder="Name" required/>
                            <label>Description</label>
                            <input name="description" type= "text" value={editData.description} onChange={handleEditChange} placeholder="Description" required />
                            <label>Start-Date</label>
                            <input name="start_date" type="date" value={editData.start_date} onChange={handleEditChange} placeholder="Start-Date" require />
                            <label>End-Date</label>
                            <input name="end_date" type="date" value={editData.end_date} onChange={handleEditChange} placeholder="End-Date" require />
                            <label>Owner</label>
                            <select name="created_by" value={editData.created_by} onChange={handleEditChange} required>
                                <option value="">Select...</option>
                                {userName.map((data, idx)=>(
                                    <option key={idx} value={data.id}>{data.username}</option>
                                ))}
                            </select>
                            {/* <label>Status</label>
                            <input name="status" value={editData.status} onChange={handleEditChange} placeholder="Status" required/> */}
                            
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setEditMode(false)} style={{ marginLeft: '10px' }}>Cancel</button>
                        </form>
                </div>
            )}

            <h2>Project Manager</h2>
            {loading ? <p>Loading Projects...</p> : (
            <table>
                <thead>
                <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Start-Date</th>
                <th>End-Date</th>
                <th>Owner</th>
                {/* <th>Status</th> */}
                {hasRole('Admin') && (<th>Actions</th>)}
                </tr>
            </thead>
            <tbody>
                {allProjects?.map((project) => (
                <tr key={project.id}>
                    <td>{project.id}</td>
                    <td><Link to={`/projects/${project.id}/tasks`}>{project.name}</Link></td>
                    <td>{project.description}</td>
                    <td>{project.start_date}</td>
                    <td>{project.end_date}</td>
                    <td>{project.users.username}</td>
                    {/* <td>
                        <select name="status" value={statusData[project.id] ?? project.status} onChange={(e)=>handleStatusChangeSubmit(e, project.id)} required>
                                <option value="">Select...</option>
                                {['NEW', 'IN_PROGRESS', 'COMPLETED', 'NOT_STARTED', 'BLOCKED'].map((data, idx)=>(
                                    <option key={idx} value={data}>{data}</option>
                                ))}
                        </select>
                        <button onClick={() => handleStatusSubmit(project.id)}>Change</button>
                    </td> */}

                    {/* <td>{user.roles?.map(r => r.role?.name).join(', ') || 'N/A'}</td> */}
                    {hasRole('Admin') &&
                        <td>
                        <Link onClick={() => handleEditClick(project)}><FontAwesomeIcon icon={faScrewdriverWrench}/></Link>
                        <Link onClick={() => handleDelete(project.id)} style={{ marginLeft: '10px'}}><FontAwesomeIcon icon={faTrash} /></Link>
                        </td>
                    }
                </tr>
                ))}
            </tbody>
            </table>
        )}
    </div>
  );

};

export default ProjectManager;

