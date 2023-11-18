import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'teacher',
    secretCode: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    setAlertMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.confirmPassword) {
        setShowAlert(true);
        setAlertMessage('Passwords do not match. Please check and try again.');
        return;
      }

      const response = await axios.post('http://localhost:5000/user/register', formData);
      console.log(response.data);
      setShowAlert(true);
      setAlertMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      if (error.response.status === 401) {
        setShowAlert(true);
        if (error.response.data.err === 'User already exists') {
          setAlertMessage('User with this email already exists. If you are a teacher, please login.');
        } else if (error.response.data.err === 'This email is not registered as a teacher') {
          setAlertMessage('This email is not registered as a teacher. Please register as a teacher.');
        } else {
          setAlertMessage(error.response.data.err);
        }
      } else {
        console.error('Registration Error:', error.response.data.err);
        setShowAlert(true);
        setAlertMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select className="form-control" name="role" value={formData.role} onChange={handleChange}>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {formData.role === 'admin' && (
          <div className="form-group">
            <label>Secret Code:</label>
            <input type="text" className="form-control" name="secretCode" value={formData.secretCode} onChange={handleChange} />
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>

      {/* Alert for success or error */}
      {showAlert && (
        <div className={`alert ${alertMessage.includes('successful') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
          {alertMessage}
          <button type="button" className="close" onClick={handleAlertClose} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
