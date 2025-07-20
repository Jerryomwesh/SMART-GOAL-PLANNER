import { useState, useEffect } from 'react'
import './App.css'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import DepositForm from './components/DepositForm'
import Overview from './components/Overview'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import Notification from './components/Notification'

function App() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)
  
  // Function to show a notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
  };
  
  // Function to clear notification
  const clearNotification = () => {
    setNotification(null);
  };

  useEffect(() => {
    // Fetch goals from json-server
    fetch('http://localhost:3000/goals')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch goals')
        }
        return response.json()
      })
      .then(data => {
        setGoals(data)
        setLoading(false)
      })
      .catch(error => {
        setError(error.message)
        setLoading(false)
      })
  }, [])

  // Function to add a new goal
  const handleAddGoal = (newGoal) => {
    // Send POST request to json-server
    fetch('http://localhost:3000/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoal),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add goal')
        }
        return response.json()
      })
      .then(data => {
        // Add the new goal to the state
        setGoals([...goals, data])
        showNotification('Goal added successfully!', 'success')
      })
      .catch(error => {
        setError(error.message)
        showNotification('Failed to add goal', 'error')
      })
  }

  // Function to delete a goal
  const handleDeleteGoal = (id) => {
    // Send DELETE request to json-server
    fetch(`http://localhost:3000/goals/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete goal')
        }
        // Remove the goal from the state
        setGoals(goals.filter(goal => goal.id !== id))
      })
      .catch(error => {
        setError(error.message)
      })
  }
  
  // Function to update a goal
  const handleUpdateGoal = (id, updatedGoal) => {
    // Send PATCH request to json-server
    fetch(`http://localhost:3000/goals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedGoal),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update goal')
        }
        return response.json()
      })
      .then(data => {
        // Update the goal in the state
        setGoals(goals.map(goal => goal.id === id ? data : goal))
      })
      .catch(error => {
        setError(error.message)
      })
  }
  
  // Function to make a deposit to a goal
  const handleMakeDeposit = (goalId, amount) => {
    // Find the goal to update
    const goalToUpdate = goals.find(goal => goal.id === goalId);
    
    if (!goalToUpdate) {
      setError('Goal not found');
      return;
    }
    
    // Calculate new saved amount
    const newSavedAmount = goalToUpdate.savedAmount + amount;
    
    // Send PATCH request to json-server
    fetch(`http://localhost:3000/goals/${goalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ savedAmount: newSavedAmount }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to make deposit')
        }
        return response.json()
      })
      .then(data => {
        // Update the goal in the state
        setGoals(goals.map(goal => goal.id === goalId ? data : goal))
      })
      .catch(error => {
        setError(error.message)
      })
  }

  return (
    <div className="app-container">
      <header>
        <h1>Smart Goal Planner</h1>
        <p>Track your financial goals and savings progress</p>
      </header>
      <main>
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            <Overview goals={goals} />
            
            <div className="forms-container">
              <GoalForm onAddGoal={handleAddGoal} />
              <DepositForm goals={goals} onMakeDeposit={handleMakeDeposit} />
            </div>
            
            <GoalList 
              goals={goals} 
              onDeleteGoal={handleDeleteGoal}
              onUpdateGoal={handleUpdateGoal} 
            />
          </>
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Smart Goal Planner</p>
      </footer>
    </div>
  )
}

export default App