/*jslint node: true */
'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var compress = require('compression');
var app = express();
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'humigym@gmail.com',
		pass: 'Reneeselmaster'
	}
});

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
	if (request.email && request.name && request.message && request.tag) {
		sendMail(request.email, request.name, request.message, request.tag);
		response.status('200');

	} else response.status('400');
});
app.listen(process.env.PORT || 3000);