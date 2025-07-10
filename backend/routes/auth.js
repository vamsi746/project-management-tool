const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET; // ✅ Use .env variable

// POST /register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log('📥 Register Request Body:', req.body);

    if (!name || !email || !password) {
      console.log('❌ Missing fields in register');
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Email already exists');
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    console.log('✅ User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('❌ Register Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📥 Login request body:", req.body);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ User not found for email:", email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log("✅ User found. Stored hash:", user.password);
    console.log("🔑 Plain password entered:", password);

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("🔍 bcrypt.compare result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('❌ Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
