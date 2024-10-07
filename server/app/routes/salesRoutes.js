const express = require('express');
const router = express.Router();
const { addSale, getSales } = require('../controllers/salesController');

// Sales routes
router.post('/sales', addSale);
router.get('/sales', getSales);

module.exports = router;
