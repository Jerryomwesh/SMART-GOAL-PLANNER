import React from 'react';
import './ErrorMessage.css';

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      <div className="error-icon">!</div>
      <p>{message}</p>
    </div>
  );
}

export default ErrorMessage;