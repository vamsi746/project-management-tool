import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white dark:bg-gray-900 shadow-md transition-all duration-300">
      <div className="text-xl font-bold">📋 TaskManager</div>

      <ul className="flex gap-4 items-center text-sm font-medium">
        {isLoggedIn ? (
          <>
            <li><Link to="/" className="hover:underline hover:text-yellow-300">Tasks</Link></li>
            <li><Link to="/add" className="hover:underline hover:text-yellow-300">Add</Link></li>
            <li><Link to="/kanban" className="hover:underline hover:text-yellow-300">Kanban</Link></li>
            <li><Link to="/analytics" className="hover:underline hover:text-yellow-300">Analytics</Link></li>
            <li><Link to="/gantt" className="hover:underline hover:text-yellow-300">Gantt</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 dark:text-gray-900 px-3 py-1 rounded hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login" className="hover:underline">Login</Link></li>
            <li><Link to="/register" className="hover:underline">Register</Link></li>
          </>
        )}

        {/* 🌗 Theme Toggle Button */}
        <li>
          <button
            onClick={toggleTheme}
            className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
