import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DoctorDashboard.css';

function DoctorDashboard() {
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem('loggedInUser'));
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  return (
    <div className="dashboard-container">
      <h2>Doctor Dashboard</h2>
      <div className='doctor-buttons'>
      <button onClick={() => navigate('/view-appointments')}>View Appointments</button>
      <button onClick={() => { localStorage.removeItem('loggedInUser'); navigate('/login'); }}>Logout</button>
      </div>

      <h3>Appointments</h3>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Patient Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Problem</th>
            <th>Appointment Date</th>
          </tr>
        </thead>
        <tbody>
          {appointments.filter(a => a.doctorEmail === doctor.email).map((appointment, index) => (
            <tr key={index}>
              <td data-label="Serial No">{index + 1}</td>
              <td data-label="Patient Name">{appointment.patientName}</td>
              <td data-label="Age">{appointment.patientAge}</td>
              <td data-label="Contact">{appointment.patientContact}</td>
              <td data-label="Problem">{appointment.problem}</td>
              <td data-label="Appointment Date">{appointment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorDashboard;