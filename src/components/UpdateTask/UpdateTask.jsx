import React, { useState, useEffect } from 'react';
import './UpdateTask.css'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
const UpdateTask = ({ task, onUpdate }) => {
   const location=useLocation()
   const navigate=useNavigate()
console.log("this location",location.state)
task=location.state.item
     task={title:'',description:'',status:''}
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    console.log('jkwdbj3e',task)
    // Populate form fields with current task data when task prop changes
    setTitle(location.state.item.title);
    setDescription(location.state.item.description);
    setStatus(location.state.item.status);
  }, []);
  console.log('jkwdbj222223e',task)
  const handleSubmit =async (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, description, status };

const token=sessionStorage.getItem('jwtToken')


    try {
		const res = await axios.put(
			'http://localhost:4000/task/updateTask/'+location.state.item._id,
			updatedTask,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		console.log('Task created:', res.data);

		// Reset input fields after successful submission
		setTitle('');
		setDescription('');
		setStatus('Pending');

		// Navigate to the dashboard
		navigate('/Dashboard');
	} catch (error) {
		console.error('Error creating task:', error);
		// Handle error here (e.g., show error message to the user)
	}


   
  };

  return (
   <div className='container' > <form onSubmit={handleSubmit}>
   <h2>Update Task</h2>
   <div>
     <label>Title:</label>
     <input 
       type="text" 
       value={title} 
       onChange={(e) => setTitle(e.target.value)} 
       required 
     />
   </div>
   <div>
     <label>Description:</label>
     <textarea 
       value={description} 
       onChange={(e) => setDescription(e.target.value)} 
       required 
     />
   </div>
   <div>
     <label>Status:</label>
     <select value={status} onChange={(e) => setStatus(e.target.value)}>
       <option value="pending">Pending</option>
       <option value="inProgress">In Progress</option>
       <option value="completed">Completed</option>
     </select>
   </div>
   <button type="submit">Update Task</button>
 </form></div>
  );
};

export default UpdateTask;
