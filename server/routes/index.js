const usersController = require('../controllers').users;
const eventsController = require('../controllers').events;
const commentsController = require('../controllers').comments;
const auth = require('../config/auth');

module.exports = (app) => {
	app.get('/api', auth.IsAuthenticated, (req, res) => res.send(200, {
		message: "Welcome to Unknow Post Api"
	}));

	// user route (auth.IsAuthenticated) for checking the token
	app.post('/register', usersController.create);
	app.post('/login', usersController.login);
	app.get('/check-state', auth.IsAuthenticated, (req, res) => {
		let content = {
		success: true,
		message: 'Successfully logged in'
		}
		res.send(content);
	});

	// is this necessary?? app.get('/signout', auth.IsAuthenticated, auth.destroySession);
	// probs don't need this as we get the details another way... app.get('/api/profile/:userId', usersController.profile);

	// All events Route
	// fix the , auth.IsAuthenticated , bit
	
	app.post('/api/events/', eventsController.create); // new post route
	app.put('/api/events/:eventId', eventsController.update); // update post route
	app.delete('/api/events/:eventId', eventsController.destroy); // delete post route
	app.get('/api/events/', eventsController.index); // all post list route
	app.get('/api/events/:eventId', eventsController.show); // get post content by id route

	// All post Route
	// app.post('/api/post/', auth.IsAuthenticated, postsController.create); // new post route
	// app.put('/api/post/:postId', auth.IsAuthenticated, postsController.update); // update post route
	// app.delete('/api/post/:postId', auth.IsAuthenticated, postsController.destroy); // delete post route
	// app.get('/api/posts/', auth.IsAuthenticated, postsController.list); // all post list route
	// app.get('/api/post/:postId', auth.IsAuthenticated, postsController.content); // get post content by id route

	// All Comment Route
	// app.post('/api/post/:postId/comment', auth.IsAuthenticated, commentsController.create); // new comment route
	// app.put('/api/post/:postId/comment/:commentId', auth.IsAuthenticated, commentsController.update); // update comment route
	// app.delete('/api/post/:postId/comment/:commentId', auth.IsAuthenticated, commentsController.destroy); // delete comment route
	// app.post('/api/post/:postId/comment/:commentId/replay', auth.IsAuthenticated, commentsController.replay); // replay comment route
	// app.get('/api/post/:postId/comments', auth.IsAuthenticated, commentsController.postComment); // list post comment route
};