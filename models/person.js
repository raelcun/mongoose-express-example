var mongoose = require('mongoose');

var PersonSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Person', PersonSchema);