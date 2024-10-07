import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const DoctorRegistration = () => {
  const [doctor, setDoctor] = useState({
    name: '', email: '', contact: '', password: '', address: '', specialization: '', experience: '', workingHours: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      doctor.name && doctor.email && doctor.contact && doctor.password &&
      doctor.address && doctor.specialization && doctor.experience && doctor.workingHours
    ) {
      // Check if doctor already exists
      if (localStorage.getItem('doctor-' + doctor.email)) {
        alert('Doctor with this email is already registered');
      } else {
        // Get the existing doctors list from localStorage
        const doctors = JSON.parse(localStorage.getItem('doctors')) || [];

        // Save individual doctor to localStorage
        localStorage.setItem('doctor-' + doctor.email, JSON.stringify(doctor));

        // Add the new doctor to the doctors list
        const updatedDoctors = [...doctors, doctor];

        // Update the doctors list in localStorage
        localStorage.setItem('doctors', JSON.stringify(updatedDoctors));

        // Show success message and redirect to login page
        alert('Doctor Registered Successfully!');
        navigate('/login');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <form className='doc-register' onSubmit={handleSubmit}>
        <h2>Register:</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={doctor.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={doctor.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Contact:</label>
        <input type="text" name="contact" value={doctor.contact} onChange={handleChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={doctor.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={doctor.address} onChange={handleChange} required />
      </div>
      <div>
        <label>Specialization:</label>
        <input type="text" name="specialization" value={doctor.specialization} onChange={handleChange} required />
      </div>
      <div>
        <label>Experience (years):</label>
        <input type="number" name="experience" value={doctor.experience} onChange={handleChange} required />
      </div>
      <div>
        <label>Working Hours:</label>
        <input type="text" name="workingHours" value={doctor.workingHours} onChange={handleChange} required />
      </div>
      <button type="submit">Register</button>
      <p>
        Already have an account?{' '}
        <button onClick={() => navigate('/login')} className="signup-button">Login</button>
      </p>
    </form>
  );
};

export default DoctorRegistration;