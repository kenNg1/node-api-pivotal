'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      queryInterface.removeColumn(
        'Sports',
        'rules',
        {
          type: Sequelize.STRING,
          // allowNull: false
        }
      )
    ]
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return [
      queryInterface.addColumn(
        'Details',
        'rules',
        {
          type: Sequelize.STRING,
          // allowNull: false
        }
      )
    ]
  }

};
