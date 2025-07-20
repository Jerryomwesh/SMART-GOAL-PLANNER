import React from 'react';
import './GoalItem.css';

function GoalItem({ goal, onDeleteGoal }) {
  const { id, name, targetAmount, savedAmount, category, deadline } = goal;
  
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((savedAmount / targetAmount) * 100), 100);
  
  // Handle delete button click
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the goal "${name}"?`)) {
      onDeleteGoal(id);
    }
  };
  
  return (
    <div className="goal-item">
      <h3>{name}</h3>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Target:</strong> ${targetAmount}</p>
      <p><strong>Saved:</strong> ${savedAmount}</p>
      <p><strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}</p>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="progress-text">{progressPercentage}% complete</p>
      
      <div className="goal-actions">
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default GoalItem;