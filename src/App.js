// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import CreatTask from './components/CreateTask/CreateTask';
import UpdateTask from './components/UpdateTask/UpdateTask';



const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createTask" element={<CreatTask />} />
        <Route path="/updateTask" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
};

export default App;
