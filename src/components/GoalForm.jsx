import React, { useState } from 'react';
import './GoalForm.css';

function GoalForm({ onAddGoal }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    savedAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'targetAmount' || name === 'savedAmount' ? Number(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new goal object with today's date as createdAt
    const newGoal = {
      ...formData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Pass the new goal to the parent component
    onAddGoal(newGoal);
    
    // Reset the form
    setFormData({
      name: '',
      targetAmount: '',
      savedAmount: '',
      category: '',
      deadline: ''
    });
  };

  return (
    <div className="goal-form-container">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Goal Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount ($):</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="savedAmount">Initial Amount ($):</label>
          <input
            type="number"
            id="savedAmount"
            name="savedAmount"
            value={formData.savedAmount}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
}

export default GoalForm;