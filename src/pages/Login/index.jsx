import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isLogin) {
      // Additional signup validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
    }

    // Mock authentication check (in a real app, this would be an API call)
    const mockAuthCheck = () => {
      // Simulating a server check
      if (isLogin) {
        // In a real app, you would verify credentials against a backend
        return { success: true, message: 'Login successful' };
      } else {
        // In a real app, you would create a new user in the backend
        return { success: true, message: 'Account created successfully' };
      }
    };

    const authResult = mockAuthCheck();

    if (authResult.success) {
      // Store user data in localStorage and trigger storage event
      const userData = {
        email: formData.email,
        isAuthenticated: true,
        lastLogin: new Date().toISOString()
      };
      localStorage.setItem('user', JSON.stringify(userData));
      // Dispatch storage event for other components to detect the change
      window.dispatchEvent(new Event('storage'));
    } else {
      setError(authResult.message);
      return;
    }

    // Navigate to home page after successful login/signup
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to Kash</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="form-input"
              />
            </div>
          )}
          <button type="submit" className="login-button">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          <div className="toggle-form">
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;