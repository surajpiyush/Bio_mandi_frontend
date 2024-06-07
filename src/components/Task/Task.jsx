import React, { useEffect, useState } from "react";
import "./Task.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Table = () => {
	const [tableData, setTableData] = useState([]);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const token = sessionStorage.getItem("jwtToken"); // Use getItem instead of get
				const response = await axios.get(
					"http://localhost:4000/task/getAllTask",
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);

				console.log("response", response.data.response);

				setTableData(response?.data.response);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchData();
	}, []);

	const handleAdd = (item) => {
		try {
			axios.post("http://localhost:4000/task/createTask", item, {
				"Content-Type": "application/json",
			});
			console.log("Update item:", item);
		} catch (error) {}
	};
	const handleUpdate = (item,id) => {
		try {
			axios.put("http://localhost:4000/task/updateTask/"+id, item, {
				"Content-Type": "application/json",
			});
		} catch (error) {}
		console.log("Update item:", item);
	};

	const handleDelete = async (itemId) => {
    console.log("this is id", itemId);
    const token = sessionStorage.getItem("jwtToken");

    try {
        const response = await axios.delete(`http://localhost:4000/task/deleteTask/${itemId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        
        console.log("Delete response", response);
        setTableData((prevTasks) => prevTasks.filter((task) => task.id !== itemId));
        // Navigate to dashboard only after successful delete
        navigate("/dashboard");
    } catch (error) {
        console.error("There was an error deleting the task!", error);
    }
};


	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Title</th>
					<th>Description</th>
					<th>Status</th>
					<th>add</th>
					<th>edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
				{tableData?.map((item) => (
					<tr key={item?.id}>
						<td>{item?._id}</td>
						<td>{item?.title}</td>
						<td>{item?.description}</td>
						<td>{item?.status}</td>

						<td>
							{" "}
							<div>
								<NavLink to="/createTask">add</NavLink>
							</div>
						</td>
						<td>
							{" "}
							<NavLink to="/updateTask" state={{item}}>edit</NavLink>
						</td>
						<td>
							<NavLink
								className="delete"
								onClick={() => handleDelete(item._id)}
							>
								Delete
							</NavLink>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
