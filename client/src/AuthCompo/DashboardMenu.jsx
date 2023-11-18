// DashboardMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardMenu = () => {
  return (
    <div className="dashboard-menu">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/createstudent">Add Students</Link>
        </li>
        {/* <li>
          <Link to="/createTeacher">Add Teachers</Link>
        </li> */}
        <li>
          <Link to="/teachersList">teachers List</Link>
        </li>
        <li>
          <Link to="/markList">Mark List</Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardMenu;
