import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const PatientDetails = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { patientId } = useParams();

  useEffect(() => {
    let isMounted = true; // Variable to track component mount status

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hospital-wkwk.onrender.com/patients/${patientId}`
        );

        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);

        if (isMounted) {
          setLoading(false);
          setError(true);

          // Automatically redirect to the home page after a short delay (e.g., 2 seconds)
          setTimeout(() => {
            window.location.href = '/home';
          }, 2000);
        }
      }
    };

    fetchData();

    // Cleanup function to prevent state updates after component unmounts
    return () => {
      isMounted = false;
    };
  }, [patientId]);

  if (error) {
    // Display an error message
    return (
      <div>
        <p>Error: Patient not found</p>
      </div>
    );
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Patient Details</h2>
          <p>
            <strong>Patient ID:</strong> {data.patientId}
          </p>
          <p>
            <strong>Patient Name:</strong> {data.patientName}
          </p>
          <p>
            <strong>Age:</strong> {data.age}
          </p>
          <p>
            <strong>Gender:</strong> {data.gender}
          </p>
          <p>
            <strong>Blood Type:</strong> {data.blood}
          </p>

          <h3>Prescriptions</h3>
          {data.prescriptions && data.prescriptions.length > 0 ? (
            <ul>
              {data.prescriptions.map((prescription, index) => (
                <li key={index}>
                  <strong>Doctor:</strong> {prescription.doctorName}
                  <br />
                  <strong>Problem:</strong> {prescription.problem}
                  <br />
                  <strong>Description:</strong> {prescription.description}
                  <br />
                  <strong>Medicine:</strong> {prescription.medicine}
                  <br />
                  <strong>Time:</strong> {prescription.time}
                  <br />
                </li>
              ))}
            </ul>
          ) : (
            <p>No prescriptions available.</p>
          )}

          {/* Add Prescription Button */}
          <Link to={`/patients/${patientId}/prescriptions`}>
            <button>Add Prescription</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PatientDetails;
