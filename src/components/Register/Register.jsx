// src/components/Register/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    userName:'',
    password:''
  });
 
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/user/register', formData,{
        headers: {
          'Content-Type': 'application/json',
        }
      });
      alert('Registration successful!');
      // Redirect to the login page
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
      alert('Registration failed, please try again.');
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.userName}
            onChange={handleInput}
            name="userName"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={handleInput}
            name="password"
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
