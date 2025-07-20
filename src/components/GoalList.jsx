import React from 'react';
import './GoalList.css';

function GoalList({ goals }) {
  return (
    <div className="goal-list">
      <h2>My Savings Goals</h2>
      
      {goals.length === 0 ? (
        <p>No goals available yet</p>
      ) : (
        <ul className="goals">
          {goals.map(goal => (
            <li key={goal.id} className="goal-item">
              <h3>{goal.name}</h3>
              <p>Target: ${goal.targetAmount}</p>
              <p>Saved: ${goal.savedAmount}</p>
              <p>Category: {goal.category}</p>
              <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GoalList;