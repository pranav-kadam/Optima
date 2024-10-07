const Sales = require('../models/Sales');

exports.addSale = async (req, res) => {
  const { employee_id, customer_name, amount, sale_date } = req.body;
  try {
    const sale = await Sales.create({
      employee_id,
      customer_name,
      amount,
      sale_date
    });
    res.status(201).json({ success: true, data: sale });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sales.findAll();
    res.json({ success: true, data: sales });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
