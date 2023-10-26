import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateMark() {
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    teacherName: '',
    subject: '',
    marks: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/marks', formData);
      console.log('Mark created:', response.data);

      navigate('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Create Mark</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="studentId" className="form-label">Student ID</label>
          <input type="text" className="form-control" name="studentId" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="studentName" className="form-label">Student Name</label>
          <input type="text" className="form-control" name="studentName" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="teacherName" className="form-label">Teacher Name</label>
          <input type="text" className="form-control" name="teacherName" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" className="form-control" name="subject" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="marks" className="form-label">Marks</label>
          <input type="number" className="form-control" name="marks" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Create Mark</button>
      </form>
    </div>
  );
}

export default CreateMark;
