import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

dotenv.config();
const router = express.Router();

// Get JWT secret from .env
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
console.log("JWT SECRET IS", JWT_SECRET);

// SIGNUP
// router.post('/signup', async (req, res) => {
//   console.log("🔥 Signup route hit");
//   try {
//     const { name, email, password, confirmPassword } = req.body;
//     console.log("📩 Request Body:", req.body);

//     if (!name || !email || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

//     res.status(201).json({
//       message: 'User created successfully',
//       token,
//       user: { id: user._id, name: user.name, email: user.email }
//     });

//   } catch (error) {
//     console.error("💥 Error in signup:", error);
//     res.status(500).json({ message: 'Error creating user', error: error.message });
//   }
// });


router.post('/signup', async (req, res) => {
  console.log("📩 Signup request body:", req.body);

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("❌ Email already exists");
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({ name, email, password });
    console.log("💾 Saving user...");
    await user.save();

    console.log("✅ User saved:", user._id);
    res.status(201).json({ message: 'User created successfully', userId: user._id });

  } catch (error) {
    console.error("🔥 Error during signup:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// VERIFY
router.get('/verify', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying token', error: error.message });
  }
});

export default router;
