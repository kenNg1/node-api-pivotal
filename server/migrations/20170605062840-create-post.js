module.exports = {
	up: (queryInterface, Sequelize)	=>
		queryInterface.createTable('Posts', {
			id: {
        		allowNull: false,
        		autoIncrement: true,
        		primaryKey: true,
        		type: Sequelize.INTEGER
      		},
      		title: {
		    	type: Sequelize.STRING,
				allowNull: false
		    },
			slug: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
					isLowercase: true
				}
			},
			short_desc: {
				type: Sequelize.STRING,
				allowNull: true,
				validate: {
					notEmpty: false
				}
			},
			content_post: {
			    type: Sequelize.TEXT,
				allowNull: true,
				validate: {
					notEmpty: false
				}
		    },
			post_type: {
				type: Sequelize.STRING,
				defaultValue: 'post',
				validate: {
					isIn: [['post', 'page']]
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
		    user_id: {
				type      : Sequelize.INTEGER,
				onDelete  : 'RESTRICT',
				onUpdate  : 'CASCADE',
				references: {
					model : 'Users',
					key   : 'id',
					as	  : 'user_id'
				}
			}
		}),
	down: (queryInterface) => queryInterface.dropTable('Posts')
};