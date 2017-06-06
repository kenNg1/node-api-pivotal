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
	app.post('/api/post/', auth.IsAuthenticated, postsController.create); // new post route
	app.put('/api/post/:postId', auth.IsAuthenticated, postsController.update); // update post route
	app.del('/api/post/:postId', auth.IsAuthenticated, postsController.destroy); // delete post route
	app.get('/api/posts/', auth.IsAuthenticated, postsController.list); // all post list route
	app.get('/api/post/:postId', auth.IsAuthenticated, postsController.content); // get post content by id route
};