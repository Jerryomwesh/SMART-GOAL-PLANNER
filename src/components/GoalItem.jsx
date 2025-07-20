import React, { useState } from 'react';
import './GoalItem.css';

function GoalItem({ goal, onDeleteGoal, onUpdateGoal }) {
  const { id, name, targetAmount, savedAmount, category, deadline } = goal;
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState({
    name: name,
    targetAmount: targetAmount,
    category: category,
    deadline: deadline
  });
  
  // Calculate progress percentage
  const progressPercentage = Math.min(Math.round((savedAmount / targetAmount) * 100), 100);
  
  // Calculate days left until deadline
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
  
  // Determine goal status
  let status = "In Progress";
  let statusClass = "status-in-progress";
  
  if (savedAmount >= targetAmount) {
    status = "Completed";
    statusClass = "status-completed";
  } else if (daysLeft < 0) {
    status = "Overdue";
    statusClass = "status-overdue";
  } else if (daysLeft <= 30) {
    status = "Warning";
    statusClass = "status-warning";
  }
  
  // Handle delete button click
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the goal "${name}"?`)) {
      onDeleteGoal(id);
    }
  };
  
  // Handle edit form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal({
      ...editedGoal,
      [name]: name === 'targetAmount' ? Number(value) : value
    });
  };
  
  // Handle edit form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create updated goal object
    const updatedGoal = {
      ...goal,
      ...editedGoal
    };
    
    onUpdateGoal(id, updatedGoal);
    setIsEditing(false);
  };
  
  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };
  
  return (
    <div className="goal-item">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedGoal.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Target Amount:</label>
            <input
              type="number"
              name="targetAmount"
              value={editedGoal.targetAmount}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={editedGoal.category}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={editedGoal.deadline}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={toggleEdit}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <div className="goal-header">
            <h3>{name}</h3>
            <span className={`status-badge ${statusClass}`}>{status}</span>
          </div>
          
          <p><strong>Category:</strong> {category}</p>
          <p><strong>Target:</strong> ${targetAmount.toLocaleString()}</p>
          <p><strong>Saved:</strong> ${savedAmount.toLocaleString()}</p>
          <p><strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}</p>
          <p><strong>Days Left:</strong> {daysLeft > 0 ? daysLeft : 'Past deadline'}</p>
          
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="progress-text">{progressPercentage}% complete</p>
          
          <div className="goal-actions">
            <button className="edit-btn" onClick={toggleEdit}>Edit</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default GoalItem;