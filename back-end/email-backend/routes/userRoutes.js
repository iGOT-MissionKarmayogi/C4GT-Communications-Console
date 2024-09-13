import express from 'express';
import User from '../models/userModel.js';
import { verify, roleAuthorization } from '../../middlewares/authenticated.js';


const router = express.Router();

// Example route to add a user (for testing purposes)
router.post('/', verify, roleAuthorization(['Admin']), async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add user' });
  }
});

export default router;
