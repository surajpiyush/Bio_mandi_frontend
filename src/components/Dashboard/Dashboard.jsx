// src/Dashboard.js
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Table from "../Task/Task";
import axios from "axios";


const Dashboard = () => {
  const[tableData,setTableData]=useState([])
  const[error,setError]=useState('')




	return (
		<div>
			<Table/>
		</div>
	);
};

export default Dashboard;
