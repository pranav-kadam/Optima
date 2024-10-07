'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sales.init({
    employee_id: DataTypes.INTEGER,
    customer_name: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    sale_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};