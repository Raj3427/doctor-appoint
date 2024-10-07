import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const PatientRegistration = () => {
  const [patient, setPatient] = useState({
    name: '', email: '', contact: '', password: '', age: '', gender: '', address: '', problem: ''
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      patient.name && patient.email && patient.contact && patient.password &&
      patient.age && patient.gender && patient.address && patient.problem
    ) {
      // Save patient data to localStorage
      localStorage.setItem('patient-' + patient.email, JSON.stringify(patient));

      // Show alert and redirect to login page
      alert('Patient Registered Successfully!');
      navigate('/login');
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form className='patient-form' onSubmit={handleSubmit}>
        <h2>Register Here:</h2>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={patient.name} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          value={patient.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Contact:</label>
        <input 
          type="text" 
          name="contact" 
          value={patient.contact} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Password:</label>
        <input 
          type="password" 
          name="password" 
          value={patient.password} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Age:</label>
        <input 
          type="number" 
          name="age" 
          value={patient.age} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Gender:</label>
        <select name="gender" value={patient.gender} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label>Address:</label>
        <input 
          type="text" 
          name="address" 
          value={patient.address} 
          onChange={handleChange} 
          required 
        />
      </div>

      <div>
        <label>Problem:</label>
        <textarea 
          name="problem" 
          value={patient.problem} 
          onChange={handleChange} 
          required 
        ></textarea>
      </div>

      <button type="submit">Register</button>
      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="signup-button">Login</button>
      </p>
    </form>
  );
};

export default PatientRegistration;
