import React, { useEffect, useState } from 'react';

function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:grayscale-50 transition duration-300"
        >
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
      <main className="animate-fadeIn transition-all duration-500">{children}</main>
    </div>
  );
}

export default Layout;
