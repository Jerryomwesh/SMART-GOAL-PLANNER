import React from 'react';
import './GoalList.css';
import GoalItem from './GoalItem';

function GoalList({ goals, onDeleteGoal }) {
  return (
    <div className="goal-list">
      <h2>My Savings Goals</h2>
      
      {goals.length === 0 ? (
        <p>No goals available yet</p>
      ) : (
        <div className="goals-grid">
          {goals.map(goal => (
            <GoalItem 
              key={goal.id} 
              goal={goal} 
              onDeleteGoal={onDeleteGoal} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GoalList;