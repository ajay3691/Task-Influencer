import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TeacherEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subjects: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/teacher/teachers/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the teacher
      await axios.put(`http://localhost:5000/teacher/teachers/${id}`, formData);
      // Redirect to the teachers list page after updating
      navigate('/teachers');
    } catch (error) {
      console.error('Error updating teacher:', error);
      // Handle error or show a message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Teacher</h2>
      <form onSubmit={handleSubmit}>
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
          Update Teacher
        </button>
      </form>
    </div>
  );
};

export default TeacherEdit;
