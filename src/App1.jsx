import { Route, Routes,Navigate  } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import NewPatient from './pages/NewPatient'; // Import the NewPatient component
import PatientDetails from "./pages/PatientDetails";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import Pescrption from "./pages/Pescrption";
import HomePage from "./pages/HomePage";
const App = () => {
  const doctorId = localStorage.getItem('doctorId');
  return (
    <Routes>
      <Route
        path="/"
        element={doctorId ? <Navigate to="/home" /> : <LoginPage />}
      />

      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/doctor/:doctorId" element={<Profile/>}/>
      <Route path="/patients" element={<NewPatient />} />
      <Route path="/patients/:patientId" element={<PatientDetails />} />
      <Route path="/patients/:patientId/prescriptions" element={<Pescrption/>} />
    </Routes>
  );
};

export default App;
