import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import TaskDetails from './pages/TaskDetails';
import KanbanBoard from './pages/KanbanBoard';
import Analytics from './pages/Analytics';
import GanttChart from './pages/GanttChart';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />

          <Route
            path="/add"
            element={
              <PrivateRoute>
                <AddTask />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditTask />
              </PrivateRoute>
            }
          />

          <Route
            path="/taskdetails/:id"
            element={
              <PrivateRoute>
                <TaskDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/kanban"
            element={
              <PrivateRoute>
                <KanbanBoard />
              </PrivateRoute>
            }
          />

          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />

          <Route
            path="/gantt"
            element={
              <PrivateRoute>
                <GanttChart />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
