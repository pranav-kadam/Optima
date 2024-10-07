// app/models/Sales.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Sales = sequelize.define('Sales', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  employee_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Employees',
      key: 'id'
    }
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sale_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Sales;
