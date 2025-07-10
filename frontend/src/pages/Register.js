import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance'; // ✅ using your custom axios instance
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
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

    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/register', {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      setMessage(res.data.message || 'Registered successfully');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Registration error:', err);
      setMessage(err.response?.data?.message || 'Registration failed');
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
        margin: '80px auto',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: darkMode
          ? '0 0 20px rgba(0,0,0,0.7)'
          : '0 0 20px rgba(0,0,0,0.1)',
        backgroundColor: darkMode ? '#1e1e1e' : '#ffffff',
        textAlign: 'center',
        transition: 'all 0.3s ease',
      }}
    >
      <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>Register</h2>
      <p style={{ fontSize: '14px', color: '#888' }}>
        Create your account below.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginTop: '20px',
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#f0f0f0' : '#000',
            fontSize: '14px',
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#f0f0f0' : '#000',
            fontSize: '14px',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            padding: '12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            backgroundColor: darkMode ? '#333' : '#fff',
            color: darkMode ? '#f0f0f0' : '#000',
            fontSize: '14px',
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '15px',
            transition: 'background 0.3s',
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <button
          type="button"
          onClick={toggleDarkMode}
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: darkMode ? '#555' : '#333',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
        {message && (
          <p
            style={{
              color: message.includes('successfully') ? 'lightgreen' : 'red',
              marginTop: '10px',
            }}
          >
            {message}
          </p>
        )}
      </form>
      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Already have an account?{' '}
        <Link
          to="/login"
          style={{
            color: '#4CAF50',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
