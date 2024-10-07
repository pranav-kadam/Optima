// routes/accountantRoutes.js
const express = require('express');
const accountantController = require('../controllers/roles/accountantController');

const router = express.Router();

router.get('/', accountantController.getAllAccountants);
router.get('/:id', accountantController.getAccountantById);

module.exports = router;
