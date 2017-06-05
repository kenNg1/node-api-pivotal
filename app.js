// Import Dependencies
const restify	= require('restify');
const logger	= require('morgan');
const passport	= require('passport');
const jwt		= require('jsonwebtoken');
	
// Setting up the server
const app	= restify.createServer({name: 'Simple Blog API'});
require('./server/config/passport')(passport);

// Hashing wrk factor
SALT_WORK_FACTOR = 12;

// Setting up the logger
app.use(logger('dev'));

// Parsing incoming request data using restify
app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser());
app.use(restify.bodyParser());
app.use(restify.urlEncodedBodyParser({mapParams: false}));

// Running up the passport
app.use(passport.initialize());

// initializing the route to the app
require('./server/routes')(app);
app.get('/', (req, res) => {
	res.send('Hello! The API is Up at http://localhost:' + port + '/api');
});

// setting up the port
const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port);

module.exports = app;