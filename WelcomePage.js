import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className='welcome'>
      <h1>Welcome to Health Hub</h1>
      <p>
            Where doctors and patients connect seamlessly, offering a one-step solution for patients to book and begin their journey toward healing.
          </p>

      <p className='choose-option'>Please choose an option below:</p>
      <button onClick={() => navigate('/doctor-register')}>I'm a Doctor</button>
      <button onClick={() => navigate('/patient-register')}>I'm a Patient</button>
    </div>
  );
}

export default WelcomePage;
