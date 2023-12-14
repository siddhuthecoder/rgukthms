import  { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    doctorName: '',
    phoneNumber: '',
    email: '',
    password: '',
    specifications: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a request to the server
      const response = await axios.post('https://hospital-wkwk.onrender.com/auth/register', formData);

      // Display a toast with the ID and password
      toast.success(`ID: ${response.data.doctorId}, Password: ${response.data.password}`, {
        position: toast.POSITION.TOP_CENTER,
      });

      // Redirect to the home page (assuming you have a Home component and react-router-dom)
      // Replace the following line with your actual redirection logic
      // history.push('/home');
    } catch (error) {
      // Handle registration error
      console.error('Registration failed:', error.message);
      toast.error('Registration failed. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <h2>RegisterPage</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Doctor Name:
          <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone Number:
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <label>
          Specifications:
          <input type="text" name="specifications" value={formData.specifications} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
