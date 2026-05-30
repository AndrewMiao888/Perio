import express from 'express';
import {
  getElements,
  getElementById,
  createElement,
  getElementBySymbol,
  getPeriodicTable,
  getStatistics
} from '../controllers/sampleController.js';

const router = express.Router();

// Element routes
router.get('/elements', getElements);
router.get('/elements/:id', getElementById);
router.get('/elements/by-symbol/:symbol', getElementBySymbol);
router.post('/elements', createElement);

// Periodic table and analysis routes
router.get('/periodic-table', getPeriodicTable);
router.get('/statistics', getStatistics);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'API is healthy' });
});

export default router;
