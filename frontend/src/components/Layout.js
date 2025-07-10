import React from 'react';
import Navbar from './Navbar';

function Layout({ children }) {
  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar with the single dark mode toggle */}
      <Navbar />
      <main className="animate-fadeIn transition-all duration-500">
        {children}
      </main>
    </div>
  );
}

export default Layout;
