import React from 'react';
import { useNavigate } from 'react-router-dom';

function PatientDashboard() {
  const navigate = useNavigate();
  const patient = JSON.parse(localStorage.getItem('loggedInUser'));
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  return (
    <div className='patient-d'>
    <div className='patient-header'>
      <h2>Patient Dashboard</h2>
      <div className='patient-buttons'>
      <button onClick={() => navigate('/book-appointment')}>Book Appointment</button>
      <button onClick={() => navigate('/view-appointments')}>My Appointments</button>
      <button onClick={() => { localStorage.removeItem('loggedInUser'); navigate('/login'); }}>Logout</button>
      </div>
      </div>
      <div className='patient-table'>

      <h3>My Appointments</h3>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Doctor Name</th>
            <th>Contact Number</th>
            <th>Appointment Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.filter(a => a.patientEmail === patient.email).map((appointment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.doctorContact}</td>
              <td>{appointment.date} {appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}

export default PatientDashboard;
