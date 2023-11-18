import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddMarks = () => {
  const { studentId, teacherId } = useParams();
  const [formData, setFormData] = useState({
    subject: '',
    score: '',
    student: '',
    teacher: '',
  });
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsAndTeachers = async () => {
      try {
        const studentsResponse = await axios.get('http://localhost:5000/student/students');
        setStudents(studentsResponse.data);

        const teachersResponse = await axios.get('http://localhost:5000/teacher/teachers');
        setTeachers(teachersResponse.data);
      } catch (error) {
        console.error('Error fetching students and teachers:', error);
      }
    };

    fetchStudentsAndTeachers();
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
      // Send a POST request to add marks
      await axios.post('http://localhost:5000/mark/marks', {
        studentId,
        teacherId,
        subject: formData.subject,
        score: formData.score,
        student: formData.student,
        teacher: formData.teacher,
      });

      // Redirect to the marks list page after a brief delay
      setTimeout(() => {
        navigate('/allSubjectsMarks');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error('Error adding marks:', error);
      // Handle error or show a message to the user
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Marks</h2>
      <p>Teacher ID: {teacherId}</p>
      <p>Student ID: {studentId}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student:</label>
          <select
            className="form-control"
            name="student"
            value={formData.student}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Student</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Teacher:</label>
          <select
            className="form-control"
            name="teacher"
            value={formData.teacher}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            className="form-control"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Score:</label>
          <input
            type="number"
            className="form-control"
            name="score"
            value={formData.score}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Marks
        </button>
      </form>
    </div>
  );
};

export default AddMarks;
