const bcrypt = require('bcrypt');
const config = require('../config/general');

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isLowercase: true,
				notEmpty: true,
				isEmail: true
			}
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isLowercase: true,
				notEmpty: true,
				min: 3
			}
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		role: {
			type: DataTypes.STRING,
			defaultValue: 'user',
			validate: {
				isIn: [['user', 'admin', 'super admin']]
			}
		}
	}, {
		// schema: 'admin',
		classMethods: {
			validPassword: (password, passwd, done) => {
				const tmppass = password + config.secret;
				bcrypt.compare(tmppass, passwd, (err, isMatch) => {
					if (err) return done(err);
					done(null, isMatch);
				});
			},
			associate: (models) => {
				User.hasMany(models.Post, {
					foreignKey: 'user_id',
					as : 'userPosts',
				});
			}
		}
	});

	User.beforeCreate( (user, options, done) => {
		bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
			if (err) return done(err);
			const tmppass = user.password + config.secret;
			bcrypt.hash(tmppass, salt, (err, hash) => {
				if (err) return done(err);
				user.salt 		= salt;
				user.password 	= hash;
				return done(null, user);
			});
		});
	});

	User.beforeUpdate( (user, options, done) => {
		bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
			if (err) return done(err);
			const tmppass = user.password + config.secret;
			bcrypt.hash(tmppass, salt, (err, hash) => {
				if (err) return done(err);
				user.salt 		= salt;
				user.password 	= hash;
				return done(null, user);
			});
		});
	});

	return User;
}; 