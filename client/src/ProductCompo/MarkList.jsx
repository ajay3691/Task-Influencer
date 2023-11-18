import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardMenu from '../AuthCompo/DashboardMenu'; // Adjust the import path based on your file structure

const MarkList = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        // Make a GET request to fetch all marks
        const response = await axios.get('http://localhost:5000//mark/marks');
        setMarks(response.data);
      } catch (error) {
        console.error('Error fetching marks:', error);
      }
    };

    fetchMarks();
  }, []); // Empty dependency array to fetch data only once when the component mounts

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
        <div>
          <h2>Mark List</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Subject</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark) => (
                <tr key={mark._id}>
                  <td>{mark._id}</td>
                  <td>{mark.student.name}</td>
                  <td>{mark.subject}</td>
                  <td>{mark.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarkList;
