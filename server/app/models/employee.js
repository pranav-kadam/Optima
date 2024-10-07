// app/models/Employee.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Accountant', 'Salesman'),
    allowNull: false,
    defaultValue: 'Accountant'
  }
});

module.exports = Employee;
