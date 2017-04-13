const User 		= require('../models').User;
const passport 	= require('passport');
const jwt 		= require('jsonwebtoken');
const config	= require('../config/general');

module.exports = {
	create(req, res){
		return User
			.find({
				where: { $or: [{username: req.body.username}, {email: req.body.email}] }
			})
			.then(user => {
				if (!user) {
					User.create({
						email 	: req.body.email,
						username: req.body.username,
						password: req.body.password,
						role	: req.body.role,
					})
					.then(user => res.send(200, user));
				}
				else {
					return res.send(400, {
						message: 'Username / Email is Already Exist'
					});
				}
			})
			.catch(error => res.send(400, error));
	},
	login(req, res, next) {
		passport.authenticate('local', (err, user, info) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.send(401, {message: 'authentication failed'});
			}

			req.login(user, (err) => {
				if (err) return next(err);

				const token = jwt.sign({ user: user.id }, config.secret, {expiresIn: 24 * 60 * 60});
				return res.send(200, {
					token 	: token,
					userId	: user.id,
					username: user.username
				});
			});
		})(req, res, next);
	},
	profile(req, res, next) {
		return User
			.findById(req.params.userId)
			.then(user => {
				if (!user) {
					return res.send(400, {success: false, message: 'User not Found'});
				}
				
				const data = {
					id: user.id,
					username: user.username,
					email: user.email,
					role: user.role
				}
				return res.send(200, data);

			})
			.catch(error => res.send(400, error));
	}
};