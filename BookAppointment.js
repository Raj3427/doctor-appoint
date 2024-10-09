import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BookAppointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorEmail, setDoctorEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  // Fetching doctors from local storage on component mount
  useEffect(() => {
    const storedDoctors = JSON.parse(localStorage.getItem('doctors')) || [];
    setDoctors(storedDoctors);
  }, []);

  const handleBook = () => {
    // Retrieve patient information from local storage
    const patient = JSON.parse(localStorage.getItem('loggedInUser'));

    // Check if patient information is available
    if (!patient || !patient.email) {
      alert('User not logged in. Please log in to book an appointment.');
      navigate('/login');
      return;
    }

    // Check for time slot conflicts (30 minutes apart)
    const conflictingAppointment = appointments.find(appointment =>
      appointment.doctorEmail === doctorEmail &&
      appointment.date === date &&
      Math.abs(new Date(`1970-01-01T${appointment.time}`).getTime() - new Date(`1970-01-01T${time}`).getTime()) < 30 * 60 * 1000
    );

    if (conflictingAppointment) {
      alert('This time slot is unavailable. Please choose another time.');
    } else {
      const selectedDoctor = doctors.find(doctor => doctor.email === doctorEmail);
      if (selectedDoctor) {
        const newAppointment = {
          patientEmail: patient.email,
          patientName: patient.name,
          patientAge: patient.age,
          patientContact: patient.contact,
          problem: patient.problem,
          doctorEmail: selectedDoctor.email,
          doctorName: selectedDoctor.name,
          doctorContact: selectedDoctor.contact,
          date,
          time,
        };

        const updatedAppointments = [...appointments, newAppointment];
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        alert('Appointment booked successfully');
        navigate('/patient-dashboard');
      } else {
        alert('Doctor not found');
      }
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      
      <div>
        <label>Select Doctor:</label>
        <select value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)}>
          <option value="">-- Select Doctor --</option>
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <option key={index} value={doctor.email}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))
          ) : (
            <option disabled>No doctors available</option>
          )}
        </select>
      </div>

      <div>
        <label>Select Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        <label>Select Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <button onClick={handleBook}>Book Appointment</button>
    <button onClick={() => navigate('/patient-dashboard')}>Logout</button>

    </div>
  );
}

export default BookAppointment;