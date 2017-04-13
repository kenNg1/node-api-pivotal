const usersController = require('../controllers').users;
const auth = require('../config/auth');

module.exports = (app) => {
	app.get('/api', auth.IsAuthenticated, (req, res) => res.send(200, {
		message: "Welcome to Unknow Post Api"
	}));

	// user route (auth.IsAuthenticated) for checking the token
	app.post('/register', usersController.create);
	app.post('/signin', usersController.login);
	// app.get('/signout', auth.IsAuthenticated, auth.destroySession);
	app.get('/api/profile/:userId', usersController.profile);
};