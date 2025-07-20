import React from 'react';
import './Overview.css';

function Overview({ goals }) {
  // Calculate total number of goals
  const totalGoals = goals.length;
  
  // Calculate total money saved across all goals
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  
  // Calculate completed goals
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount);
  const completedGoalsCount = completedGoals.length;
  
  // Calculate goals with warnings (deadline within 30 days and not complete)
  const today = new Date();
  const warningGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    const daysLeft = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft >= 0 && goal.savedAmount < goal.targetAmount;
  });
  const warningGoalsCount = warningGoals.length;
  
  // Calculate overdue goals
  const overdueGoals = goals.filter(goal => {
    const deadlineDate = new Date(goal.deadline);
    return deadlineDate < today && goal.savedAmount < goal.targetAmount;
  });
  const overdueGoalsCount = overdueGoals.length;

  return (
    <div className="overview">
      <h2>Overview</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p>${totalSaved}</p>
        </div>
        
        <div className="stat-card">
          <h3>Completed Goals</h3>
          <p>{completedGoalsCount}</p>
        </div>
        
        <div className="stat-card warning">
          <h3>Goals Ending Soon</h3>
          <p>{warningGoalsCount}</p>
        </div>
        
        <div className="stat-card overdue">
          <h3>Overdue Goals</h3>
          <p>{overdueGoalsCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;