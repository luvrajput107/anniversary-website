import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/events
router.post('/', authenticate, async (req, res) => {
  try {
    const { eventType, eventData } = req.body;

    if (!eventType) {
      return res.status(400).json({ 
        success: false, 
        message: 'eventType is required' 
      });
    }

    // Log event (non-blocking)
    prisma.event.create({
      data: {
        userId: req.userId,
        eventType,
        eventData: eventData || {}
      }
    }).catch(err => {
      console.error('Error logging event:', err);
      // Don't throw - fail silently
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Events error:', error);
    // Still return success even if logging fails
    res.json({ success: true });
  }
});

export default router;

