// routes/accountantRoutes.js
const express = require('express');
const accountantController = require('../controllers/roles/accountantController');
const router = express.Router();


router.get('/invoices', accountantController.getInvoiceDetails);

/*
router.get('/order/:orderId', accountantController.getOrderDetails);
router.get('/reports/balance-sheet', accountantController.generateBalanceSheet);
router.get('/reports/income-statement', accountantController.generateIncomeStatement);
router.get('/reports/cash-flow-statement', accountantController.generateCashFlowStatement);
router.get('/reports/ar', accountantController.generateARReport);
router.get('/files/search', accountantController.searchExcelFile);
router.post('/reports/custom', accountantController.generateCustomReport);
*/

module.exports = router;
