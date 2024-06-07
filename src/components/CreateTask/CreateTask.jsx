import { useState } from "react";
import './CreateTask.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreatTask = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("pending");

	const [formData,setFormDate] =useState({ title:'', description:'', status:'Pending' });

const navigate= useNavigate ()
const handleSubmit = async (e) => {
	e.preventDefault();
	const token = sessionStorage.getItem('jwtToken');

	console.log("this is token",token)

	try {
		const res = await axios.post(
			'https://bio-mandi-backend.onrender.com/task/createTask',
			formData,
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
		<form onSubmit={handleSubmit}>
			<h2>Create New Task</h2>
			<div>
				<label>Title:</label>
				<input
					type="text"
					value={formData.title}
					onChange={(e) => setFormDate({ ...formData,title: e.target.value})}
					required
				/>
			</div>
			<div>
				<label>Description:</label>
				<textarea
					value={formData.description}
					onChange={(e) => setFormDate({...formData,description:  e.target.value})}
					required
				/>
			</div>
			<div>
				<label>Status:</label>
				<select value={formData.status} onChange={(e) => setFormDate({...formData,status:  e.target.value})}>
					<option value="Pending">Pending</option>
					<option value="In-Progress">In Progress</option>
					<option value="Completed">Completed</option>
				</select>
			</div>
			<button type="submit">Create Task</button>
		</form>
	);
};

export default CreatTask;
