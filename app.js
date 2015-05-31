'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var compress = require('compression');
var app = express();
var nodemailer = require('nodemailer');
var validator = require('validator');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'humigym@gmail.com',
		pass: 'Reneeselmaster'
	}
});

var validateMail = function(email, name, message){
	return validator.isEmail(email) && name && name.length > 0 && message && message.length > 0;
};

var sendMail = function(email, name, message, tag) {
	transporter.sendMail({
		from: 'humigym@gmail.com',
		to: 'humigym@gmail.com',
		subject: tag + ', ' + name,
		text: message + '\n' + email
	});
};

app.use(compress());
app.use(express.static(__dirname + '/static'));

var jsonParser = bodyParser.json();

app.post('/sendMail', jsonParser, function(request, response) {
	if (validateMail(request.body.email, request.body.name, request.body.message)) {
		sendMail(request.body.email, request.body.name, request.body.message, request.body.tag);
		response.status('200');
	} else {
		response.status('400');
	}
	response.end();
});
app.listen(process.env.PORT || 3000);