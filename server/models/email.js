'use strict';
module.exports = (sequelize, DataTypes) => {
  var Email = sequelize.define('Email', {
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Email.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
      }
    }
  });
  return Email;
};