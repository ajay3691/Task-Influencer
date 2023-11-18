// StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Dashboard.css'; // Replace with the correct path to your CSS file
import DashboardMenu from './DashboardMenu';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of students from the server
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []); // Empty dependency array ensures that the effect runs once after the initial render

  const handleDelete = async (id) => {
    try {
      // Delete the student with the given ID
      await axios.delete(`http://localhost:5000/student/students/${id}`);
      // Remove the deleted student from the state
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
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
        <div className="dashboard-header">
          <div className="user-info">
            <img src="user-avatar.jpg" alt="User Avatar" />
            <span>User Name</span>
          </div>
          <div className="dashboard-actions">
            <button className="btn btn-logout">Logout</button>
          </div>
        </div>

        <div className="dashboard-body">
          {/* Add Student Button */}
          <div className="dashboard-actions">
            <button className="btn btn-primary" onClick={() => navigate('/createstudent')}>
              Add Student
            </button>
          </div>

          {/* Student List Table */}
          <h2>Student List</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Class</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.class}</td>
                    <td>
                      <Link to={`/edit/${student.id}`} className="btn btn-warning mr-2">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(student.id)} className="btn btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
