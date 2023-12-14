import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewPatient = () => {
  const [patientData, setPatientData] = useState({
    patientName: '',
    age: 0,
    gender: '',
    blood: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://hospital-wkwk.onrender.com/patients', patientData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success(`ID: ${response.data.patientId}`, {
        position: toast.POSITION.TOP_CENTER,
      });

      console.log('Patient added:', response.data);

      // Redirect to patient details page after successful submission
      // Assuming you have a route for patient details like '/patients/:patientId'
      setTimeout(() => {
        window.location.href = `/patients/${response.data.patientId}`;
       
      }, 10000);

    } catch (error) {
      console.error('Error adding patient:', error);
      toast.error('Registration failed. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <h2>New Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input type="text" name="patientName" value={patientData.patientName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Age:
          <input type="number" name="age" value={patientData.age} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Gender:
          <input type="text" name="gender" value={patientData.gender} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Blood Type:
          <input type="text" name="blood" value={patientData.blood} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Add Patient</button>
      </form>

      {/* Link to patient details page (hidden until the patient is added) */}
      {patientData.patientId && (
        <Link to={`/patients/${patientData.patientId}`}>
          Go to Patient Details
        </Link>
      )}
      <ToastContainer />
    </div>
  );
};

export default NewPatient;
