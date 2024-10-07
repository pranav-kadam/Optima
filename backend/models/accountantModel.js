// models/accountantModel.js
const db = require('../utils/db');

const createAccountant = async (accountantData) => {
  const query = 'INSERT INTO accountants (name, salary, department) VALUES ($1, $2, $3) RETURNING *';
  const values = [accountantData.name, accountantData.salary, accountantData.department];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = { createAccountant };
