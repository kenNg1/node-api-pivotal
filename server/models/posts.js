module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define('Post', {
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		slug: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
				isLowercase: true
			}
		},
		short_desc: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: false
			}
		},
		content_post: {
			type: DataTypes.TEXT,
			allowNull: true,
			validate: {
				notEmpty: false
			}
		},
		post_type: {
			type: DataTypes.STRING,
			defaultValue: 'post',
			validate: {
				isIn: [['post', 'page']]
			}
		}
	}, {
		classMethods: {
			associate: (models) => {
				Post.belongsTo(models.User, {
					foreignKey: 'user_id',
					onDelete: 'RESTRICT',
					onUpdate: 'CASCADE'
				});
			}
		}
	});

	Post.beforeCreate( (post, options, done) => {
		if(empty(post.slug)){
			post.slug = post.id;
		}
		return done(null, post);
	});

	return Post;
};