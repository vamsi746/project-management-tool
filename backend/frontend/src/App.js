
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./pages/TaskList";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import KanbanBoard from './pages/KanbanBoard';
import TaskDetails from './pages/TaskDetails';
import Analytics from './pages/Analytics';
import GanttChart from './pages/GanttChart';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute><TaskList /></ProtectedRoute>
            } />
            <Route path="/add" element={
              <ProtectedRoute><AddTask /></ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute><EditTask /></ProtectedRoute>
            } />
            <Route path="/kanban" element={
              <ProtectedRoute><KanbanBoard /></ProtectedRoute>
            } />
            <Route path="/task/:id" element={
              <ProtectedRoute><TaskDetails /></ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute><Analytics /></ProtectedRoute>
            } />
            <Route path="/gantt" element={
              <ProtectedRoute><GanttChart /></ProtectedRoute>
            } />
          </Routes>
        </main>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;