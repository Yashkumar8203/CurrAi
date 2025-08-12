import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import aiRoutes from './routes/ai.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());




const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    console.log(mongoURI, "Mongo URI");

    if (!mongoURI) {
      throw new Error('MongoDB connection string is not defined in environment variables');
    }

    await mongoose.connect(mongoURI, {
      retryWrites: true,
      w: 'majority'
    });

    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);

    if (error.message.includes('ENOTFOUND')) {
      console.error('Could not reach the MongoDB server. Check internet connection and URI.');
    } else if (error.message.includes('Authentication failed')) {
      console.error('MongoDB authentication failed. Check username/password.');
    } else if (error.message.includes('whitelist')) {
      console.error('IP not whitelisted in MongoDB Atlas. Add it in Network Access.');
    }

    process.exit(1);
  }
};


// Connect to MongoDB
connectDB();

// MongoDB connection event handlers
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

// Error handling middleware


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 