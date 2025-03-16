import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // Implement login logic here
    setIsAuthenticated(true);
  };

  const handleSignup = () => {
    // Implement signup logic here
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <svg
          className="navbar-logo"
          width="40"
          height="40"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#00ffff"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <span className="navbar-title">KASH</span>
      </Link>

      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <button onClick={handleLogout} className="profile-button">
              Logout
            </button>
          </>
        ) : (
          <div className="auth-buttons">
            <button onClick={handleLogin} className="login-button">
              Login
            </button>
            <button onClick={handleSignup} className="signup-button">
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;