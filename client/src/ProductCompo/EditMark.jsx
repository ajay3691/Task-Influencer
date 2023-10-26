import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditMark() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    teacherName: '',
    subject: '',
    marks: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/marks/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/marks/${id}`, formData);
      console.log('Mark updated:', response.data);
      navigate('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Edit Mark</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="studentId" className="form-label">Student ID</label>
          <input type="text" className="form-control" name="studentId" value={formData.studentId} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="studentName" className="form-label">Student Name</label>
          <input type="text" className="form-control" name="studentName" value={formData.studentName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="teacherName" className="form-label">Teacher Name</label>
          <input type="text" className="form-control" name="teacherName" value={formData.teacherName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="marks" className="form-label">Marks</label>
          <input type="number" className="form-control" name="marks" value={formData.marks} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Update Mark</button>
      </form>
    </div>
  );
}

export default EditMark;
