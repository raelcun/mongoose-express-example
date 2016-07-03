const express = require('express'),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		config = require('./config'),
		loadRoutes = require('./routes'),
		path = require('path')

const app = express();

// setup ejs templating
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// configure middleware
app.use(bodyParser.json()) // parses json bodies

loadRoutes(app)

// when app closes, let mongoose gracefully disconnect
var gracefulDBExit = function() {
  mongoose.connection.close(function() {
    console.log('Mongoose connection terminated due to app termination');
    process.exit(0);
  });
};
process.on('SIGINT', gracefulDBExit).on('SIGTERM', gracefulDBExit);

// whenever mongoose connects to the mongo db...
mongoose.connection.on('connected', function() {
	
	// start up the server
	app.listen(config.server.port, function() {
		console.log('listening on port ' + config.server.port);
	});
});

// connect mongoose to mongo db
mongoose.connect(config.mongo.connectionURI);