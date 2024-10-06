'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Accounting.init({
    transaction_type: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    transaction_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Accounting',
  });
  return Accounting;
};