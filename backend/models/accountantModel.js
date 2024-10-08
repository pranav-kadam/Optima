// models/accountantModel.js
const db = require('../utils/db');

// Fetch invoice details by invoice ID
const getInvoiceDetails = async (invoiceId) => {
  const query = 'SELECT * FROM invoices WHERE id = $1';
  const result = await db.query(query, [invoiceId]);
  return result.rows[0];
};

// Fetch order/transaction details by order ID
const getOrderDetails = async (orderId) => {
  const query = 'SELECT * FROM transactions WHERE order_id = $1';
  const result = await db.query(query, [orderId]);
  return result.rows[0];
};

// Generate Balance Sheet data (assuming a predefined table or calculation logic)
const getBalanceSheetData = async () => {
  const query = 'SELECT * FROM balance_sheet_data';
  const result = await db.query(query);
  return result.rows;
};

// Generate Income Statement data
const getIncomeStatementData = async () => {
  const query = 'SELECT * FROM income_statement_data';
  const result = await db.query(query);
  return result.rows;
};

// Generate Cash Flow Statement data
const getCashFlowStatementData = async () => {
  const query = 'SELECT * FROM cash_flow_data';
  const result = await db.query(query);
  return result.rows;
};

// Generate Accounts Receivable (A/R) report
const getARReport = async () => {
  const query = `
    SELECT customer_id, SUM(amount_due) as total_due
    FROM invoices
    WHERE status = 'unpaid'
    GROUP BY customer_id
  `;
  const result = await db.query(query);
  return result.rows;
};

// Custom Report Generation (template logic where accountant inputs values)
const generateCustomReport = async (reportType, values) => {
  // Logic based on the report type and user inputs (values)
  // For example, a simplified template report generation
  return { reportType, data: values };
};

module.exports = {
  getInvoiceDetails,
  getOrderDetails,
  getBalanceSheetData,
  getIncomeStatementData,
  getCashFlowStatementData,
  getARReport,
  generateCustomReport
};
