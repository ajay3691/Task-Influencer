import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardMenu from '../AuthCompo/DashboardMenu'; // Import the DashboardMenu component

const CreateTeacher = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    subjects: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new teacher
      await axios.post('http://localhost:5000/teacher/teachers', formData);
      // Set success message and clear form data
      setSuccessMessage('Teacher created successfully!');
      setFormData({
        id: '',
        name: '',
        email: '',
        subjects: '',
      });
      // Redirect to the teachers list page after a brief delay
      setTimeout(() => {
        navigate('/teachersList');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error creating teacher:', error);
      // Handle error or show a message to the user
    }
  };

  return (
    <div className="dashboard-container">
      {/* Dashboard Sidebar */}
      <div className="dashboard-sidebar">
        <div className="dashboard-brand">
          <h2>Dashboard</h2>
        </div>
        <DashboardMenu />
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="container mt-5">
          <h2>Create Teacher</h2>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>ID:</label>
              <input
                type="text"
                className="form-control"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Subjects:</label>
              <input
                type="text"
                className="form-control"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Create Teacher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacher;
