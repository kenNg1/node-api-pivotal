module.exports = {
	up: (queryInterface, Sequelize)	=>
		queryInterface.createTable('Comments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			nickname: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			email: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false,
					isEmail: true
				}
			},
			site: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			message: {
				type: Sequelize.TEXT,
				allowNull: true,
				validate: {
					notEmpty:false
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			parent_id: {
				type      : Sequelize.INTEGER,
				onDelete  : 'CASCADE',
				onUpdate  : 'CASCADE',
				references: {
					model : 'Comments',
					key   : 'id',
					as	  : 'parent_id'
				}
			},
			user_id: {
				type      : Sequelize.INTEGER,
				onDelete  : 'RESTRICT',
				onUpdate  : 'CASCADE',
				references: {
					model : 'Users',
					key   : 'id',
					as	  : 'user_id'
				}
			},
			post_id: {
				type      : Sequelize.INTEGER,
				onDelete  : 'RESTRICT',
				onUpdate  : 'CASCADE',
				references: {
					model : 'Posts',
					key   : 'id',
					as	  : 'post_id'
				}
			}
		}),
	down: (queryInterface) => queryInterface.dropTable('Comments')
}