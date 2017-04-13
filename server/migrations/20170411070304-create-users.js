module.exports = {
	up: (queryInterface, Sequelize) => 
		queryInterface.createTable('Users', {
			id: {
				allowNull: false,
		        autoIncrement: true,
		        primaryKey: true,
		        type: Sequelize.INTEGER
			},
			email: {
				type: Sequelize.STRING,
				alloeNull: false,
				unique: true,
				validate: {
					isLowercase: true,
					notEmpty: true,
					isEmail: true
				}
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isLowercase: true,
					notEmpty: true,
					min: 3
				}
			},
			salt: {
				type: Sequelize.STRING,
				allowNull: true
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			role: {
				type: Sequelize.STRING,
				defaultValue: 'user',
				validate: {
				isIn: [['user', 'admin', 'super admin']]
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		}, {
			schema: 'admin'
		}),
	down: (queryInterface) => queryInterface.dropTable('Users'),
};