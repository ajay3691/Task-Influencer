import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/admin" className="navbar-brand">Admin</Link>
      <div className="ml-auto">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/add-mark" className="nav-link">Add Mark</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
