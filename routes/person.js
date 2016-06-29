var express = require('express');
var Person = require('../models/person');

module.exports = function() {
	
	// create a router to be filled with routes
	var router = express.Router();
	
	router.get('/', function(req, res) {
		
		// create query to find all of the users and convert those users to json using lean
		// then execute that query
		Person.find({}).lean().exec(function(err, results) {
			// if there was a problem, show that to the user
			if (err) return res.json({ success: false, error: err });
			
			// return the results back to the user
			return res.json({ success: true, results: results });
		});
	});
	
	router.post('/create', function(req, res) {
		// create new person to save to database
		newPerson = new Person();
		newPerson.name = req.body.name; // we can only say body.name because of the body-parser middleware
		
		// save new object to database
		newPerson.save(function(err) {
			// if there was a problem, show that to the user
			if (err) return res.json({ success: false, error: err });
			
			return res.json({ success: true });
		})
	});
	
	// return the router we created with all of the routes added on
	return router;
}