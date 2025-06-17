// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// 🔁 Route Imports
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

// 🔒 Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://project-management-tool-delta-rosy.vercel.app' // ✅ Your Vercel frontend
  ],
  credentials: true,
}));
app.use(express.json()); // Parse JSON bodies

// 📌 Routes
app.use('/tasks', taskRoutes);  // Task-related endpoints
app.use('/auth', authRoutes);   // Auth endpoints: /auth/register, /auth/login

// 🌐 MongoDB Atlas Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// 🚀 Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
