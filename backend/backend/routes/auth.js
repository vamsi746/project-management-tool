const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = 'your_jwt_secret_key'; // Use process.env.JWT_SECRET in production

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('📥 Register Request Body:', req.body); // Log incoming data

    if (!name || !email || !password) {
      console.log('❌ Missing fields in register');
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Email already exists');
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    console.log('✅ User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('❌ Register Error:', err); // Detailed error
    res.status(500).json({ message: 'Server error' });
  }
});


// POST /login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
