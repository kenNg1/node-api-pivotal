const usersController = require('../controllers').users;
const eventsController = require('../controllers').events;
const detailsController = require('../controllers').details;
const sportsController = require('../controllers').sports;
const districtsController = require('../controllers').districts;
const emailController = require('../controllers').emails;
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

	// app.post('/api/emails/', emailController.sendMail); // send email

	// is this necessary?? app.get('/signout', auth.IsAuthenticated, auth.destroySession);
	// probs don't need profile api as we get the details another way... app.get('/api/profile/:userId', usersController.profile);

	// All events routes
	// fix the , auth.IsAuthenticated , bit
	app.post('/api/events/', eventsController.create); // new post route
	app.put('/api/events/:eventId', eventsController.update); // update post route
	app.delete('/api/events/:eventId', eventsController.destroy); // delete post route
	app.get('/api/events/', eventsController.queryIndex, eventsController.index); // all post list route
	app.get('/api/events/:eventId', eventsController.show); // get post content by id route

	// All details routes
	// fix the , auth.IsAuthenticated , bit
	app.post('/api/details/', detailsController.create); // new post route
	app.put('/api/details/:detailId', detailsController.update); // update post route
	app.delete('/api/details/:detailId', detailsController.destroy); // delete post route
	app.get('/api/details/', detailsController.index); // all post list route
	app.get('/api/details/:detailId', detailsController.show); // get post content by id route

	// All sports routes
	// fix the , auth.IsAuthenticated , bit
	app.post('/api/sports/', sportsController.create); // new post route
	app.put('/api/sports/:sportId', sportsController.update); // update post route
	app.delete('/api/sports/:sportId', sportsController.destroy); // delete post route
	app.get('/api/sports/', sportsController.index); // all post list route
	app.get('/api/sports/:sportId', sportsController.show); // get post content by id route

	// All districts routes
	// fix the , auth.IsAuthenticated , bit
	app.post('/api/districts/', districtsController.create); // new post route
	app.put('/api/districts/:districtId', districtsController.update); // update post route
	app.delete('/api/districts/:districtId', districtsController.destroy); // delete post route
	app.get('/api/districts/', districtsController.index); // all post list route
	app.get('/api/districts/:districtId', districtsController.show); // get post content by id route

	// All post Route
	// app.post('/api/post/', auth.IsAuthenticated, postsController.create); // new post route
	// app.put('/api/post/:postId', auth.IsAuthenticated, postsController.update); // update post route
	// app.delete('/api/post/:postId', auth.IsAuthenticated, postsController.destroy); // delete post route
	// app.get('/api/posts/', auth.IsAuthenticated, postsController.list); // all post list route
	// app.get('/api/post/:postId', auth.IsAuthenticated, postsController.content); // get post content by id route

};