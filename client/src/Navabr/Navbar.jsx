// Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { store } from '../App';

const Navbar = () => {
  const [token, setToken] = useContext(store);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token
    setToken(null);

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <Link to="/index" className='navbar-brand'>Authentication</Link>
        <div className='ml-auto'>
          <ul className='navbar-nav'>
            {token ? (
              // If user is logged in, show "Logout"
              <>
                <li className='nav-list'><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
                <li className='nav-list'><Link className="nav-link" to="/teachersBoard">TeachersBoard</Link></li>
                <li className='nav-list'><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              // If user is not logged in, show "Register" and "Login"
              <>
                <li className='nav-list'><Link className="nav-link" to="/register">Register</Link></li>
                <li className='nav-list'><Link className="nav-link" to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
