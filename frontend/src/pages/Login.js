// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#121212' : '#f0f2f5';
    document.body.style.color = darkMode ? '#f0f0f0' : '#333';
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.name); // save name for greeting

      setMessage('✅ Login successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error('Login error:', err);
      setMessage(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', next);
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '100px auto',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: darkMode
          ? '0 0 10px rgba(0,0,0,0.7)'
          : '0 0 10px rgba(0,0,0,0.1)',
        backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        textAlign: 'center'
      }}
    >
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '20px'
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#f0f0f0' : '#000'
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#f0f0f0' : '#000'
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          onClick={toggleDarkMode}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: darkMode ? '#555' : '#333',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
        {message && (
          <p
            style={{
              color: message.includes('✅') ? 'lightgreen' : 'red',
              marginTop: '10px'
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Login;
