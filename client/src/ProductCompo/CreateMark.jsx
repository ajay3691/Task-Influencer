import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMark = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    score: '',
  });

  const [studentIds, setStudentIds] = useState([]);

  useEffect(() => {
    const fetchStudentIds = async () => {
      try {
        // Replace 'your-endpoint-for-student-ids' with your actual API endpoint
        const response = await axios.get('http://localhost:5000/student/students');
        setStudentIds(response.data.map((student) => student.id));
      } catch (error) {
        console.error('Error fetching student IDs:', error);
      }
    };

    fetchStudentIds();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add a new mark
      const response = await axios.post('http://localhost:5000/mark/marks', formData);

      // Handle the response, you can log it or show a success message to the user
      console.log('Mark created successfully:', response.data);

      // Clear the form after successful submission
      setFormData({
        studentId: '',
        subject: '',
        score: '',
      });

      // Navigate to the marks list
      navigate('/marksList');
    } catch (error) {
      console.error('Error creating mark:', error);
      // Handle errors, you can show an error message to the user
    }
  };

  return (
    <div>
      <h2>Add Mark</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="studentId" className="form-label">
            Student ID:
          </label>
          <input
            type="text"
            className="form-control"
            id="studentId"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">
            Subject:
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="score" className="form-label">
            Score:
          </label>
          <input
            type="text"
            className="form-control"
            id="score"
            name="score"
            value={formData.score}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Mark
        </button>
      </form>
    </div>
  );
};

export default AddMark;
