// Import necessary libraries and components
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardMenu from '../AuthCompo/DashboardMenu'; // Import the DashboardMenu component

// Create the functional component
const CreateStudent = () => {
  // State for form data and success message
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    className: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Event handler for form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Event handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new student
      await axios.post('http://localhost:5000/student/students', formData);
      // Set success message and clear form data
      setSuccessMessage('Student created successfully!');
      setFormData({
        id: '',
        name: '',
        age: '',
        className: '',
      });
      // Redirect to the student list page after a brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error creating student:', error);
      // Handle error or show a message to the user
    }
  };

  // JSX for the component
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
          <h2>Create Student</h2>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Form fields go here */}
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
              <label>Age:</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Class:</label>
              <input
                type="text"
                className="form-control"
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-primary">
              Create Student
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Export the component
export default CreateStudent;
