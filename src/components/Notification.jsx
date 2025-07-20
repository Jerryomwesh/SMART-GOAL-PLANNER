import React, { useEffect } from 'react';
import './Notification.css';

function Notification({ message, type, onClose }) {
  useEffect(() => {
    // Auto-close notification after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
}

export default Notification;