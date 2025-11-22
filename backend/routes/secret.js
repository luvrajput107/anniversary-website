import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/secret/verify
router.post('/verify', authenticate, async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      // Log failed attempt
      prisma.event.create({
        data: {
          userId: req.userId,
          eventType: 'secret_page_unlock_attempt',
          eventData: { success: false }
        }
      }).catch(err => console.error('Error logging secret attempt:', err));

      return res.status(400).json({ 
        success: false, 
        message: 'Code is required' 
      });
    }

    const secretCode = process.env.SECRET_PAGE_CODE || 'babyji';

    if (code !== secretCode) {
      // Log failed attempt
      prisma.event.create({
        data: {
          userId: req.userId,
          eventType: 'secret_page_unlock_attempt',
          eventData: { success: false }
        }
      }).catch(err => console.error('Error logging secret attempt:', err));

      return res.status(401).json({ 
        success: false, 
        message: 'Incorrect code' 
      });
    }

    // Log success
    prisma.event.create({
      data: {
        userId: req.userId,
        eventType: 'secret_page_success',
        eventData: { success: true }
      }
    }).catch(err => console.error('Error logging secret success:', err));

    res.json({ success: true });
  } catch (error) {
    console.error('Secret verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
});

export default router;

