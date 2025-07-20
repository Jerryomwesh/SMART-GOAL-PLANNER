import { useState, useEffect } from 'react'
import './App.css'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import DepositForm from './components/DepositForm'

function App() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      })
      .catch(error => {
        setError(error.message)
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

  return (
    <div className="app-container">
      <header>
        <h1>Smart Goal Planner</h1>
        <p>Track your financial goals and savings progress</p>
      </header>
      <main>
        {loading && <p>Loading goals...</p>}
        {error && <p className="error">Error: {error}</p>}
        {!loading && !error && (
          <>
            <GoalForm onAddGoal={handleAddGoal} />
            <GoalList 
              goals={goals} 
              onDeleteGoal={handleDeleteGoal}
              onUpdateGoal={handleUpdateGoal} 
            />
          </>
        )}
      </main>
    </div>
  )
}

export default App