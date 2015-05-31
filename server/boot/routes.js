'use strict';
var validator = require('validator');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var validateMail = function(email, name, message) {
	return validator.isEmail(email) && name && name.length > 0 && message && message.length > 0;
};

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'humigym@gmail.com',
		pass: 'Reneeselmaster'
	}
});

var sendMail = function(email, name, message) {
	transporter.sendMail({
		from: 'humigym@gmail.com',
		to: 'humigym@gmail.com',
		subject: 'Comentario de: ' + name,
		text: message + '\n' + email
	});
};


var jsonParser = bodyParser.json();

module.exports = function(app) {
	app.post('/sendMail', jsonParser, function(request, response) {
		if (validateMail(request.body.email, request.body.name, request.body.message)) {
			sendMail(request.body.email, request.body.name, request.body.message, request.body.tag);
			response.status('200');
		} else {
			response.status('400');
		}
		response.end();
	});

	app.get('/', function(req, res) {
		res.sendfile(__dirname + '/Index.html');
	});
};