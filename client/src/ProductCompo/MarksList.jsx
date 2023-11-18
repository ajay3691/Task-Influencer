import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DashboardMenu from '../AuthCompo/DashboardMenu'; // Adjust the import path based on your file structure

const MarkList = () => {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        // Make a GET request to fetch all marks
        const response = await axios.get('http://localhost:5000/mark/marks');
        setMarks(response.data);
      } catch (error) {
        console.error('Error fetching marks:', error);
      }
    };

    fetchMarks();
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to delete the mark with the given ID
      await axios.delete(`http://localhost:5000/mark/marks/${id}`);
      // Update the component's state to remove the deleted mark
      setMarks((prevMarks) => prevMarks.filter((mark) => mark._id !== id));
    } catch (error) {
      console.error('Error deleting mark:', error);
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
        <div>
          <h2>Mark List</h2>
          <Link to="/add-mark" className="btn btn-primary mb-3">
            Add Mark
          </Link>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark) => (
                <tr key={mark._id}>
                  <td>{mark._id}</td>
                  <td>{mark.student.name}</td>
                  <td>{mark.subject}</td>
                  <td>{mark.score}</td>
                  <td>
                    <button onClick={() => handleDelete(mark._id)} className="btn btn-danger">
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
  );
};

export default MarkList;
