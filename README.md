# Smart Goal Planner

A React application for managing financial savings goals. This application allows users to create, track, update, and delete savings goals, as well as make deposits to existing goals.

## Features

- View all savings goals with progress tracking
- Add new financial goals with target amounts and deadlines
- Update existing goals
- Delete goals
- Make deposits to goals
- Track progress with visual progress bars
- View summary statistics in the overview section
- Status indicators for completed, warning, and overdue goals

## Technologies Used

- React (with Hooks for state management)
- JSON Server (for simulating a REST API)
- CSS for styling

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the JSON Server (in one terminal):
   ```bash
   npm run server
   ```

2. Start the React development server (in another terminal):
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

## Usage

- **View Goals**: All your savings goals are displayed on the main page with progress bars
- **Add a Goal**: Fill out the "Add New Goal" form and click "Add Goal"
- **Edit a Goal**: Click the "Edit" button on a goal card to modify its details
- **Delete a Goal**: Click the "Delete" button on a goal card
- **Make a Deposit**: Select a goal from the dropdown in the deposit form, enter an amount, and click "Make Deposit"
- **View Overview**: See summary statistics at the top of the page