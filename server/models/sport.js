'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sport = sequelize.define('Sport', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    rules: DataTypes.STRING,
    sportsExternalUrl: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Sport.hasMany(models.Event, { foreignKey: 'sport_id', as : 'sportEvents' });
      }
    }
  });
  return Sport;
};