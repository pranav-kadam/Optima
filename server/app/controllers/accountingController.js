// app/controllers/accountingController.js
const Accounting = require('../models/Accounting');

exports.getEntries = async (req, res) => {
  try {
    const entries = await Accounting.findAll();
    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
