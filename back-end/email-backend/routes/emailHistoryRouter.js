import express from 'express';
import { getHistory } from '../controllers/historyController.js';

const router = express.Router();

// Route to fetch all history
router.get('/history', async (req, res) => {
  try {
    /**
     * Represents the email history.
     * @type {Array}
     */
    const history = await getHistory();
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Failed to fetch history' });
  }
});


export default router;