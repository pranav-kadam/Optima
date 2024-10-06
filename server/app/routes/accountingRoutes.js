// app/routes/accountingRoutes.js
const express = require('express');
const router = express.Router();
const { getEntries } = require('../controllers/accountingController');

router.get('/entries', getEntries);

module.exports = router;
