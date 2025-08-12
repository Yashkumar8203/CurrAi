import express from 'express';
import { auth } from '../middleware/auth.js';
import { aiService } from '../services/aiService.js';

const router = express.Router();

// Middleware to validate request body
const validateRequest = (req, res, next) => {
  const { subject, classLevel, chapter } = req.body;
  if (!subject || !classLevel || !chapter) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  next();
};

// Generate lesson plan
router.post('/lesson-plan', auth, validateRequest, async (req, res) => {
  try {
    console.log('Received lesson plan request:', {
      body: req.body,
      headers: req.headers,
      userId: req.userId
    });
    
    const { subject, classLevel, chapter } = req.body;
    const content = await aiService.generateLessonPlan(subject, classLevel, chapter);
    res.json({ content });
  } catch (error) {
    console.error('Error in lesson plan generation:', error);
    res.status(500).json({ message: error.message });
  }
});

// Generate quiz
router.post('/quiz', auth, validateRequest, async (req, res) => {
  try {
    console.log('Received quiz request:', {
      body: req.body,
      headers: req.headers,
      userId: req.userId
    });
    
    const { subject, classLevel, chapter } = req.body;
    const content = await aiService.generateQuiz(subject, classLevel, chapter);
    res.json({ content });
  } catch (error) {
    console.error('Error in quiz generation:', error);
    res.status(500).json({ message: error.message });
  }
});

// Generate homework
router.post('/homework', auth, validateRequest, async (req, res) => {
  try {
    console.log('Received homework request:', {
      body: req.body,
      headers: req.headers,
      userId: req.userId
    });
    
    const { subject, classLevel, chapter } = req.body;
    const content = await aiService.generateHomework(subject, classLevel, chapter);
    res.json({ content });
  } catch (error) {
    console.error('Error in homework generation:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router; 