import React from 'react';
import { useNavigate } from 'react-router-dom';

function ViewAppointments() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  const filteredAppointments = user.specialization
    ? appointments.filter(appointment => appointment.doctorEmail === user.email)
    : appointments.filter(appointment => appointment.patientEmail === user.email);

  return (
    <div className='view-button'>
      <h2>View Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            {user.specialization ? (
              <>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Contact</th>
                <th>Problem</th>
              </>
            ) : (
              <th>Doctor Name</th>
            )}
            <th>Appointment Date</th>
            <th>Appointment Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {user.specialization ? (
                <>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.patientAge}</td>
                  <td>{appointment.patientContact}</td>
                  <td>{appointment.problem}</td>
                </>
              ) : (
                <td>{appointment.doctorName}</td>
              )}
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate(user.specialization ? '/doctor-dashboard' : '/patient-dashboard')}>Back to Dashboard</button>
    </div>
  );
}

export default ViewAppointments;
