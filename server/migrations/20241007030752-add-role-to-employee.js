'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Employees', 'role', {
      type: Sequelize.ENUM('Accountant', 'Salesman'),
      allowNull: false,
      defaultValue: 'Accountant'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Employees', 'role');
  }
};
