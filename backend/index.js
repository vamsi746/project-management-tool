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

// ✅ CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://project-management-tool-delta-rosy.vercel.app/',
  'https://project-management-tool-pszc1hloj-vamsi746s-projects.vercel.app',
  'https://project-management-tool-k4sdn3hnx-vamsi746s-projects.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed for this origin: ' + origin));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
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
    process.exit(1);
  });

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
