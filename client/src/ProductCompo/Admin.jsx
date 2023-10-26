import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Admin() {
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/marks')
      .then((response) => {
        setMarks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const deleteMark = (markId) => {
    axios.delete(`http://localhost:5000/marks/${markId}`)
      .then(() => {
        setMarks((prevMarks) => prevMarks.filter((mark) => mark._id !== markId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-4">Admin Page</h2>
      <Link to="/add-mark" className="btn btn-primary mb-3">Add Marks</Link>

      <table className="table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            <tr key={mark._id}>
              <td>{mark.studentId}</td>
              <td>{mark.studentName}</td>
              <td>{mark.teacherName}</td>
              <td>{mark.subject}</td>
              <td>{mark.marks}</td>
              <td>
                <Link to={`/edit-mark/${mark._id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                <button onClick={() => deleteMark(mark._id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
