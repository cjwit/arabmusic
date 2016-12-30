var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(editUser).delete(deleteUser);
router.route('/').get(getUsers).post(addUser);

// nodemailer
var nodemailer = require('nodemailer');
var smtpConfig = {
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'amr.notify@gmail.com',
		pass: process.env.EMAIL_PASSWORD
	}
};
var transporter = nodemailer.createTransport(smtpConfig);
transporter.verify(function(err, success) {
	if (err) {
		console.log(err);
	} else {
		console.log('Email server ready...');
	}
})

var mailData = {
	from: 'amr.notify@gmail.com',
	to: 'chris.witulski@gmail.com'
}

// App functions
function getUsers(req, res) {
    User.find(function (err, users) {
        if (err) res.send(err);
        else res.json(users);
    });
}

function addUser(req, res) {
    var user = new User(_.extend({}, req.body));

	mailData.subject = '[AMR] New post';
	mailData.text = 'New post' + '\r\n' +
		'Name: ' + user.name + '\r\n' +
		'Other information may be available on the site.'
	transporter.sendMail(mailData);

    User.save(function (err) {
        if (err) res.send(err);
        else res.json(user);
    });
}

function editUser(req, res) {
    var info = req.body;
    var query = { _id: info.id },
        update = { $set: {
            name: info.name,
            email: info.email,
            photo: info.photo,
            provider: info.provider,
            description: info.description,
            joined: new Date(info.date),
            tags: info.tags,
            edited: info.edited,
            editDate: info.editDate
        }};
    User.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteUser(req, res) {
    var id = req.params.id;
    User.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
