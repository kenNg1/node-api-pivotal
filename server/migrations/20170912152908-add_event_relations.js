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
      queryInterface.addColumn(
        'Events',
        'user_id',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'Events',
        'district_id',
        {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      ),
      queryInterface.addColumn(
        'Events',
        'sport_id',
        {
          type: Sequelize.INTEGER,
          allowNull: false
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

    // keeping commented out - put back in if needed 
    // return [
    //   queryInterface.removeColumn(
    //     'Users',
    //     'user_id',
    //     {
    //       type: Sequelize.INTEGER,
    //       allowNull: false
    //     }
    //   ),
    //   queryInterface.addColumn(
    //     'Districts',
    //     'district_id',
    //     {
    //       type: Sequelize.INTEGER,
    //       allowNull: false
    //     }
    //   ),
    //   queryInterface.addColumn(
    //     'Sports',
    //     'sport_id',
    //     {
    //       type: Sequelize.INTEGER,
    //       allowNull: false
    //     }
    //   )
    // ]
  }
};
