import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/song-rating
router.post('/', authenticate, async (req, res) => {
  try {
    const { songId, rating } = req.body;

    if (!songId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ 
        success: false, 
        message: 'songId and rating (1-5) are required' 
      });
    }

    // Upsert rating
    await prisma.songRating.upsert({
      where: {
        userId_songId: {
          userId: req.userId,
          songId: String(songId)
        }
      },
      update: { rating },
      create: {
        userId: req.userId,
        songId: String(songId),
        rating
      }
    });

    // Log event
    prisma.event.create({
      data: {
        userId: req.userId,
        eventType: 'song_rating_set',
        eventData: { songId, rating }
      }
    }).catch(err => console.error('Error logging rating event:', err));

    res.json({ success: true });
  } catch (error) {
    console.error('Song rating error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router;

