import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [patientId, setPatientId] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove doctorId and doctorName from localStorage
    localStorage.removeItem('doctorId');
    localStorage.removeItem('doctorName');
    navigate('/');
  };

  const handlePatientIdChange = (e) => {
    setPatientId(e.target.value);
  };

  const handlePatientDetailsClick = () => {
    // Redirect to the patient details page with the entered patient ID
    navigate(`/patients/${patientId}`);
  };

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={handlePatientIdChange}
        style={styles.inputField}
      />
      <button onClick={handlePatientDetailsClick} style={styles.primaryButton}>
        Get Patient Details
      </button>

      <div style={styles.buttonGroup}>
        <Link to="/doctor/profile">
          <button style={styles.secondaryButton}>Profile</button>
        </Link>
        <Link to="/register">
          <button style={styles.secondaryButton}>Register Page</button>
        </Link>
        <Link to="/patients">
          <button style={styles.secondaryButton}>New Patient</button>
        </Link>
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  buttonGroup: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    backgroundColor: '#eee',
    color: '#333',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  logoutButton: {
    marginTop: '15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default HomePage;
