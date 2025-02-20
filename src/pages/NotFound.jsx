import React from 'react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="container">
      <h2>404 - Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default NotFound;