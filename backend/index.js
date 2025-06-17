// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// 🔁 Route Imports
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

// 🔒 Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://project-management-tool-delta-rosy.vercel.app' // ✅ Vercel frontend
  ],
  credentials: true,
}));
app.use(express.json()); // Needed to parse JSON request bodies

// ✅ Health check route (fixes "Cannot GET /" issue)
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// 📌 Routes
app.use('/api/tasks', taskRoutes);   // All task routes under /api/tasks
app.use('/api/auth', authRoutes);    // All auth routes under /api/auth

// 🌐 MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
