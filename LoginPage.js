import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctor = localStorage.getItem('doctor-' + email);
    const patient = localStorage.getItem('patient-' + email);

    // Check if doctor credentials are valid
    if (doctor && JSON.parse(doctor).password === password) {
      const userData = JSON.parse(doctor); // Get doctor data
      localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Store logged-in user data
      alert('Doctor Logged In');
      navigate('/doctor-dashboard');
    } 
    // Check if patient credentials are valid
    else if (patient && JSON.parse(patient).password === password) {
      const userData = JSON.parse(patient); // Get patient data
      localStorage.setItem('loggedInUser', JSON.stringify(userData)); // Store logged-in user data
      alert('Patient Logged In');
      navigate('/patient-dashboard');
    } 
    // Invalid credentials
    else {
      alert('Invalid email or password');
    }
  };

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">Login</button>
      <p>
        New user?{' '}
        <button onClick={() => navigate('/')} className="signup-button">Register</button>
      </p>
    </form>
  );
};

export default Login;