
import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
userName:'',
password:''
    
  });
 
 const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
        
      const response = await axios.post('http://localhost:4000/user/login',formData,{
        headers: {
          'Content-Type': 'application/json'
          
        }
      });
      const { token } = response.data.response;

      console.log("this is token",response.data)

      sessionStorage.setItem('jwtToken', token);
      // Redirect to a protected route
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed, please try again.');
    }
  };

  return (
    <div className="login-container">
      
      <form onSubmit={handleLogin}>
     
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
