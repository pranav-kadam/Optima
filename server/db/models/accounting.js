const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Accounting = sequelize.define('Accounting', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  transaction_type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  transaction_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

module.exports = Accounting;
