import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faScrewdriverWrench, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import './ProjectManager.css'


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
    const [deleteMode, setDeleteMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState('');

    const [editData, setEditData] = useState({
        name:'', 
        description: '', 
        start_date: '', 
        end_date: '', 
        owner: ''
    });

    const handleAddClick = () => { 
        setAddMode(true);
        setShowModal(true);
    };
    
    const handleEditClick = (project) => {
        setEditMode(true);
        setShowModal(true);
        setEditData({id: project.id, 
                    name: project.name, 
                    description: project.description, 
                    start_date: project.start_date, 
                    end_date: project.end_date, 
                    owner: project.users.id,
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
                owner: addData.owner}));
        setAddMode(false);
        setShowModal(false);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(editProject({projectId: editData.id, update: editData}));
        setEditMode(false);
        setShowModal(false);
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowModal(true);
        setDeleteMode(true);
    };

    const handleSubmitDelete = ()=>{
        dispatch(deleteProject(deleteId));
        setDeleteId('');
        setDeleteMode(false);
        setShowModal(false);

    }

    const handleStatusChangeSubmit = (e) => {
        setStatusData({...statusData, [e.target.name]: e.target.value});
        console.log(statusData);
        
    };

    const handleStatusSubmit = (id) => {
        dispatch(editProjectStatus({projectId: id, update: statusData}));
    }

    return (
         <>
            {showModal && (
            <div className="modal-backdrop">
                <div className="modal">
                {addMode && (
                <>
                <h3>Add Project</h3>
                <form className="modal-form">
                <label><h5>Project Name</h5></label>
                <input name="name" value={addData.name} onChange={handleAddChange} placeholder="Name" required/>
                <label><h5>Description</h5></label>
                <textarea name="description" value={addData.description} onChange={handleAddChange} placeholder="Description" required />
                <label><h5>Start-Date</h5></label>
                <input name="start_date" type="date" value={addData.start_date} onChange={handleAddChange} placeholder="Start-Date" require />
                <label><h5>End-Date</h5></label>
                <input name="end_date" type="date" value={addData.end_date} onChange={handleAddChange} placeholder="End-Date" require />
                <label><h5>Owner</h5></label>
                <select name="owner" value={addData.owner} onChange={handleAddChange} required>
                    <option value="">Select...</option>
                    {userName.map((data, idx)=>(
                        data.roles[0].role.name === "Task-Creator" ? <option key={idx} value={data.id}>{data.username}</option>: <></>
                    ))}
                </select>
                {/* <label>Status</label>
                <input name="status" value={addData.status} onChange={handleAddChange} placeholder="Status" required/> */}
                <button type="button" className="save-button" onClick={handleAddSubmit}>Save</button>
                <button type="button" className="close-button" onClick={() => {setAddMode(false); setShowModal(false)}}>Cancel</button>
                </form>

                </>
                )}

            {editMode && (
                <>
                <h3>Edit Project</h3>
                <form className="modal-form">
                <label><h5>Project Name</h5></label>
                <input name="name" value={editData.name} onChange={handleEditChange} placeholder="Name" required/>
                <label><h5>Description</h5></label>
                <input name="description" type= "text" value={editData.description} onChange={handleEditChange} placeholder="Description" required />
                <label><h5>Start-Date</h5></label>
                <input name="start_date" type="date" value={editData.start_date} onChange={handleEditChange} placeholder="Start-Date" require />
                <label><h5>End-Date</h5></label>
                <input name="end_date" type="date" value={editData.end_date} onChange={handleEditChange} placeholder="End-Date" require />
                <label><h5>Owner</h5></label>
                <select name="owner" value={editData.owner} onChange={handleEditChange} required>
                    <option value="">Select...</option>
                    {userName.map((data, idx)=>(
                        data.roles[0].role.name === "Task-Creator" ? <option key={idx} value={data.id}>{data.username}</option>: <></>
                    ))}
                </select>
                {/* <label>Status</label>
                <input name="status" value={editData.status} onChange={handleEditChange} placeholder="Status" required/> */}
                <button type="button" className="save-button" onClick={handleEditSubmit}>Save</button>
                <button type="button" className="close-button" onClick={() => {setEditMode(false); setShowModal(false)}}>Cancel</button>
                </form>

                </>
            
                )
            }

            {deleteMode && (
                <>
                <p>Are you sure you want to delete this project?</p>
                <button type="button" className="close-button" onClick={handleSubmitDelete}> yes </button>
                <button type="button" className="save-button" style={{ marginLeft: '5px'}} onClick={()=>{setDeleteMode(false); setShowModal(false)}}> No </button>
                </>
            )}

            </div>
            </div>
            )}

            {hasRole('Admin') &&(<button type="button" className="Add-button" onClick={() => handleAddClick()}><FontAwesomeIcon icon={faSquarePlus}/> Project</button>)}
            

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
        
        </>
    )};

export default ProjectManager;

