
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import NewPatient from "./pages/NewPatient";
import PatientDetails from "./pages/PatientDetails";
import Pescrption from "./pages/Pescrption";
import HomePage from "./pages/HomePage";
import NavBar from "./pages/NavBar";

const App = () => {
  const doctorId = localStorage.getItem("doctorId");

  return (
    <>
      {doctorId && <NavBar />}
      <Routes>
        {/* {<Route path="/" element={<Navigate to="/home" />} />} */}
        <Route
        path="/"
        element={doctorId ? <Navigate to="/home" /> : <LoginPage />}
      />
        {doctorId && <Route path="/home" element={<HomePage />} />}
        {doctorId && <Route path="/register" element={<RegisterPage />} />}
        {doctorId && <Route path="/doctor/:doctorId" element={<Profile />} />}
        {doctorId && <Route path="/patients" element={<NewPatient />} />}
        {doctorId && <Route path="/patients/:patientId" element={<PatientDetails />} />}
        {doctorId && <Route path="/patients/:patientId/prescriptions" element={<Pescrption />} />}
        {!doctorId && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </>
  );
};

export default App;

