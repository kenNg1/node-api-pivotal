module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', {
		nickname: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: false
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: false,
				isEmail: true
			}
		},
		site: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: false
			}
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: true,
			validate: {
				notEmpty:false
			}
		},
	}, {
		classMethods: {
			associate: (models) => {
				Comment.belongsTo(Comment, { as: 'Parent' });
				Comment.hasMany(Comment, { as: 'Children', foreignKey: 'parent_id', useJunctionTable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
				Comment.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
				Comment.belongsTo(models.Post, { foreignKey: 'post_id', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
			}
		}
	});

	return Comment;
}