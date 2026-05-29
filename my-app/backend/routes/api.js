import express from 'express';
import {
  getElements,
  getElementById,
  createElement
} from '../controllers/sampleController.js';

const router = express.Router();

// Element routes
router.get('/elements', getElements);
router.get('/elements/:id', getElementById);
router.post('/elements', createElement);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'API is healthy' });
});

export default router;
