import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth.Context';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <div className="nav-brand">
            <Link to="/">School Materials</Link>
          </div>
          
          <div className="nav-links">
            {user ? (
              <>
                <span>Welcome, {user.username} ({user.role})</span>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/requests">My Requests</Link>
                {/* ALL USERS can create requests */}
                <Link to="/requests/create">Create Request</Link>
                <button 
                  onClick={handleLogout}
                  className="btn btn-danger"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;