// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔁 Route Imports
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

// ✅ Custom CORS middleware
const allowedOrigins = [
  'http://localhost:3000',
  'https://project-management-tool-k4sdn3hnx-vamsi746s-projects.vercel.app',
  'https://project-management-tool-delta-rosy.vercel.app'
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// 🌐 Body parser
app.use(express.json());

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Backend is running...');
});

// 📌 Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// 🌐 MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if DB fails
  });

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
