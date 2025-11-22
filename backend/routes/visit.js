import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/visit
router.post('/', authenticate, async (req, res) => {
  try {
    // Upsert visit stats
    const visitStats = await prisma.visitStats.upsert({
      where: { userId: req.userId },
      update: {
        totalVisits: { increment: 1 },
        lastVisit: new Date()
      },
      create: {
        userId: req.userId,
        totalVisits: 1,
        lastVisit: new Date()
      }
    });

    // Log page_visit event
    prisma.event.create({
      data: {
        userId: req.userId,
        eventType: 'page_visit',
        eventData: { totalVisits: visitStats.totalVisits }
      }
    }).catch(err => console.error('Error logging visit event:', err));

    res.json({ success: true, visitStats });
  } catch (error) {
    console.error('Visit tracking error:', error);
    // Still return success
    res.json({ success: true });
  }
});

export default router;

