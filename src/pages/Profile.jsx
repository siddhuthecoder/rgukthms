import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { doctorId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/doctor/${localStorage.getItem('doctorId')}`);
        const responseData = response.data;
        setData(response.data);
        setLoading(false);
        localStorage.setItem('doctorName', responseData.doctorName);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError('Profile not found');

        // Display an error toast
        toast.error('Profile not found', { autoClose: 2000 });

        // Automatically navigate to the home page after a short delay (e.g., 2 seconds)
        setTimeout(() => {
          window.location.href = '/home';
        }, 2000);
      }
    };

    fetchData();
  }, [doctorId]);

  return (
    <main>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <>
          <div>
            <p>{error}</p>
          </div>
        </>
      ) : (
        <>
          <h1>{data.doctorName}</h1>
          <p>Doctor ID: {data.doctorId}</p>
          <p>Email: {data.email}</p>
          <p>Phone Number: {data.phoneNumber}</p>
          <p>Specialization: {data.specifications}</p>
          <p>Created At: {data.createdAt}</p>
          <p>Updated At: {data.updatedAt}</p>
          <h2>Prescriptions</h2>
          <ul>
            {data.prescriptions.map((prescription) => (
              <li key={prescription._id}>
                <p>Problem: {prescription.patientId}</p>
                <p>Problem: {prescription.problem}</p>
                <p>Description: {prescription.description}</p>
                <p>Medicine: {prescription.medicine}</p>
                <p>Time: {new Date(prescription.time).toLocaleString()}</p>
              </li>
            ))}
          </ul>
          {/* Add more elements based on your data structure */}
        </>
      )}
    </main>
  );
};

export default Profile;
