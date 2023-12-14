import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Prescription = () => {
  const { patientId } = useParams();
  const [prescriptionData, setPrescriptionData] = useState({
    problem: '',
    description: '',
    medicine: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData({
      ...prescriptionData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Hardcoded doctor's ID or name
      
  console.log(localStorage.getItem('doctorId'));
      const response = await axios.post(`http://localhost:3002/patients/${patientId}/prescriptions`, {
        ...prescriptionData,
        doctorName: localStorage.getItem('doctorName'),
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Prescription added:', response.data);

      // Redirect back to patient details page after successful submission
      window.location.href = `/patients/${patientId}`;
    } catch (error) {
      console.error('Error adding prescription:', error);
    }
  };

  return (
    <div>
      <h2>Add Prescription</h2>
      <form onSubmit={handleSubmit}>
        {/* Doctor ID/Name is not part of the form */}
        <label>
          Problem:
          <input type="text" name="problem" value={prescriptionData.problem} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" name="description" value={prescriptionData.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Medicine:
          <input type="text" name="medicine" value={prescriptionData.medicine} onChange={handleInputChange} />
        </label>
        <br />
        <button type="submit">Submit Prescription</button>
      </form>
    </div>
  );
};

export default Prescription;
