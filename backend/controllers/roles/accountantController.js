const db = require('../../utils/db');

const accessInvoices = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM invoices');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
module.exports = { accessInvoices };
