// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔁 Route Imports
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

// 🔒 CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://project-management-tool-delta-rosy.vercel.app' // ✅ your Vercel frontend
    ],
    credentials: false, // ❌ disable credentials since you are using JWT in headers
  })
);

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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
