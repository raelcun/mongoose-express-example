var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var config = require('./config')

var app = express();

// configure middleware
app.use(bodyParser.json()) // parses json bodies

// load routes
app.use('/person', require('./routes/person')());

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