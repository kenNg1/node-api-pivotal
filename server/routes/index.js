const usersController = require('../controllers').users;
const postsController = require('../controllers').posts;
const auth = require('../config/auth');

module.exports = (app) => {
	app.get('/api', auth.IsAuthenticated, (req, res) => res.send(200, {
		message: "Welcome to Unknow Post Api"
	}));

	// user route (auth.IsAuthenticated) for checking the token
	app.post('/register', usersController.create);
	app.post('/signin', usersController.login);
	// app.get('/signout', auth.IsAuthenticated, auth.destroySession);
	app.get('/api/profile/:userId', auth.IsAuthenticated, usersController.profile);

	// All post Route
	app.post('/api/post/new', auth.IsAuthenticated, postsController.create);
};